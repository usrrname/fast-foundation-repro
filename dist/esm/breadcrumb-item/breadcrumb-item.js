import { __decorate } from "tslib";
import { observable } from "@microsoft/fast-element";
import { DelegatesARIALink, FASTAnchor } from "../anchor/anchor.js";
import { StartEnd } from "../patterns/start-end.js";
import { applyMixins } from "../utilities/apply-mixins.js";
/**
 * A Breadcrumb Item Custom HTML Element.
 *
 * @slot start - Content which can be provided before the breadcrumb content
 * @slot end - Content which can be provided after the breadcrumb content
 * @slot - The default slot for when no href is provided or for providing your own custom elements
 * @slot separator - The slot for providing a custom separator
 * @csspart listitem - The wrapping container for the item, represents a semantic listitem
 * @csspart separator - The wrapping element for the separator
 *
 * @public
 */
export class FASTBreadcrumbItem extends FASTAnchor {
    constructor() {
        super(...arguments);
        /**
         * @internal
         */
        this.separator = true;
    }
}
__decorate([
    observable
], FASTBreadcrumbItem.prototype, "separator", void 0);
applyMixins(FASTBreadcrumbItem, StartEnd, DelegatesARIALink);
