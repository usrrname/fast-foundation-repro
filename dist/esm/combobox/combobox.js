import { __awaiter, __decorate } from "tslib";
import { autoUpdate, computePosition, flip, hide, size } from "@floating-ui/dom";
import { attr, Observable, observable, Updates } from "@microsoft/fast-element";
import { limit, uniqueId } from "@microsoft/fast-web-utilities";
import { DelegatesARIAListbox } from "../listbox/listbox.js";
import { StartEnd } from "../patterns/start-end.js";
import { applyMixins } from "../utilities/apply-mixins.js";
import { FormAssociatedCombobox } from "./combobox.form-associated.js";
import { ComboboxAutocomplete } from "./combobox.options.js";
/**
 * A Combobox Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria-practices/#combobox | ARIA combobox }.
 *
 * @slot start - Content which can be provided before the input
 * @slot end - Content which can be provided after the input
 * @slot control - Used to replace the input element representing the combobox
 * @slot indicator - The visual indicator representing the expanded state
 * @slot - The default slot for the options
 * @csspart control - The wrapper element containing the input area, including start and end
 * @csspart selected-value - The input element representing the selected value
 * @csspart indicator - The element wrapping the indicator slot
 * @csspart listbox - The wrapper for the listbox slotted options
 * @fires change - Fires a custom 'change' event when the value updates
 *
 * @public
 */
