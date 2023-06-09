import { __decorate } from "tslib";
import { attr, bind, html, observable, ref, RepeatDirective, Updates, } from "@microsoft/fast-element";
import { ViewBehaviorOrchestrator } from "@microsoft/fast-element/utilities";
import { keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp, keyBackspace, keyDelete, keyEnter, keyEscape, uniqueId, } from "@microsoft/fast-web-utilities";
import { FlyoutPosBottom, FlyoutPosBottomFill, FlyoutPosTallest, FlyoutPosTallestFill, FlyoutPosTop, FlyoutPosTopFill, } from "../anchored-region/index.js";
import { FASTPickerListItem } from "./picker-list-item.js";
import { FASTPickerMenuOption } from "./picker-menu-option.js";
import { FormAssociatedPicker } from "./picker.form-associated.js";
import { MenuPlacement } from "./picker.options.js";
const pickerInputTemplate = html `
    <input
        slot="input-region"
        role="combobox"
        type="text"
        autocapitalize="off"
        autocomplete="off"
        haspopup="list"
        aria-label="${x => x.label}"
        aria-labelledby="${x => x.labelledBy}"
        placeholder="${x => x.placeholder}"
        ${ref("inputElement")}
    />
`;
/**
 * A Picker Custom HTML Element.  This is an early "alpha" version of the component.
 * Developers should expect the api to evolve, breaking changes are possible.
 *
 * @beta
 */
