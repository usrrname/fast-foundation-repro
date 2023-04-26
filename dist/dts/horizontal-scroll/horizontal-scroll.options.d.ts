import type { StaticallyComposableHTML, ValuesOf } from "../utilities/index.js";
import type { StartEndOptions } from "../patterns/index.js";
import type { FASTHorizontalScroll } from "./horizontal-scroll.js";
/**
 * View options for the {@link @microsoft/fast-foundation#(FASTHorizontalScroll:class)|FASTHorizontalScroll} component.
 * @public
 */
export declare const HorizontalScrollView: {
    readonly default: "default";
    readonly mobile: "mobile";
};
/**
 * View option types for the {@link @microsoft/fast-foundation#(FASTHorizontalScroll:class)|FASTHorizontalScroll} component.
 * @public
 */
export type HorizontalScrollView = ValuesOf<typeof HorizontalScrollView>;
/**
 * Easing values for the {@link @microsoft/fast-foundation#(FASTHorizontalScroll:class)|FASTHorizontalScroll} component.
 * @public
 */
export declare const ScrollEasing: {
    readonly linear: "linear";
    readonly easeIn: "ease-in";
    readonly easeOut: "ease-out";
    readonly easeInOut: "ease-in-out";
};
/**
 * Easing types for the {@link @microsoft/fast-foundation#(FASTHorizontalScroll:class)|FASTHorizontalScroll} component.
 * @public
 */
export type ScrollEasing = ValuesOf<typeof ScrollEasing>;
/**
 * Horizontal scroll configuration options
 * @public
 */
export type HorizontalScrollOptions = StartEndOptions<FASTHorizontalScroll> & {
    nextFlipper?: StaticallyComposableHTML<FASTHorizontalScroll>;
    previousFlipper?: StaticallyComposableHTML<FASTHorizontalScroll>;
};
