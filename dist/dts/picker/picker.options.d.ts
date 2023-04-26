import type { ValuesOf } from "../utilities/index.js";
/**
 * vertical positioning values for an anchored region
 * @beta
 */
export declare const MenuPlacement: {
    readonly bottom: "bottom";
    readonly bottomFill: "bottom-fill";
    readonly tallest: "tallest";
    readonly tallestFill: "tallest-fill";
    readonly top: "top";
    readonly topFill: "top-fill";
};
/**
 * Type for vertical positioning values for an anchored region
 * @beta
 */
export type MenuPlacement = ValuesOf<typeof MenuPlacement>;