export class FASTPicker extends FormAssociatedPicker {
    constructor() {
        super(...arguments);
        /**
         * Currently selected items. Comma delineated string ie. "apples,oranges".
         *
         * @remarks
         * HTML Attribute: selection
         */
        this.selection = "";
        /**
         * Whether the component should remove an option from the list when it is in the selection
         *
         * @remarks
         * HTML Attribute: filter-selected
         */
        this.filterSelected = true;
        /**
         * Whether the component should remove options based on the current query
         *
         * @remarks
         * HTML Attribute: filter-query
         */
        this.filterQuery = true;
        /**
         * The text to present to assistive technolgies when no suggestions are available.
         *
         * @remarks
         * HTML Attribute: no-suggestions-text
         */
        this.noSuggestionsText = "No suggestions available";
        /**
         *  The text to present to assistive technolgies when suggestions are available.
         *
         * @remarks
         * HTML Attribute: suggestions-available-text
         */
        this.suggestionsAvailableText = "Suggestions available";
        /**
         * The text to present to assistive technologies when suggestions are loading.
         *
         * @remarks
         * HTML Attribute: loading-text
         */
        this.loadingText = "Loading suggestions";
        /**
         * Controls menu placement
         *
         * @remarks
         * HTML Attribute: menu-placement
         */
        this.menuPlacement = MenuPlacement.bottomFill;
        /**
         * Whether to display a loading state if the menu is opened.
         *
         */
        this.showLoading = false;
        /**
         *  Current list of options in array form
         *
         */
        this.optionsList = [];
        /**
         *  Current list of filtered options in array form
         *
         * @internal
         */
        this.filteredOptionsList = [];
        /**
         *  Indicates if the flyout menu is open or not
         *
         * @internal
         */
        this.flyoutOpen = false;
        /**
         *  Index of currently active menu option
         *
         * @internal
         */
        this.menuFocusIndex = -1;
        /**
         *  Internal flag to indicate no options available display should be shown.
         *
         * @internal
         */
        this.showNoOptions = false;
        /**
         *
         *
         * @internal
         */
        this.selectedItems = [];
        this.inputElementView = null;
        this.behaviorOrchestrator = null;
        /**
         * Handle input event from input element
         */
        this.handleTextInput = (e) => {
            this.query = this.inputElement.value;
        };
        /**
         * Handle click event from input element
         */
        this.handleInputClick = (e) => {
            e.preventDefault();
            this.toggleFlyout(true);
        };
        /**
         * Sets properties on the anchored region once it is instanciated.
         */
        this.setRegionProps = () => {
            if (!this.flyoutOpen) {
                return;
            }
            if (this.region === null || this.region === undefined) {
                // TODO: limit this
                Updates.enqueue(this.setRegionProps);
                return;
            }
            this.region.anchorElement = this.inputElement;
        };
        /**
         * matches menu placement values with the associated menu config
         */
        this.configLookup = {
            top: FlyoutPosTop,
            bottom: FlyoutPosBottom,
            tallest: FlyoutPosTallest,
            "top-fill": FlyoutPosTopFill,
            "bottom-fill": FlyoutPosBottomFill,
            "tallest-fill": FlyoutPosTallestFill,
        };
    }
    selectionChanged() {
        if (this.$fastController.isConnected) {
            this.handleSelectionChange();
            if (this.proxy instanceof HTMLInputElement) {
                this.proxy.value = this.selection;
                this.validate();
            }
        }
    }
    optionsChanged() {
        this.optionsList = this.options
            .split(",")
            .map(opt => opt.trim())
            .filter(opt => opt !== "");
    }
    menuPlacementChanged() {
        if (this.$fastController.isConnected) {
            this.updateMenuConfig();
        }
    }
    showLoadingChanged() {
        if (this.$fastController.isConnected) {
            Updates.enqueue(() => {
                this.setFocusedOption(0);
            });
        }
    }
    listItemTemplateChanged() {
        this.updateListItemTemplate();
    }
    defaultListItemTemplateChanged() {
        this.updateListItemTemplate();
    }
    menuOptionTemplateChanged() {
        this.updateOptionTemplate();
    }
    defaultMenuOptionTemplateChanged() {
        this.updateOptionTemplate();
    }
    optionsListChanged() {
        this.updateFilteredOptions();
    }
    queryChanged() {
        if (this.$fastController.isConnected) {
            if (this.inputElement.value !== this.query) {
                this.inputElement.value = this.query;
            }
            this.updateFilteredOptions();
            this.$emit("querychange", { bubbles: false });
        }
    }
    filteredOptionsListChanged() {
        if (this.$fastController.isConnected) {
            this.showNoOptions =
                this.filteredOptionsList.length === 0 &&
                    this.menuElement.querySelectorAll('[role="listitem"]').length === 0;
            this.setFocusedOption(this.showNoOptions ? -1 : 0);
        }
    }
    flyoutOpenChanged() {
        if (this.flyoutOpen) {
            Updates.enqueue(this.setRegionProps);
            this.$emit("menuopening", { bubbles: false });
        }
        else {
            this.$emit("menuclosing", { bubbles: false });
        }
    }
    showNoOptionsChanged() {
        if (this.$fastController.isConnected) {
            Updates.enqueue(() => {
                this.setFocusedOption(0);
            });
        }
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        if (!this.listElement) {
            this.listElement = document.createElement(this.selectedListTag);
            this.appendChild(this.listElement);
            this.itemsPlaceholderElement = document.createComment("");
            this.listElement.appendChild(this.itemsPlaceholderElement);
        }
        this.inputElementView = pickerInputTemplate.render(this, this.listElement);
        const match = this.menuTag.toUpperCase();
        this.menuElement = Array.from(this.children).find((element) => {
            return element.tagName === match;
        });
        if (!this.menuElement) {
            this.menuElement = document.createElement(this.menuTag);
            this.appendChild(this.menuElement);
            if (this.menuElement.id === "") {
                this.menuElement.id = uniqueId("listbox-");
            }
            this.menuId = this.menuElement.id;
        }
        if (!this.optionsPlaceholder) {
            this.optionsPlaceholder = document.createComment("");
            this.menuElement.appendChild(this.optionsPlaceholder);
        }
        this.updateMenuConfig();
        Updates.enqueue(() => this.initialize());
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.toggleFlyout(false);
        this.inputElement.removeEventListener("input", this.handleTextInput);
        this.inputElement.removeEventListener("click", this.handleInputClick);
        if (this.inputElementView !== null) {
            this.inputElementView.dispose();
            this.inputElementView = null;
        }
    }
    /**
     * Move focus to the input element
     * @public
     */
    focus() {
        this.inputElement.focus();
    }
    /**
     * Initialize the component.  This is delayed a frame to ensure children are connected as well.
     */
    initialize() {
        this.updateListItemTemplate();
        this.updateOptionTemplate();
        if (this.behaviorOrchestrator === null) {
            this.behaviorOrchestrator = ViewBehaviorOrchestrator.create(this);
            this.$fastController.addBehavior(this.behaviorOrchestrator);
            this.behaviorOrchestrator.addBehaviorFactory(new RepeatDirective(bind(x => x.selectedItems), bind(x => x.activeListItemTemplate), { positioning: true }), this.itemsPlaceholderElement);
            this.behaviorOrchestrator.addBehaviorFactory(new RepeatDirective(bind(x => x.filteredOptionsList), bind(x => x.activeMenuOptionTemplate), { positioning: true }), this.optionsPlaceholder);
        }
        this.inputElement.addEventListener("input", this.handleTextInput);
        this.inputElement.addEventListener("click", this.handleInputClick);
        this.menuElement.suggestionsAvailableText = this.suggestionsAvailableText;
        this.menuElement.addEventListener("optionsupdated", this.handleMenuOptionsUpdated);
        this.handleSelectionChange();
    }
    /**
     * Toggles the menu flyout
     */
    toggleFlyout(open) {
        if (this.flyoutOpen === open) {
            return;
        }
        if (open && document.activeElement === this.inputElement) {
            this.flyoutOpen = open;
            Updates.enqueue(() => {
                if (this.menuElement !== undefined) {
                    this.setFocusedOption(0);
                }
                else {
                    this.disableMenu();
                }
            });
            return;
        }
        this.flyoutOpen = false;
        this.disableMenu();
        return;
    }
    /**
     * Handle the menu options updated event from the child menu
     */
    handleMenuOptionsUpdated(e) {
        e.preventDefault();
        if (this.flyoutOpen) {
            this.setFocusedOption(0);
        }
    }
    /**
     * Handle key down events.
     */
    handleKeyDown(e) {
        if (e.defaultPrevented) {
            return false;
        }
        switch (e.key) {
            // TODO: what should "home" and "end" keys do, exactly?
            //
            // case keyHome: {
            //     if (!this.flyoutOpen) {
            //         this.toggleFlyout(true);
            //     } else {
            //         if (this.menuElement.optionElements.length > 0) {
            //             this.setFocusedOption(0);
            //         }
            //     }
            //     return false;
            // }
            // case keyEnd: {
            //     if (!this.flyoutOpen) {
            //         this.toggleFlyout(true);
            //     } else {
            //         if (this.menuElement.optionElements.length > 0) {
            //             this.toggleFlyout(true);
            //             this.setFocusedOption(this.menuElement.optionElements.length - 1);
            //         }
            //     }
            //     return false;
            // }
            case keyArrowDown: {
                if (!this.flyoutOpen) {
                    this.toggleFlyout(true);
                }
                else {
                    const nextFocusOptionIndex = this.flyoutOpen
                        ? Math.min(this.menuFocusIndex + 1, this.menuElement.optionElements.length - 1)
                        : 0;
                    this.setFocusedOption(nextFocusOptionIndex);
                }
                return false;
            }
            case keyArrowUp: {
                if (!this.flyoutOpen) {
                    this.toggleFlyout(true);
                }
                else {
                    const previousFocusOptionIndex = this.flyoutOpen
                        ? Math.max(this.menuFocusIndex - 1, 0)
                        : 0;
                    this.setFocusedOption(previousFocusOptionIndex);
                }
                return false;
            }
            case keyEscape: {
                this.toggleFlyout(false);
                return false;
            }
            case keyEnter: {
                if (this.menuFocusIndex !== -1 &&
                    this.menuElement.optionElements.length > this.menuFocusIndex) {
                    this.menuElement.optionElements[this.menuFocusIndex].click();
                }
                return false;
            }
            case keyArrowRight: {
                if (document.activeElement !== this.inputElement) {
                    this.incrementFocusedItem(1);
                    return false;
                }
                // don't block if arrow keys moving caret in input element
                return true;
            }
            case keyArrowLeft: {
                if (this.inputElement.selectionStart === 0) {
                    this.incrementFocusedItem(-1);
                    return false;
                }
                // don't block if arrow keys moving caret in input element
                return true;
            }
            case keyDelete:
            case keyBackspace: {
                if (document.activeElement === null) {
                    return true;
                }
                if (document.activeElement === this.inputElement) {
                    if (this.inputElement.selectionStart === 0) {
                        this.selection = this.selectedItems
                            .slice(0, this.selectedItems.length - 1)
                            .toString();
                        this.toggleFlyout(false);
                        return false;
                    }
                    // let text deletion proceed
                    return true;
                }
                const selectedItems = Array.from(this.listElement.children);
                const currentFocusedItemIndex = selectedItems.indexOf(document.activeElement);
                if (currentFocusedItemIndex > -1) {
                    // delete currently focused item
                    this.selection = this.selectedItems
                        .splice(currentFocusedItemIndex, 1)
                        .toString();
                    Updates.enqueue(() => {
                        selectedItems[Math.min(selectedItems.length, currentFocusedItemIndex)].focus();
                    });
                    return false;
                }
                return true;
            }
        }
        this.toggleFlyout(true);
        return true;
    }
    /**
     * Handle focus in events.
     */
    handleFocusIn(e) {
        return false;
    }
    /**
     * Handle focus out events.
     */
    handleFocusOut(e) {
        if (this.menuElement === undefined ||
            !this.menuElement.contains(e.relatedTarget)) {
            this.toggleFlyout(false);
        }
        return false;
    }
    /**
     * The list of selected items has changed
     */
    handleSelectionChange() {
        if (this.selectedItems.toString() === this.selection) {
            return;
        }
        this.selectedItems = this.selection === "" ? [] : this.selection.split(",");
        this.updateFilteredOptions();
        Updates.enqueue(() => {
            this.checkMaxItems();
        });
        this.$emit("selectionchange", { bubbles: false });
    }
    /**
     * Anchored region is loaded, menu and options exist in the DOM.
     */
    handleRegionLoaded(e) {
        Updates.enqueue(() => {
            this.setFocusedOption(0);
            this.$emit("menuloaded", { bubbles: false });
        });
    }
    /**
     * Checks if the maximum number of items has been chosen and updates the ui.
     */
    checkMaxItems() {
        if (this.inputElement === undefined) {
            return;
        }
        if (this.maxSelected !== undefined &&
            this.selectedItems.length >= this.maxSelected) {
            if (document.activeElement === this.inputElement) {
                const selectedItemInstances = Array.from(this.listElement.querySelectorAll("[role='listitem']"));
                selectedItemInstances[selectedItemInstances.length - 1].focus();
            }
            this.inputElement.hidden = true;
        }
        else {
            this.inputElement.hidden = false;
        }
    }
    /**
     * A list item has been invoked.
     */
    handleItemInvoke(e) {
        if (e.defaultPrevented) {
            return false;
        }
        if (e.target instanceof FASTPickerListItem) {
            const listItems = Array.from(this.listElement.querySelectorAll("[role='listitem']"));
            const itemIndex = listItems.indexOf(e.target);
            if (itemIndex !== -1) {
                const newSelection = this.selectedItems.slice();
                newSelection.splice(itemIndex, 1);
                this.selection = newSelection.toString();
                Updates.enqueue(() => this.incrementFocusedItem(0));
            }
            return false;
        }
        return true;
    }
    /**
     * A menu option has been invoked.
     */
    handleOptionInvoke(e) {
        if (e.defaultPrevented) {
            return false;
        }
        if (e.target instanceof FASTPickerMenuOption) {
            if (e.target.value !== undefined) {
                this.selection = `${this.selection}${this.selection === "" ? "" : ","}${e.target.value}`;
            }
            this.inputElement.value = "";
            this.query = "";
            this.inputElement.focus();
            this.toggleFlyout(false);
            return false;
        }
        // const value: string = (e.target as PickerMenuOption).value;
        return true;
    }
    /**
     * Increments the focused list item by the specified amount
     */
    incrementFocusedItem(increment) {
        if (this.selectedItems.length === 0) {
            this.inputElement.focus();
            return;
        }
        const selectedItemsAsElements = Array.from(this.listElement.querySelectorAll("[role='listitem']"));
        if (document.activeElement !== null) {
            let currentFocusedItemIndex = selectedItemsAsElements.indexOf(document.activeElement);
            if (currentFocusedItemIndex === -1) {
                // use the input element
                currentFocusedItemIndex = selectedItemsAsElements.length;
            }
            const newFocusedItemIndex = Math.min(selectedItemsAsElements.length, Math.max(0, currentFocusedItemIndex + increment));
            if (newFocusedItemIndex === selectedItemsAsElements.length) {
                if (this.maxSelected !== undefined &&
                    this.selectedItems.length >= this.maxSelected) {
                    selectedItemsAsElements[newFocusedItemIndex - 1].focus();
                }
                else {
                    this.inputElement.focus();
                }
            }
            else {
                selectedItemsAsElements[newFocusedItemIndex].focus();
            }
        }
    }
    /**
     * Disables the menu. Note that the menu can be open, just doens't have any valid options on display.
     */
    disableMenu() {
        var _a, _b, _c;
        this.menuFocusIndex = -1;
        this.menuFocusOptionId = undefined;
        (_a = this.inputElement) === null || _a === void 0 ? void 0 : _a.removeAttribute("aria-activedescendant");
        (_b = this.inputElement) === null || _b === void 0 ? void 0 : _b.removeAttribute("aria-owns");
        (_c = this.inputElement) === null || _c === void 0 ? void 0 : _c.removeAttribute("aria-expanded");
    }
    /**
     * Sets the currently focused menu option by index
     */
    setFocusedOption(optionIndex) {
        if (!this.flyoutOpen ||
            optionIndex === -1 ||
            this.showNoOptions ||
            this.showLoading) {
            this.disableMenu();
            return;
        }
        if (this.menuElement.optionElements.length === 0) {
            return;
        }
        this.menuElement.optionElements.forEach((element) => {
            element.setAttribute("aria-selected", "false");
        });
        this.menuFocusIndex = optionIndex;
        if (this.menuFocusIndex > this.menuElement.optionElements.length - 1) {
            this.menuFocusIndex = this.menuElement.optionElements.length - 1;
        }
        this.menuFocusOptionId = this.menuElement.optionElements[this.menuFocusIndex].id;
        this.inputElement.setAttribute("aria-owns", this.menuId);
        this.inputElement.setAttribute("aria-expanded", "true");
        this.inputElement.setAttribute("aria-activedescendant", this.menuFocusOptionId);
        const focusedOption = this.menuElement.optionElements[this.menuFocusIndex];
        focusedOption.setAttribute("aria-selected", "true");
        this.menuElement.scrollTo(0, focusedOption.offsetTop);
    }
    /**
     * Updates the template used for the list item repeat behavior
     */
    updateListItemTemplate() {
        var _a;
        this.activeListItemTemplate =
            (_a = this.listItemTemplate) !== null && _a !== void 0 ? _a : this.defaultListItemTemplate;
    }
    /**
     * Updates the template used for the menu option repeat behavior
     */
    updateOptionTemplate() {
        var _a;
        this.activeMenuOptionTemplate =
            (_a = this.menuOptionTemplate) !== null && _a !== void 0 ? _a : this.defaultMenuOptionTemplate;
    }
    /**
     * Updates the filtered options array
     */
    updateFilteredOptions() {
        this.filteredOptionsList = this.optionsList.slice(0);
        if (this.filterSelected) {
            this.filteredOptionsList = this.filteredOptionsList.filter(el => this.selectedItems.indexOf(el) === -1);
        }
        if (this.filterQuery && this.query !== "" && this.query !== undefined) {
            this.filteredOptionsList = this.filteredOptionsList.filter(el => el.indexOf(this.query) !== -1);
        }
    }
    /**
     * Updates the menu configuration
     */
    updateMenuConfig() {
        let newConfig = this.configLookup[this.menuPlacement];
        if (newConfig === null) {
            newConfig = FlyoutPosBottomFill;
        }
        this.menuConfig = Object.assign(Object.assign({}, newConfig), { autoUpdateMode: "auto", fixedPlacement: true, horizontalViewportLock: false, verticalViewportLock: false });
    }
}
__decorate([
    attr({ attribute: "selection" })
], FASTPicker.prototype, "selection", void 0);
__decorate([
    attr({ attribute: "options" })
], FASTPicker.prototype, "options", void 0);
__decorate([
    attr({ attribute: "filter-selected", mode: "boolean" })
], FASTPicker.prototype, "filterSelected", void 0);
__decorate([
    attr({ attribute: "filter-query", mode: "boolean" })
], FASTPicker.prototype, "filterQuery", void 0);
__decorate([
    attr({ attribute: "max-selected" })
], FASTPicker.prototype, "maxSelected", void 0);
__decorate([
    attr({ attribute: "no-suggestions-text" })
], FASTPicker.prototype, "noSuggestionsText", void 0);
__decorate([
    attr({ attribute: "suggestions-available-text" })
], FASTPicker.prototype, "suggestionsAvailableText", void 0);
__decorate([
    attr({ attribute: "loading-text" })
], FASTPicker.prototype, "loadingText", void 0);
__decorate([
    attr({ attribute: "label" })
], FASTPicker.prototype, "label", void 0);
__decorate([
    attr({ attribute: "labelledby" })
], FASTPicker.prototype, "labelledBy", void 0);
__decorate([
    attr({ attribute: "placeholder" })
], FASTPicker.prototype, "placeholder", void 0);
__decorate([
    attr({ attribute: "menu-placement" })
], FASTPicker.prototype, "menuPlacement", void 0);
__decorate([
    observable
], FASTPicker.prototype, "showLoading", void 0);
__decorate([
    observable
], FASTPicker.prototype, "listItemTemplate", void 0);
__decorate([
    observable
], FASTPicker.prototype, "defaultListItemTemplate", void 0);
__decorate([
    observable
], FASTPicker.prototype, "activeListItemTemplate", void 0);
__decorate([
    observable
], FASTPicker.prototype, "menuOptionTemplate", void 0);
__decorate([
    observable
], FASTPicker.prototype, "defaultMenuOptionTemplate", void 0);
__decorate([
    observable
], FASTPicker.prototype, "activeMenuOptionTemplate", void 0);
__decorate([
    observable
], FASTPicker.prototype, "listItemContentsTemplate", void 0);
__decorate([
    observable
], FASTPicker.prototype, "menuOptionContentsTemplate", void 0);
__decorate([
    observable
], FASTPicker.prototype, "optionsList", void 0);
__decorate([
    observable
], FASTPicker.prototype, "query", void 0);
__decorate([
    observable
], FASTPicker.prototype, "filteredOptionsList", void 0);
__decorate([
    observable
], FASTPicker.prototype, "flyoutOpen", void 0);
__decorate([
    observable
], FASTPicker.prototype, "menuId", void 0);
__decorate([
    observable
], FASTPicker.prototype, "selectedListTag", void 0);
__decorate([
    observable
], FASTPicker.prototype, "menuTag", void 0);
__decorate([
    observable
], FASTPicker.prototype, "menuFocusIndex", void 0);
__decorate([
    observable
], FASTPicker.prototype, "menuFocusOptionId", void 0);
__decorate([
    observable
], FASTPicker.prototype, "showNoOptions", void 0);
__decorate([
    observable
], FASTPicker.prototype, "menuConfig", void 0);
__decorate([
    observable
], FASTPicker.prototype, "selectedItems", void 0);
