import { __decorate } from "tslib";
import { attr, FASTElement, observable } from "@microsoft/fast-element";
import { isHTMLElement } from "@microsoft/fast-web-utilities";
import { StartEnd } from "../patterns/start-end.js";
import { applyMixins } from "../utilities/apply-mixins.js";
/**
 * check if the item is a tree item
 * @public
 * @remarks
 * determines if element is an HTMLElement and if it has the role treeitem
 */
export function isTreeItemElement(el) {
    return isHTMLElement(el) && el.isTreeItem;
}
/**
 * A Tree item Custom HTML Element.
 *
 * @slot start - Content which can be provided before the tree item content
 * @slot end - Content which can be provided after the tree item content
 * @slot - The default slot for tree item text content
 * @slot item - The slot for tree items (fast tree items manage this assignment themselves)
 * @slot expand-collapse-button - The expand/collapse button
 * @csspart positioning-region - The element used to position the tree item content with exception of any child nodes
 * @csspart content-region - The element containing the expand/collapse, start, and end slots
 * @csspart items - The element wrapping any child items
 * @csspart expand-collapse-button - The expand/collapse button
 * @fires expanded-change - Fires a custom 'expanded-change' event when the expanded state changes
 * @fires selected-change - Fires a custom 'selected-change' event when the selected state changes
 *
 * @public
 */
export class FASTTreeItem extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * When true, the control will be appear expanded by user interaction.
         * @public
         * @remarks
         * HTML Attribute: expanded
         */
        this.expanded = false;
        /**
         *  Readonly property identifying the element as a tree item
         *
         * @internal
         */
        this.isTreeItem = true;
        /**
         * Whether the item is focusable
         *
         * @internal
         */
        this.focusable = false;
        /**
         * Indicates if the tree item is nested
         *
         * @public
         * @deprecated - will be removed in coming ALPHA version
         * HTML Attribute: nested
         */
        this.nested = false;
        /**
         * Whether the tree is nested
         *
         * @public
         */
        this.isNestedItem = () => {
            return isTreeItemElement(this.parentElement);
        };
        /**
         * Handle expand button click
         *
         * @internal
         */
        this.handleExpandCollapseButtonClick = (e) => {
            if (!this.disabled && !e.defaultPrevented) {
                this.expanded = !this.expanded;
            }
        };
        /**
         * Handle focus events
         *
         * @internal
         */
        this.handleFocus = (e) => {
            this.setAttribute("tabindex", "0");
        };
        /**
         * Handle blur events
         *
         * @internal
         */
        this.handleBlur = (e) => {
            this.setAttribute("tabindex", "-1");
        };
    }
    expandedChanged(prev, next) {
        if (this.$fastController.isConnected) {
            this.$emit("expanded-change", this);
        }
    }
    selectedChanged(prev, next) {
        if (this.$fastController.isConnected) {
            this.$emit("selected-change", this);
        }
    }
    itemsChanged(oldValue, newValue) {
        if (this.$fastController.isConnected) {
            this.items.forEach((node) => {
                if (isTreeItemElement(node)) {
                    // TODO: maybe not require it to be a TreeItem?
                    node.nested = true;
                }
            });
        }
    }
    /**
     * Places document focus on a tree item
     *
     * @public
     * @param el - the element to focus
     */
    static focusItem(el) {
        el.focusable = true;
        el.focus();
    }
    /**
     * Gets number of children
     *
     * @internal
     */
    get childItemLength() {
        var _a;
        if (this.$fastController.isConnected) {
            return (_a = this.childItems) === null || _a === void 0 ? void 0 : _a.filter(item => isTreeItemElement(item)).length;
        }
        return 0;
    }
}
__decorate([
    attr({ mode: "boolean" })
], FASTTreeItem.prototype, "expanded", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTTreeItem.prototype, "selected", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTTreeItem.prototype, "disabled", void 0);
__decorate([
    observable
], FASTTreeItem.prototype, "focusable", void 0);
__decorate([
    observable
], FASTTreeItem.prototype, "childItems", void 0);
__decorate([
    observable
], FASTTreeItem.prototype, "items", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTTreeItem.prototype, "nested", void 0);
applyMixins(FASTTreeItem, StartEnd);
