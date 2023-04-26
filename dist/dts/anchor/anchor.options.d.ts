import type { ValuesOf } from "../utilities/index.js";
/**
 * Anchor target values.
 *
 * @public
 */
export declare const AnchorTarget: {
    readonly _self: "_self";
    readonly _blank: "_blank";
    readonly _parent: "_parent";
    readonly _top: "_top";
};
/**
 * Type for anchor target values.
 *
 * @public
 */
export type AnchorTarget = ValuesOf<typeof AnchorTarget>;
