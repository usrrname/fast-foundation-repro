import type { ValuesOf } from "../utilities/index.js";
import type { StartEndOptions } from "../patterns/start-end.js";
import type { FASTToolbar } from "./toolbar.js";
/**
 * Toolbar configuration options
 * @public
 */
export type ToolbarOptions = StartEndOptions<FASTToolbar>;
/**
 * The orientation of the {@link @microsoft/fast-foundation#(FASTToolbar:class)} component
 * @public
 */
export declare const ToolbarOrientation: {
    readonly horizontal: "horizontal";
    readonly vertical: "vertical";
};
/**
 * The types for the Toolbar component
 * @public
 */
export type ToolbarOrientation = ValuesOf<typeof ToolbarOrientation>;
