import { FASTElement } from "@microsoft/fast-element";
import { Direction } from "@microsoft/fast-web-utilities";
import { SliderOrientation } from "../slider/slider.options.js";
/**
 * A label element intended to be used with the {@link @microsoft/fast-foundation#(FASTSlider:class)} component.
 *
 * @slot - The default slot for the label content
 * @csspart root - The element wrapping the label mark and text
 *
 * @public
 */
export declare class FASTSliderLabel extends FASTElement {
    /**
     * @internal
     */
    positionStyle: string;
    /**
     * @internal
     */
    root: HTMLDivElement;
    /**
     * The position of the label relative to the min and max value of the parent {@link @microsoft/fast-foundation#(FASTSlider:class)}.
     *
     * @public
     * @remarks
     * HTML Attribute: position
     */
    position: string;
    protected positionChanged(): void;
    /**
     * Hides the tick mark.
     *
     * @public
     * @remarks
     * HTML Attribute: hide-mark
     */
    hideMark: boolean;
    /**
     * The disabled state of the label. This is generally controlled by the parent {@link @microsoft/fast-foundation#(FASTSlider:class)}.
     *
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    disabled: boolean;
    /**
     * The orientation state of the label. This is generally controlled by the parent {@link @microsoft/fast-foundation#(FASTSlider:class)}.
     *
     * @public
     * @deprecated - will be removed in coming ALPHA version
     * @remarks
     * HTML Attribute: orientation
     */
    orientation: SliderOrientation;
    /**
     * @internal
     */
    protected orientationChanged(): void;
    /**
     * @internal
     */
    sliderMinPosition: number;
    /**
     * @internal
     */
    sliderMaxPosition: number;
    /**
     * @internal
     */
    sliderDirection: Direction;
    private notifier;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * @internal
     */
    handleChange(source: any, propertyName: string): void;
    private isSliderConfig;
    private getSliderConfiguration;
    private positionAsStyle;
}
