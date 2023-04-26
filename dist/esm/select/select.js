import { __awaiter, __decorate } from "tslib";
import { autoUpdate, computePosition, flip, hide, size } from "@floating-ui/dom";
import { attr, Observable, observable, Updates, volatile } from "@microsoft/fast-element";
import { keyArrowDown, keyArrowUp, keyEnd, keyEnter, keyEscape, keyHome, keySpace, keyTab, uniqueId, } from "@microsoft/fast-web-utilities";
import { DelegatesARIAListbox, FASTListbox } from "../listbox/listbox.js";
import { StartEnd } from "../patterns/start-end.js";
import { applyMixins } from "../utilities/apply-mixins.js";
import { FormAssociatedSelect } from "./select.form-associated.js";
/**
 * A Select Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#select | ARIA select }.
 *
 * @slot start - Content which can be provided before the button content
 * @slot end - Content which can be provided after the button content
 * @slot button-container - The element representing the select button
 * @slot selected-value - The selected value
 * @slot indicator - The visual indicator for the expand/collapse state of the button
 * @slot - The default slot for slotted options
 * @csspart control - The element representing the select invoking element
 * @csspart selected-value - The element wrapping the selected value
 * @csspart indicator - The element wrapping the visual indicator
 * @csspart listbox - The listbox element
 * @fires input - Fires a custom 'input' event when the value updates
 * @fires change - Fires a custom 'change' event when the value updates
 *
 * @public
 */
