import type { ValuesOf } from "../utilities/index.js";
/**
 * Divider roles
 * @public
 */
export declare const DividerRole: {
    /**
     * The divider semantically separates content
     */
    readonly separator: "separator";
    /**
     * The divider has no semantic value and is for visual presentation only.
     */
    readonly presentation: "presentation";
};
/**
 * The types for Divider roles
 * @public
 */
export type DividerRole = ValuesOf<typeof DividerRole>;
/**
 * Divider orientation
 * @public
 */
export declare const DividerOrientation: {
    readonly horizontal: "horizontal";
    readonly vertical: "vertical";
};
/**
 * The types for Divider orientation
 * @public
 */
export type DividerOrientation = ValuesOf<typeof DividerOrientation>;
