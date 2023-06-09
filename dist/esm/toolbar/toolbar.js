import { __decorate } from "tslib";
import { attr, FASTElement, observable, Observable } from "@microsoft/fast-element";
import { ArrowKeys, Direction, limit } from "@microsoft/fast-web-utilities";
import { isFocusable } from "tabbable";
import { ARIAGlobalStatesAndProperties, StartEnd } from "../patterns/index.js";
import { applyMixins } from "../utilities/apply-mixins.js";
import { getDirection } from "../utilities/direction.js";
import { ToolbarOrientation } from "./toolbar.options.js";
/**
 * A map for directionality derived from keyboard input strings,
 * visual orientation, and text direction.
 *
 * @internal
 */
const ToolbarArrowKeyMap = Object.freeze({
    [ArrowKeys.ArrowUp]: {
        [ToolbarOrientation.vertical]: -1,
    },
    [ArrowKeys.ArrowDown]: {
        [ToolbarOrientation.vertical]: 1,
    },
    [ArrowKeys.ArrowLeft]: {
        [ToolbarOrientation.horizontal]: {
            [Direction.ltr]: -1,
            [Direction.rtl]: 1,
        },
    },
    [ArrowKeys.ArrowRight]: {
        [ToolbarOrientation.horizontal]: {
            [Direction.ltr]: 1,
            [Direction.rtl]: -1,
        },
    },
});
/**
 * A Toolbar Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria-practices/#Toolbar|ARIA Toolbar}.
 *
 * @slot start - Content which can be provided before the slotted items
 * @slot end - Content which can be provided after the slotted items
 * @slot - The default slot for slotted items
 * @slot label - The toolbar label
 * @csspart positioning-region - The element containing the items, start and end slots
 *
 * @public
 */
