import { __decorate } from "tslib";
import { attr, FASTElement } from "@microsoft/fast-element";
import { DividerOrientation, DividerRole } from "./divider.options.js";
/**
 * A Divider Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#separator | ARIA separator } or {@link https://www.w3.org/TR/wai-aria-1.1/#presentation | ARIA presentation}.
 *
 * @public
 */
export class FASTDivider extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * The role of the element.
         *
         * @public
         * @remarks
         * HTML Attribute: role
         */
        this.role = DividerRole.separator;
        /**
         * The orientation of the divider.
         *
         * @public
         * @remarks
         * HTML Attribute: orientation
         */
        this.orientation = DividerOrientation.horizontal;
    }
}
__decorate([
    attr
], FASTDivider.prototype, "role", void 0);
__decorate([
    attr
], FASTDivider.prototype, "orientation", void 0);