export class FASTCombobox extends FormAssociatedCombobox {
    constructor() {
        super(...arguments);
        /**
         * The internal value property.
         *
         * @internal
         */
        this._value = "";
        /**
         * The collection of currently filtered options.
         *
         * @public
         */
        this.filteredOptions = [];
        /**
         * The current filter value.
         *
         * @internal
         */
        this.filter = "";
        /**
         * The unique id for the internal listbox element.
         *
         * @internal
         */
        this.listboxId = uniqueId("listbox-");
        /**
         * The open attribute.
         *
         * @public
         * @remarks
         * HTML Attribute: open
         */
        this.open = false;
    }
    /**
     * Reset the element to its first selectable option when its parent form is reset.
     *
     * @internal
     */
    formResetCallback() {
        var _a;
        super.formResetCallback();
        this.setDefaultSelectedOption();
        if (!this.firstSelectedOption) {
            this.value = (_a = this.initialValue) !== null && _a !== void 0 ? _a : "";
            return;
        }
        this.updateValue();
    }
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate() {
        super.validate(this.control);
    }
    get isAutocompleteInline() {
        return (this.autocomplete === ComboboxAutocomplete.inline || this.isAutocompleteBoth);
    }
    get isAutocompleteList() {
        return this.autocomplete === ComboboxAutocomplete.list || this.isAutocompleteBoth;
    }
    get isAutocompleteBoth() {
        return this.autocomplete === ComboboxAutocomplete.both;
    }
    /**
     * Sets focus and synchronize ARIA attributes when the open property changes.
     *
     * @param prev - the previous open value
     * @param next - the current open value
     *
     * @internal
     */
    openChanged() {
        if (this.open) {
            this.ariaControls = this.listboxId;
            this.ariaExpanded = "true";
            Updates.enqueue(() => this.setPositioning());
            this.focusAndScrollOptionIntoView();
            // focus is directed to the element when `open` is changed programmatically
            Updates.enqueue(() => this.focus());
            return;
        }
        this.ariaControls = "";
        this.ariaExpanded = "false";
    }
    /**
     * The list of options.
     *
     * @public
     * @remarks
     * Overrides `Listbox.options`.
     */
    get options() {
        Observable.track(this, "options");
        return this.filteredOptions.length ? this.filteredOptions : this._options;
    }
    set options(value) {
        this._options = value;
        Observable.notify(this, "options");
    }
    /**
     * Updates the placeholder on the proxy element.
     * @internal
     */
    placeholderChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.placeholder = this.placeholder;
        }
    }
    /**
     * The value property.
     *
     * @public
     */
    get value() {
        Observable.track(this, "value");
        return this._value;
    }
    set value(next) {
        var _a, _b, _c;
        const prev = `${this._value}`;
        if (this.$fastController.isConnected && this.options) {
            const selectedIndex = this.options.findIndex(el => el.text.toLowerCase() === next.toLowerCase());
            const prevSelectedValue = (_a = this.options[this.selectedIndex]) === null || _a === void 0 ? void 0 : _a.text;
            const nextSelectedValue = (_b = this.options[selectedIndex]) === null || _b === void 0 ? void 0 : _b.text;
            this.selectedIndex =
                prevSelectedValue !== nextSelectedValue
                    ? selectedIndex
                    : this.selectedIndex;
            next = ((_c = this.firstSelectedOption) === null || _c === void 0 ? void 0 : _c.text) || next;
        }
        if (prev !== next) {
            this._value = next;
            super.valueChanged(prev, next);
            Observable.notify(this, "value");
        }
    }
    /**
     * Handle opening and closing the listbox when the combobox is clicked.
     *
     * @param e - the mouse event
     * @internal
     */
    clickHandler(e) {
        if (this.disabled) {
            return;
        }
        if (this.open) {
            const captured = e.target.closest(`option,[role=option]`);
            if (!captured || captured.disabled) {
                return;
            }
            this.selectedOptions = [captured];
            this.control.value = captured.text;
            this.clearSelectionRange();
            this.updateValue(true);
        }
        this.open = !this.open;
        if (this.open) {
            this.control.focus();
        }
        return true;
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.value) {
            this.initialValue = this.value;
        }
    }
    /**
     * Synchronize the `aria-disabled` property when the `disabled` property changes.
     *
     * @param prev - The previous disabled value
     * @param next - The next disabled value
     *
     * @internal
     */
    disabledChanged(prev, next) {
        if (super.disabledChanged) {
            super.disabledChanged(prev, next);
        }
        this.ariaDisabled = this.disabled ? "true" : "false";
    }
    disconnectedCallback() {
        var _a;
        (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
        super.disconnectedCallback();
    }
    /**
     * Filter available options by text value.
     *
     * @public
     */
    filterOptions() {
        if (!this.autocomplete || this.autocomplete === ComboboxAutocomplete.none) {
            this.filter = "";
        }
        const filter = this.filter.toLowerCase();
        this.filteredOptions = this._options.filter(o => o.text.toLowerCase().startsWith(this.filter.toLowerCase()));
        if (this.isAutocompleteList) {
            if (!this.filteredOptions.length && !filter) {
                this.filteredOptions = this._options;
            }
            this._options.forEach(o => {
                o.hidden = !this.filteredOptions.includes(o);
            });
        }
    }
    /**
     * Focus the control and scroll the first selected option into view.
     *
     * @internal
     * @remarks
     * Overrides: `Listbox.focusAndScrollOptionIntoView`
     */
    focusAndScrollOptionIntoView() {
        if (this.contains(document.activeElement)) {
            this.control.focus();
            if (this.firstSelectedOption) {
                requestAnimationFrame(() => {
                    var _a;
                    (_a = this.firstSelectedOption) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ block: "nearest" });
                });
            }
        }
    }
    /**
     * Handle focus state when the element or its children lose focus.
     *
     * @param e - The focus event
     * @internal
     */
    focusoutHandler(e) {
        this.updateValue();
        if (!this.open) {
            return true;
        }
        const focusTarget = e.relatedTarget;
        if (this.isSameNode(focusTarget)) {
            this.focus();
            return;
        }
        if (!this.options || !this.options.includes(focusTarget)) {
            this.open = false;
        }
    }
    /**
     * Handle content changes on the control input.
     *
     * @param e - the input event
     * @internal
     */
    inputHandler(e) {
        this.filter = this.control.value;
        this.filterOptions();
        if (e.inputType === "deleteContentBackward" || !this.filter.length) {
            return true;
        }
        if (this.isAutocompleteList && !this.open) {
            this.open = true;
        }
        if (this.isAutocompleteInline && this.filteredOptions.length) {
            this.selectedOptions = [this.filteredOptions[0]];
            this.selectedIndex = this.options.indexOf(this.firstSelectedOption);
            this.setInlineSelection();
        }
        return;
    }
    /**
     * Handle keydown actions for listbox navigation.
     *
     * @param e - the keyboard event
     * @internal
     */
    keydownHandler(e) {
        const key = e.key;
        if (e.ctrlKey || e.shiftKey) {
            return true;
        }
        switch (key) {
            case "Enter": {
                this.updateValue(true);
                if (this.isAutocompleteInline) {
                    this.filter = this.value;
                }
                this.open = false;
                this.clearSelectionRange();
                break;
            }
            case "Escape": {
                if (!this.isAutocompleteInline) {
                    this.selectedIndex = -1;
                }
                if (this.open) {
                    this.open = false;
                    break;
                }
                this.value = "";
                this.control.value = "";
                this.filter = "";
                this.filterOptions();
                break;
            }
            case "Tab": {
                this.updateValue();
                if (!this.open) {
                    return true;
                }
                e.preventDefault();
                this.open = false;
                break;
            }
            case "ArrowUp":
            case "ArrowDown": {
                this.filterOptions();
                if (!this.open) {
                    this.open = true;
                    break;
                }
                if (this.filteredOptions.length > 0) {
                    super.keydownHandler(e);
                }
                if (this.isAutocompleteInline) {
                    this.updateValue();
                    this.setInlineSelection();
                }
                break;
            }
            default: {
                return true;
            }
        }
    }
    /**
     * Handle keyup actions for value input and text field manipulations.
     *
     * @param e - the keyboard event
     * @internal
     */
    keyupHandler(e) {
        const key = e.key;
        switch (key) {
            case "ArrowLeft":
            case "ArrowRight":
            case "Backspace":
            case "Delete":
            case "Home":
            case "End": {
                this.filter = this.control.value;
                this.selectedIndex = -1;
                this.filterOptions();
                break;
            }
        }
    }
    /**
     * Ensure that the selectedIndex is within the current allowable filtered range.
     *
     * @param prev - the previous selected index value
     * @param next - the current selected index value
     *
     * @internal
     */
    selectedIndexChanged(prev, next) {
        if (this.$fastController.isConnected) {
            next = limit(-1, this.options.length - 1, next);
            // we only want to call the super method when the selectedIndex is in range
            if (next !== this.selectedIndex) {
                this.selectedIndex = next;
                return;
            }
            super.selectedIndexChanged(prev, next);
        }
    }
    /**
     * Move focus to the previous selectable option.
     *
     * @internal
     * @remarks
     * Overrides `Listbox.selectPreviousOption`
     */
    selectPreviousOption() {
        if (!this.disabled && this.selectedIndex >= 0) {
            this.selectedIndex = this.selectedIndex - 1;
        }
    }
    /**
     * Set the default selected options at initialization or reset.
     *
     * @internal
     * @remarks
     * Overrides `Listbox.setDefaultSelectedOption`
     */
    setDefaultSelectedOption() {
        if (this.$fastController.isConnected && this.options) {
            const selectedIndex = this.options.findIndex(el => el.getAttribute("selected") !== null || el.selected);
            this.selectedIndex = selectedIndex;
            if (!this.dirtyValue && this.firstSelectedOption) {
                this.value = this.firstSelectedOption.text;
            }
            else {
                this.value = "";
            }
            this.setSelectedOptions();
        }
    }
    /**
     * Focus and select the content of the control based on the first selected option.
     *
     * @param start - The index for the starting range
     * @internal
     */
    setInlineSelection() {
        if (this.firstSelectedOption) {
            this.control.value = this.firstSelectedOption.text;
            this.control.focus();
            this.control.setSelectionRange(this.filter.length, this.control.value.length, "backward");
        }
    }
    /**
     * Calculate and apply listbox positioning based on available viewport space.
     *
     * @public
     */
    setPositioning() {
        if (this.$fastController.isConnected) {
            this.cleanup = autoUpdate(this, this.listbox, () => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const { middlewareData, x, y } = yield computePosition(this, this.listbox, {
                    placement: "bottom",
                    strategy: "fixed",
                    middleware: [
                        flip(),
                        size({
                            apply: ({ availableHeight, rects }) => {
                                Object.assign(this.listbox.style, {
                                    maxHeight: `${availableHeight}px`,
                                    width: `${rects.reference.width}px`,
                                });
                            },
                        }),
                        hide(),
                    ],
                });
                if ((_a = middlewareData.hide) === null || _a === void 0 ? void 0 : _a.referenceHidden) {
                    this.open = false;
                    this.cleanup();
                    return;
                }
                Object.assign(this.listbox.style, {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    transform: `translate(${x}px, ${y}px)`,
                });
            }));
        }
    }
    /**
     * Ensure that the entire list of options is used when setting the selected property.
     *
     * @param prev - the previous list of selected options
     * @param next - the current list of selected options
     *
     * @internal
     * @remarks
     * Overrides: `Listbox.selectedOptionsChanged`
     */
    selectedOptionsChanged(prev, next) {
        if (this.$fastController.isConnected) {
            this._options.forEach(o => {
                o.selected = next.includes(o);
            });
        }
    }
    /**
     * Synchronize the form-associated proxy and update the value property of the element.
     *
     * @param prev - the previous collection of slotted option elements
     * @param next - the next collection of slotted option elements
     *
     * @internal
     */
    slottedOptionsChanged(prev, next) {
        super.slottedOptionsChanged(prev, next);
        this.updateValue();
    }
    /**
     * Sets the value and to match the first selected option.
     *
     * @param shouldEmit - if true, the change event will be emitted
     *
     * @internal
     */
    updateValue(shouldEmit) {
        var _a;
        if (this.$fastController.isConnected) {
            this.value = ((_a = this.firstSelectedOption) === null || _a === void 0 ? void 0 : _a.text) || this.control.value;
        }
        if (shouldEmit) {
            this.$emit("change");
        }
    }
    /**
     * @internal
     */
    clearSelectionRange() {
        const controlValueLength = this.control.value.length;
        this.control.setSelectionRange(controlValueLength, controlValueLength);
    }
}
__decorate([
    attr({ attribute: "autocomplete", mode: "fromView" })
], FASTCombobox.prototype, "autocomplete", void 0);
__decorate([
    attr({ attribute: "open", mode: "boolean" })
], FASTCombobox.prototype, "open", void 0);
__decorate([
    attr
], FASTCombobox.prototype, "placeholder", void 0);
/**
 * Includes ARIA states and properties relating to the ARIA combobox role.
 *
 * @public
 */
export class DelegatesARIACombobox {
}
__decorate([
    observable
], DelegatesARIACombobox.prototype, "ariaAutoComplete", void 0);
__decorate([
    observable
], DelegatesARIACombobox.prototype, "ariaControls", void 0);
applyMixins(DelegatesARIACombobox, DelegatesARIAListbox);
applyMixins(FASTCombobox, StartEnd, DelegatesARIACombobox);
