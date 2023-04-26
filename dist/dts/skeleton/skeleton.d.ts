import { FASTElement } from "@microsoft/fast-element";
import type { ValuesOf } from "../utilities/index.js";
/**
 * A structure representing skeleton shapes
 * @public
 */
export declare const SkeletonShape: {
    readonly rect: "rect";
    readonly circle: "circle";
};
/**
 * @public
 */
export type SkeletonShape = ValuesOf<typeof SkeletonShape>;
/**
 * A Skeleton Custom HTML Element.
 *
 * @slot - The default slot
 *
 * @public
 */
export declare class FASTSkeleton extends FASTElement {
    /**
     * Indicates the Skeleton should have a filled style.
     *
     * @public
     * @remarks
     * HTML Attribute: fill
     */
    fill: string;
    /**
     * Indicates what the shape of the Skeleton should be.
     *
     * @public
     * @remarks
     * HTML Attribute: shape
     */
    shape: SkeletonShape;
    /**
     * Indicates that the component can accept a pattern URL.
     *
     * @public
     * @remarks
     * HTML Attribute: pattern
     */
    pattern: string;
    /**
     * Indicates that the component has an activated shimmer effect
     *
     * @public
     * @remarks
     * HTML Attribute: shimmer
     */
    shimmer: boolean;
}
