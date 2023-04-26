import { __decorate } from "tslib";
import { FASTElement, observable } from "@microsoft/fast-element";
import { FASTBreadcrumbItem } from "../breadcrumb-item/breadcrumb-item.js";
/**
 * A Breadcrumb Custom HTML Element.
 * @slot - The default slot for the breadcrumb items
 * @csspart list - The element wrapping the slotted items
 *
 * @public
 */
export class FASTBreadcrumb extends FASTElement {
    slottedBreadcrumbItemsChanged() {
        if (this.$fastController.isConnected) {
            if (this.slottedBreadcrumbItems === undefined ||
                this.slottedBreadcrumbItems.length === 0) {
                return;
            }
            const lastNode = this.slottedBreadcrumbItems[this.slottedBreadcrumbItems.length - 1];
            this.slottedBreadcrumbItems.forEach((item) => {
                const itemIsLastNode = item === lastNode;
                this.setItemSeparator(item, itemIsLastNode);
                this.setAriaCurrent(item, itemIsLastNode);
            });
        }
    }
    setItemSeparator(item, isLastNode) {
        if (item instanceof FASTBreadcrumbItem) {
            item.separator = !isLastNode;
        }
    }
    /**
     * Finds anchor childnodes in the light DOM or shadow DOM.
     * We look in the shadow DOM because we use an anchor inside the breadcrumb-item template.
     */
    findChildAnchor(node) {
        var _a, _b;
        if (node.childElementCount > 0) {
            return node.querySelector("a");
        }
        else if ((_a = node.shadowRoot) === null || _a === void 0 ? void 0 : _a.childElementCount) {
            return (_b = node.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector("a");
        }
        else
            return node;
    }
    /**
     * Sets ARIA Current for the "current" node
     * `aria-current` is not optional and should be set regardless of the href value of a given anchor
     */
    setAriaCurrent(item, isLastNode) {
        const childNode = this.findChildAnchor(item);
        if (childNode !== null) {
            isLastNode
                ? childNode.setAttribute("aria-current", "page")
                : childNode.removeAttribute("aria-current");
        }
    }
}
__decorate([
    observable
], FASTBreadcrumb.prototype, "slottedBreadcrumbItems", void 0);
