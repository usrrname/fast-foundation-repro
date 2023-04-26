import { __decorate } from "tslib";
import { attr, FASTElement } from "@microsoft/fast-element";
/**
 * A structure representing skeleton shapes
 * @public
 */
export const SkeletonShape = {
    rect: "rect",
    circle: "circle",
};
/**
 * A Skeleton Custom HTML Element.
 *
 * @slot - The default slot
 *
 * @public
 */
export class FASTSkeleton extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * Indicates what the shape of the Skeleton should be.
         *
         * @public
         * @remarks
         * HTML Attribute: shape
         */
        this.shape = SkeletonShape.rect;
    }
}
__decorate([
    attr
], FASTSkeleton.prototype, "fill", void 0);
__decorate([
    attr
], FASTSkeleton.prototype, "shape", void 0);
__decorate([
    attr
], FASTSkeleton.prototype, "pattern", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTSkeleton.prototype, "shimmer", void 0);
