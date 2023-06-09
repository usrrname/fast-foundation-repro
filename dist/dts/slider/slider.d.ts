import { Direction, Orientation } from "@microsoft/fast-web-utilities";
import { FormAssociatedSlider } from "./slider.form-associated.js";
import { SliderConfiguration, SliderMode } from "./slider.options.js";
/**
 * A Slider Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#slider | ARIA slider }.
 *
 * @slot track - The track of the slider
 * @slot track-start - The track-start visual indicator
 * @slot thumb - The slider thumb
 * @slot - The default slot for labels
 * @csspart positioning-region - The region used to position the elements of the slider
 * @csspart track-container - The region containing the track elements
 * @csspart track-start - The element wrapping the track start slot
 * @csspart thumb-container - The thumb container element which is programatically positioned
 * @fires change - Fires a custom 'change' event when the slider value changes
 *
 * @public
 */
export declare class FASTSlider extends FormAssociatedSlider implements SliderConfiguration {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     *
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    protected readOnlyChanged(): void;
    /**
     * @internal
     */
    track: HTMLDivElement;
    /**
     * @internal
     */
    thumb: HTMLDivElement;
    /**
     * @internal
     */
    stepMultiplier: number;
    /**
     * @internal
     */
    direction: Direction;
    /**
     * @internal
     */
    isDragging: boolean;
    /**
     * @internal
     */
    position: string;
    /**
     * @internal
     */
    trackWidth: number;
    /**
     * @internal
     */
    trackMinWidth: number;
    /**
     * @internal
     */
    trackHeight: number;
    /**
     * @internal
     */
    trackLeft: number;
    /**
     * @internal
     */
    trackMinHeight: number;
    /**
     * The value property, typed as a number.
     *
     * @public
     */
    get valueAsNumber(): number;
    set valueAsNumber(next: number);
    /**
     * Custom function that generates a string for the component's "aria-valuetext" attribute based on the current value.
     *
     * @public
     */
    valueTextFormatter: (value: string) => string | null;
    /**
     * @internal
     */
    valueChanged(previous: string, next: string): void;
    /**
     * The minimum allowed value.
     *
     * @defaultValue - 0
     * @public
     * @remarks
     * HTML Attribute: min
     */
    min: number;
    private minChanged;
    /**
     * The maximum allowed value.
     *
     * @defaultValue - 10
     * @public
     * @remarks
     * HTML Attribute: max
     */
    max: number;
    private maxChanged;
    /**
     * Value to increment or decrement via arrow keys, mouse click or drag.
     *
     * @public
     * @remarks
     * HTML Attribute: step
     */
    step: number;
    private stepChanged;
    /**
     * The orientation of the slider.
     *
     * @public
     * @remarks
     * HTML Attribute: orientation
     */
    orientation: Orientation;
    private orientationChanged;
    /**
     * The selection mode.
     *
     * @public
     * @remarks
     * HTML Attribute: mode
     */
    mode: SliderMode;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * Increment the value by the step
     *
     * @public
     */
    increment(): void;
    /**
     * Decrement the value by the step
     *
     * @public
     */
    decrement(): void;
    protected keypressHandler: (e: KeyboardEvent) => void;
    /**
     * Places the thumb based on the current value
     *
     * @public
     * @param direction - writing mode
     */
    private setThumbPositionForOrientation;
    /**
     * Update the step multiplier used to ensure rounding errors from steps that
     * are not whole numbers
     */
    private updateStepMultiplier;
    private setupTrackConstraints;
    private setupListeners;
    /**
     * @internal
     */
    initialValue: string;
    private get midpoint();
    private setupDefaultValue;
    /**
     *  Handle mouse moves during a thumb drag operation
     *  If the event handler is null it removes the events
     */
    private handleThumbMouseDown;
    /**
     *  Handle mouse moves during a thumb drag operation
     */
    private handleMouseMove;
    /**
     * Calculate the new value based on the given raw pixel value.
     *
     * @param rawValue - the value to be converted to a constrained value
     * @returns the constrained value
     *
     * @internal
     */
    calculateNewValue(rawValue: number): number;
    /**
     * Handle a window mouse up during a drag operation
     */
    private handleWindowMouseUp;
    private stopDragging;
    /**
     *
     * @param e - MouseEvent or null. If there is no event handler it will remove the events
     */
    private handleMouseDown;
    private convertToConstrainedValue;
}