export class FASTSelect extends FormAssociatedSelect {
    constructor() {
        super(...arguments);
        /**
         * The open attribute.
         *
         * @public
         * @remarks
         * HTML Attribute: open
         */
        this.open = false;
        /**
         * The unique id for the internal listbox element.
         *
         * @internal
         */
        this.listboxId = uniqueId("listbox-");
    }
    /**
     * Sets focus and synchronizes ARIA attributes when the open property changes.
     *
     * @param prev - the previous open value
     * @param next - the current open value
     *
     * @internal
     */
    openChanged(prev, next) {
        var _a;
        if (!this.collapsible) {
            return;
        }
        if (this.open) {
            this.ariaControls = this.listboxId;
            this.ariaExpanded = "true";
            Updates.enqueue(() => this.setPositioning());
            this.focusAndScrollOptionIntoView();
            this.indexWhenOpened = this.selectedIndex;
            // focus is directed to the element when `open` is changed programmatically
            Updates.enqueue(() => this.focus());
            return;
        }
        (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
        this.ariaControls = "";
        this.ariaExpanded = "false";
    }
    /**
     * The component is collapsible when in single-selection mode with no size attribute.
     *
     * @internal
     */
    get collapsible() {
        return !(this.multiple || typeof this.size === "number");
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
        var _a, _b, _c, _d, _e, _f, _g;
        const prev = `${this._value}`;
        if ((_a = this._options) === null || _a === void 0 ? void 0 : _a.length) {
            const selectedIndex = this._options.findIndex(el => el.value === next);
            const prevSelectedValue = (_c = (_b = this._options[this.selectedIndex]) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : null;
            const nextSelectedValue = (_e = (_d = this._options[selectedIndex]) === null || _d === void 0 ? void 0 : _d.value) !== null && _e !== void 0 ? _e : null;
            if (selectedIndex === -1 || prevSelectedValue !== nextSelectedValue) {
                next = "";
                this.selectedIndex = selectedIndex;
            }
            next = (_g = (_f = this.firstSelectedOption) === null || _f === void 0 ? void 0 : _f.value) !== null && _g !== void 0 ? _g : next;
        }
        if (prev !== next) {
            this._value = next;
            super.valueChanged(prev, next);
            Observable.notify(this, "value");
            this.updateDisplayValue();
        }
    }
    /**
     * Sets the value and display value to match the first selected option.
     *
     * @param shouldEmit - if true, the input and change events will be emitted
     *
     * @internal
     */
    updateValue(shouldEmit) {
        var _a, _b;
        if (this.$fastController.isConnected) {
            this.value = (_b = (_a = this.firstSelectedOption) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : "";
        }
        if (shouldEmit) {
            this.$emit("input");
            this.$emit("change", this, {
                bubbles: true,
                composed: undefined,
            });
        }
    }
    /**
     * Updates the proxy value when the selected index changes.
     *
     * @param prev - the previous selected index
     * @param next - the next selected index
     *
     * @internal
     */
    selectedIndexChanged(prev, next) {
        super.selectedIndexChanged(prev, next);
        this.updateValue();
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
                const { middlewareData, x, y } = yield computePosition(this.control, this.listbox, {
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
     * The value displayed on the button.
     *
     * @public
     */
    get displayValue() {
        var _a, _b;
        Observable.track(this, "displayValue");
        return (_b = (_a = this.firstSelectedOption) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : "";
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
    /**
     * Reset the element to its first selectable option when its parent form is reset.
     *
     * @internal
     */
    formResetCallback() {
        this.setProxyOptions();
        // Call the base class's implementation setDefaultSelectedOption instead of the select's
        // override, in order to reset the selectedIndex without using the value property.
        super.setDefaultSelectedOption();
        if (this.selectedIndex === -1) {
            this.selectedIndex = 0;
        }
    }
    /**
     * Handle opening and closing the listbox when the select is clicked.
     *
     * @param e - the mouse event
     * @internal
     */
    clickHandler(e) {
        // do nothing if the select is disabled
        if (this.disabled) {
            return;
        }
        if (this.open) {
            const captured = e.target.closest(`option,[role=option]`);
            if (captured && captured.disabled) {
                return;
            }
        }
        super.clickHandler(e);
        this.open = this.collapsible && !this.open;
        if (!this.open && this.indexWhenOpened !== this.selectedIndex) {
            this.updateValue(true);
        }
        return true;
    }
    /**
     * Handles focus state when the element or its children lose focus.
     *
     * @param e - The focus event
     * @internal
     */
    focusoutHandler(e) {
        var _a;
        super.focusoutHandler(e);
        if (!this.open) {
            return true;
        }
        const focusTarget = e.relatedTarget;
        if (this.isSameNode(focusTarget)) {
            this.focus();
            return;
        }
        if (!((_a = this.options) === null || _a === void 0 ? void 0 : _a.includes(focusTarget))) {
            this.open = false;
            if (this.indexWhenOpened !== this.selectedIndex) {
                this.updateValue(true);
            }
        }
    }
    /**
     * Updates the value when an option's value changes.
     *
     * @param source - the source object
     * @param propertyName - the property to evaluate
     *
     * @internal
     * @override
     */
    handleChange(source, propertyName) {
        super.handleChange(source, propertyName);
        if (propertyName === "value") {
            this.updateValue();
        }
    }
    /**
     * Synchronize the form-associated proxy and updates the value property of the element.
     *
     * @param prev - the previous collection of slotted option elements
     * @param next - the next collection of slotted option elements
     *
     * @internal
     */
    slottedOptionsChanged(prev, next) {
        this.options.forEach(o => {
            const notifier = Observable.getNotifier(o);
            notifier.unsubscribe(this, "value");
        });
        super.slottedOptionsChanged(prev, next);
        this.options.forEach(o => {
            const notifier = Observable.getNotifier(o);
            notifier.subscribe(this, "value");
        });
        this.setProxyOptions();
        this.updateValue();
    }
    /**
     * Prevents focus when size is set and a scrollbar is clicked.
     *
     * @param e - the mouse event object
     *
     * @override
     * @internal
     */
    mousedownHandler(e) {
        var _a;
        if (e.offsetX >= 0 && e.offsetX <= ((_a = this.listbox) === null || _a === void 0 ? void 0 : _a.scrollWidth)) {
            return super.mousedownHandler(e);
        }
        return this.collapsible;
    }
    /**
     * Sets the multiple property on the proxy element.
     *
     * @param prev - the previous multiple value
     * @param next - the current multiple value
     */
    multipleChanged(prev, next) {
        super.multipleChanged(prev, next);
        if (this.proxy) {
            this.proxy.multiple = next;
        }
    }
    /**
     * Updates the selectedness of each option when the list of selected options changes.
     *
     * @param prev - the previous list of selected options
     * @param next - the current list of selected options
     *
     * @override
     * @internal
     */
    selectedOptionsChanged(prev, next) {
        var _a;
        super.selectedOptionsChanged(prev, next);
        (_a = this.options) === null || _a === void 0 ? void 0 : _a.forEach((o, i) => {
            var _a;
            const proxyOption = (_a = this.proxy) === null || _a === void 0 ? void 0 : _a.options.item(i);
            if (proxyOption) {
                proxyOption.selected = o.selected;
            }
        });
    }
    /**
     * Sets the selected index to match the first option with the selected attribute, or
     * the first selectable option.
     *
     * @override
     * @internal
     */
    setDefaultSelectedOption() {
        var _a;
        const options = (_a = this.options) !== null && _a !== void 0 ? _a : Array.from(this.children).filter(FASTListbox.slottedOptionFilter);
        const selectedIndex = options === null || options === void 0 ? void 0 : options.findIndex(el => el.hasAttribute("selected") || el.selected || el.value === this.value);
        if (selectedIndex !== -1) {
            this.selectedIndex = selectedIndex;
            return;
        }
        this.selectedIndex = 0;
    }
    /**
     * Resets and fills the proxy to match the component's options.
     *
     * @internal
     */
    setProxyOptions() {
        if (this.proxy instanceof HTMLSelectElement && this.options) {
            this.proxy.options.length = 0;
            this.options.forEach(option => {
                const proxyOption = option.proxy ||
                    (option instanceof HTMLOptionElement ? option.cloneNode() : null);
                if (proxyOption) {
                    this.proxy.options.add(proxyOption);
                }
            });
        }
    }
    /**
     * Handle keyboard interaction for the select.
     *
     * @param e - the keyboard event
     * @internal
     */
    keydownHandler(e) {
        super.keydownHandler(e);
        const key = e.key || e.key.charCodeAt(0);
        switch (key) {
            case keySpace: {
                e.preventDefault();
                if (this.collapsible && this.typeAheadExpired) {
                    this.open = !this.open;
                }
                break;
            }
            case keyHome:
            case keyEnd: {
                e.preventDefault();
                break;
            }
            case keyEnter: {
                e.preventDefault();
                this.open = !this.open;
                break;
            }
            case keyEscape: {
                if (this.collapsible && this.open) {
                    e.preventDefault();
                    this.open = false;
                }
                break;
            }
            case keyTab: {
                if (this.collapsible && this.open) {
                    e.preventDefault();
                    this.open = false;
                }
                return true;
            }
        }
        if (!this.open && this.indexWhenOpened !== this.selectedIndex) {
            this.updateValue(true);
            this.indexWhenOpened = this.selectedIndex;
        }
        return !(key === keyArrowDown || key === keyArrowUp);
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("contentchange", this.updateDisplayValue);
    }
    disconnectedCallback() {
        var _a;
        this.removeEventListener("contentchange", this.updateDisplayValue);
        (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
        super.disconnectedCallback();
    }
    /**
     * Updates the proxy's size property when the size attribute changes.
     *
     * @param prev - the previous size
     * @param next - the current size
     *
     * @override
     * @internal
     */
    sizeChanged(prev, next) {
        super.sizeChanged(prev, next);
        if (this.proxy) {
            this.proxy.size = next;
        }
    }
    /**
     *
     * @internal
     */
    updateDisplayValue() {
        if (this.collapsible) {
            Observable.notify(this, "displayValue");
        }
    }
}
__decorate([
    attr({ attribute: "open", mode: "boolean" })
], FASTSelect.prototype, "open", void 0);
__decorate([
    volatile
], FASTSelect.prototype, "collapsible", null);
__decorate([
    observable
], FASTSelect.prototype, "control", void 0);
/**
 * Includes ARIA states and properties relating to the ARIA select role.
 *
 * @public
 */
export class DelegatesARIASelect {
}
__decorate([
    observable
], DelegatesARIASelect.prototype, "ariaControls", void 0);
applyMixins(DelegatesARIASelect, DelegatesARIAListbox);
applyMixins(FASTSelect, StartEnd, DelegatesARIASelect);
