import type { Direction } from "@microsoft/fast-web-utilities";
import type { StaticallyComposableHTML, ValuesOf } from "../utilities/index.js";
import type { FASTSlider } from "./slider.js";
/**
 * The orientation of a {@link @microsoft/fast-foundation#(FASTSlider:class)}.
 * @public
 */
export declare const SliderOrientation: {
    readonly horizontal: "horizontal";
    readonly vertical: "vertical";
};
/**
 * The types for the orientation of the slider
 * @public
 */
export type SliderOrientation = ValuesOf<typeof SliderOrientation>;
/**
 * The selection modes of a {@link @microsoft/fast-foundation#(FASTSlider:class)}.
 * @public
 */
export declare const SliderMode: {
    readonly singleValue: "single-value";
};
/**
 * The types for the selection mode of the slider
 * @public
 */
export type SliderMode = ValuesOf<typeof SliderMode>;
/**
 * The configuration structure of {@link @microsoft/fast-foundation#(FASTSlider:class)}.
 * @public
 */
export interface SliderConfiguration {
    max: number;
    min: number;
    orientation?: SliderOrientation;
    direction?: Direction;
    disabled?: boolean;
}
/**
 * Slider configuration options
 * @public
 */
export type SliderOptions = {
    thumb?: StaticallyComposableHTML<FASTSlider>;
};
