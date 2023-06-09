import type { StaticallyComposableHTML } from "../utilities/template-helpers.js";
import { StartEnd } from "../patterns/start-end.js";
import type { StartEndOptions } from "../patterns/start-end.js";
import { DelegatesARIATextbox } from "../text-field/text-field.js";
import { FormAssociatedNumberField } from "./number-field.form-associated.js";
/**
 * Number Field configuration options
 * @public
 */
export type NumberFieldOptions = StartEndOptions<FASTNumberField> & {
    stepDownGlyph?: StaticallyComposableHTML<FASTNumberField>;
    stepUpGlyph?: StaticallyComposableHTML<FASTNumberField>;
};
/**
 * A Number Field Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number | <input type="number" /> element }.
 *
 * @slot start - Content which can be provided before the number field input
 * @slot end - Content which can be provided after the number field input
 * @slot - The default slot for the label
 * @slot step-up-glyph - The glyph for the step up control
 * @slot step-down-glyph - The glyph for the step down control
 * @csspart label - The label
 * @csspart root - The element wrapping the control, including start and end slots
 * @csspart control - The element representing the input
 * @csspart controls - The step up and step down controls
 * @csspart step-up - The step up control
 * @csspart step-down - The step down control
 * @fires input - Fires a custom 'input' event when the value has changed
 * @fires change - Fires a custom 'change' event when the value has changed
 *
 * @public
 */
export declare class FASTNumberField extends FormAssociatedNumberField {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    /**
     * Indicates that this element should get focus after the page finishes loading. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautofocus | autofocus HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: autofocus
     */
    autofocus: boolean;
    /**
     * When true, spin buttons will not be rendered
     * @public
     * @remarks
     * HTML Attribute: autofocus
     */
    hideStep: boolean;
    /**
     * Sets the placeholder value of the element, generally used to provide a hint to the user.
     * @public
     * @remarks
     * HTML Attribute: placeholder
     * Using this attribute does is not a valid substitute for a labeling element.
     */
    placeholder: string;
    /**
     * Allows associating a {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist | datalist} to the element by {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id}.
     * @public
     * @remarks
     * HTML Attribute: list
     */
    list: string;
    /**
     * The maximum number of characters a user can enter.
     * @public
     * @remarks
     * HTMLAttribute: maxlength
     */
    maxlength: number;
    /**
     * The minimum number of characters a user can enter.
     * @public
     * @remarks
     * HTMLAttribute: minlength
     */
    minlength: number;
    /**
     * Sets the width of the element to a specified number of characters.
     * @public
     * @remarks
     * HTMLAttribute: size
     */
    size: number;
    /**
     * Amount to increment or decrement the value by
     * @public
     * @remarks
     * HTMLAttribute: step
     */
    step: number;
    /**
     * The maximum the value can be
     * @public
     * @remarks
     * HTMLAttribute: max
     */
    max: number;
    /**
     * Ensures that the max is greater than the min and that the value
     *  is less than the max
     * @param previous - the previous max value
     * @param next - updated max value
     *
     * @internal
     */
    maxChanged(previous: number, next: number): void;
    /**
     * The minimum the value can be
     * @public
     * @remarks
     * HTMLAttribute: min
     */
    min: number;
    /**
     * Ensures that the min is less than the max and that the value
     *  is greater than the min
     * @param previous - previous min value
     * @param next - updated min value
     *
     * @internal
     */
    minChanged(previous: number, next: number): void;
    /**
     * The default slotted items
     * @internal
     */
    defaultSlottedNodes: Node[];
    /**
     * A reference to the internal input element
     * @internal
     */
    control: HTMLInputElement;
    /**
     * Flag to indicate that the value change is from the user input
     * @internal
     */
    private isUserInput;
    /**
     * The value property, typed as a number.
     *
     * @public
     */
    get valueAsNumber(): number;
    set valueAsNumber(next: number);
    /**
     * Validates that the value is a number between the min and max
     * @param previous - previous stored value
     * @param next - value being updated
     * @param updateControl - should the text field be updated with value, defaults to true
     * @internal
     */
    valueChanged(previous: string, next: string): void;
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate(): void;
    /**
     * Sets the internal value to a valid number between the min and max properties
     * @param value - user input
     *
     * @internal
     */
    private getValidValue;
    /**
     * Increments the value using the step value
     *
     * @public
     */
    stepUp(): void;
    /**
     * Decrements the value using the step value
     *
     * @public
     */
    stepDown(): void;
    /**
     * Sets up the initial state of the number field
     * @internal
     */
    connectedCallback(): void;
    /**
     * Selects all the text in the number field
     *
     * @public
     */
    select(): void;
    /**
     * Handles the internal control's `input` event
     * @internal
     */
    handleTextInput(): void;
    /**
     * Change event handler for inner control.
     * @remarks
     * "Change" events are not `composable` so they will not
     * permeate the shadow DOM boundary. This fn effectively proxies
     * the change event, emitting a `change` event whenever the internal
     * control emits a `change` event
     * @internal
     */
    handleChange(): void;
    /**
     * Handles the internal control's `keydown` event
     * @internal
     */
    handleKeyDown(e: KeyboardEvent): boolean;
    /**
     * Handles populating the input field with a validated value when
     *  leaving the input field.
     * @internal
     */
    handleBlur(): void;
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface FASTNumberField extends StartEnd, DelegatesARIATextbox {
}
