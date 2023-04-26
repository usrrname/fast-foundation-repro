import { __decorate } from "tslib";
import { attr, FASTElement, observable } from "@microsoft/fast-element";
import { ARIAGlobalStatesAndProperties, StartEnd } from "../patterns/index.js";
import { applyMixins } from "../utilities/apply-mixins.js";
/**
 * An Anchor Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a | <a> element }.
 *
 * @slot start - Content which can be provided before the anchor content
 * @slot end - Content which can be provided after the anchor content
 * @slot - The default slot for anchor content
 * @csspart control - The anchor element
 * @csspart content - The element wrapping anchor content
 *
 * @public
 */
export class FASTAnchor extends FASTElement {
}
__decorate([
    attr
], FASTAnchor.prototype, "download", void 0);
__decorate([
    attr
], FASTAnchor.prototype, "href", void 0);
__decorate([
    attr
], FASTAnchor.prototype, "hreflang", void 0);
__decorate([
    attr
], FASTAnchor.prototype, "ping", void 0);
__decorate([
    attr
], FASTAnchor.prototype, "referrerpolicy", void 0);
__decorate([
    attr
], FASTAnchor.prototype, "rel", void 0);
__decorate([
    attr
], FASTAnchor.prototype, "target", void 0);
__decorate([
    attr
], FASTAnchor.prototype, "type", void 0);
__decorate([
    observable
], FASTAnchor.prototype, "defaultSlottedContent", void 0);
/**
 * Includes ARIA states and properties relating to the ARIA link role
 *
 * @public
 */
export class DelegatesARIALink {
}
__decorate([
    attr({ attribute: "aria-expanded" })
], DelegatesARIALink.prototype, "ariaExpanded", void 0);
applyMixins(DelegatesARIALink, ARIAGlobalStatesAndProperties);
applyMixins(FASTAnchor, StartEnd, DelegatesARIALink);
