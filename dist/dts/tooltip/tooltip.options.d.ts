import type { ValuesOf } from "../utilities/index.js";
/**
 * Enumerates possible tooltip placements.
 *
 * @public
 */
export declare const TooltipPlacement: {
    readonly bottom: "bottom";
    readonly bottomEnd: "bottom-end";
    readonly bottomStart: "bottom-start";
    readonly left: "left";
    readonly leftEnd: "left-end";
    readonly leftStart: "left-start";
    readonly right: "right";
    readonly rightEnd: "right-end";
    readonly rightStart: "right-start";
    readonly top: "top";
    readonly topEnd: "top-end";
    readonly topStart: "top-start";
};
/**
 * The possible tooltip placements.
 *
 * @public
 */
export type TooltipPlacement = ValuesOf<typeof TooltipPlacement>;
