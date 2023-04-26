import type { ValuesOf } from "../utilities/index.js";
/**
 * The direction options for flipper.
 * @public
 */
export declare const FlipperDirection: {
    readonly next: "next";
    readonly previous: "previous";
};
/**
 * The types for the flipper direction options.
 * @public
 */
export type FlipperDirection = ValuesOf<typeof FlipperDirection>;
