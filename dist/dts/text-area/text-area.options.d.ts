import type { ValuesOf } from "../utilities/index.js";
/**
 * Resize mode for a TextArea
 * @public
 */
export declare const TextAreaResize: {
    /**
     * No resize.
     */
    readonly none: "none";
    /**
     * Resize vertically and horizontally.
     */
    readonly both: "both";
    /**
     * Resize horizontally.
     */
    readonly horizontal: "horizontal";
    /**
     * Resize vertically.
     */
    readonly vertical: "vertical";
};
/**
 * Types for the Text Area resize mode
 * @public
 */
export type TextAreaResize = ValuesOf<typeof TextAreaResize>;