export class FASTToolbar extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * The internal index of the currently focused element.
         *
         * @internal
         */
        this._activeIndex = 0;
        /**
         * The text direction of the toolbar.
         *
         * @internal
         */
        this.direction = Direction.ltr;
        /**
         * The orientation of the toolbar.
         *
         * @public
         * @remarks
         * HTML Attribute: `orientation`
         */
        this.orientation = ToolbarOrientation.horizontal;
    }
    /**
     * The index of the currently focused element, clamped between 0 and the last element.
     *
     * @internal
     */
    get activeIndex() {
        Observable.track(this, "activeIndex");
        return this._activeIndex;
    }
    set activeIndex(value) {
        if (this.$fastController.isConnected) {
            this._activeIndex = limit(0, this.focusableElements.length - 1, value);
            Observable.notify(this, "activeIndex");
        }
    }
    slottedItemsChanged() {
        if (this.$fastController.isConnected) {
            this.reduceFocusableElements();
        }
    }
    /**
     * Set the activeIndex when a focusable element in the toolbar is clicked.
     *
     * @internal
     */
    clickHandler(e) {
        var _a;
        const activeIndex = (_a = this.focusableElements) === null || _a === void 0 ? void 0 : _a.indexOf(e.target);
        if (activeIndex > -1 && this.activeIndex !== activeIndex) {
            this.setFocusedElement(activeIndex);
        }
        return true;
    }
    childItemsChanged(prev, next) {
        if (this.$fastController.isConnected) {
            this.reduceFocusableElements();
        }
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.direction = getDirection(this);
    }
    /**
     * When the toolbar receives focus, set the currently active element as focused.
     *
     * @internal
     */
    focusinHandler(e) {
        const relatedTarget = e.relatedTarget;
        if (!relatedTarget || this.contains(relatedTarget)) {
            return;
        }
        this.setFocusedElement();
    }
    /**
     * Determines a value that can be used to iterate a list with the arrow keys.
     *
     * @param this - An element with an orientation and direction
     * @param key - The event key value
     * @internal
     */
    getDirectionalIncrementer(key) {
        var _a, _b, _c, _d, _e;
        return ((_e = (_c = (_b = (_a = ToolbarArrowKeyMap[key]) === null || _a === void 0 ? void 0 : _a[this.orientation]) === null || _b === void 0 ? void 0 : _b[this.direction]) !== null && _c !== void 0 ? _c : (_d = ToolbarArrowKeyMap[key]) === null || _d === void 0 ? void 0 : _d[this.orientation]) !== null && _e !== void 0 ? _e : 0);
    }
    /**
     * Handle keyboard events for the toolbar.
     *
     * @internal
     */
    keydownHandler(e) {
        const key = e.key;
        if (!(key in ArrowKeys) || e.defaultPrevented || e.shiftKey) {
            return true;
        }
        const incrementer = this.getDirectionalIncrementer(key);
        if (!incrementer) {
            return !e.target.closest("[role=radiogroup]");
        }
        const nextIndex = this.activeIndex + incrementer;
        if (this.focusableElements[nextIndex]) {
            e.preventDefault();
        }
        this.setFocusedElement(nextIndex);
        return true;
    }
    /**
     * get all the slotted elements
     * @internal
     */
    get allSlottedItems() {
        return [
            ...this.start.assignedElements(),
            ...this.slottedItems,
            ...this.end.assignedElements(),
        ];
    }
    /**
     * Prepare the slotted elements which can be focusable.
     *
     * @internal
     */
    reduceFocusableElements() {
        var _a;
        const previousFocusedElement = (_a = this.focusableElements) === null || _a === void 0 ? void 0 : _a[this.activeIndex];
        this.focusableElements = this.allSlottedItems.reduce(FASTToolbar.reduceFocusableItems, []);
        // If the previously active item is still focusable, adjust the active index to the
        // index of that item.
        const adjustedActiveIndex = this.focusableElements.indexOf(previousFocusedElement);
        this.activeIndex = Math.max(0, adjustedActiveIndex);
        this.setFocusableElements();
    }
    /**
     * Set the activeIndex and focus the corresponding control.
     *
     * @param activeIndex - The new index to set
     * @internal
     */
    setFocusedElement(activeIndex = this.activeIndex) {
        var _a;
        this.activeIndex = activeIndex;
        this.setFocusableElements();
        (_a = this.focusableElements[this.activeIndex]) === null || _a === void 0 ? void 0 : _a.focus();
    }
    /**
     * Reduce a collection to only its focusable elements.
     *
     * @param elements - Collection of elements to reduce
     * @param element - The current element
     *
     * @internal
     */
    static reduceFocusableItems(elements, element) {
        var _a, _b, _c, _d;
        const isRoleRadio = element.getAttribute("role") === "radio";
        const isFocusableFastElement = (_b = (_a = element.$fastController) === null || _a === void 0 ? void 0 : _a.definition.shadowOptions) === null || _b === void 0 ? void 0 : _b.delegatesFocus;
        const hasFocusableShadow = Array.from((_d = (_c = element.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelectorAll("*")) !== null && _d !== void 0 ? _d : []).some(x => isFocusable(x));
        if (!element.hasAttribute("disabled") &&
            !element.hasAttribute("hidden") &&
            (isFocusable(element) ||
                isRoleRadio ||
                isFocusableFastElement ||
                hasFocusableShadow)) {
            elements.push(element);
            return elements;
        }
        if (element.childElementCount) {
            return elements.concat(Array.from(element.children).reduce(FASTToolbar.reduceFocusableItems, []));
        }
        return elements;
    }
    /**
     * @internal
     */
    setFocusableElements() {
        if (this.$fastController.isConnected && this.focusableElements.length > 0) {
            this.focusableElements.forEach((element, index) => {
                element.tabIndex = this.activeIndex === index ? 0 : -1;
            });
        }
    }
}
__decorate([
    observable
], FASTToolbar.prototype, "direction", void 0);
__decorate([
    attr
], FASTToolbar.prototype, "orientation", void 0);
__decorate([
    observable
], FASTToolbar.prototype, "slottedItems", void 0);
__decorate([
    observable
], FASTToolbar.prototype, "slottedLabel", void 0);
__decorate([
    observable
], FASTToolbar.prototype, "childItems", void 0);
/**
 * Includes ARIA states and properties relating to the ARIA toolbar role
 *
 * @public
 */
export class DelegatesARIAToolbar {
}
__decorate([
    attr({ attribute: "aria-labelledby" })
], DelegatesARIAToolbar.prototype, "ariaLabelledby", void 0);
__decorate([
    attr({ attribute: "aria-label" })
], DelegatesARIAToolbar.prototype, "ariaLabel", void 0);
applyMixins(DelegatesARIAToolbar, ARIAGlobalStatesAndProperties);
applyMixins(FASTToolbar, StartEnd, DelegatesARIAToolbar);
