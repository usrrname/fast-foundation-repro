import type { StaticallyComposableHTML } from "../utilities/template-helpers.js";
import { FormAssociatedRadio } from "./radio.form-associated.js";
/**
 * A structure representing a {@link @microsoft/fast-foundation#(FASTRadio:class)} element
 * @public
 */
export type RadioControl = Pick<HTMLInputElement, "checked" | "disabled" | "readOnly" | "focus" | "setAttribute" | "getAttribute">;
/**
 * Radio configuration options
 * @public
 */
export type RadioOptions = {
    checkedIndicator?: StaticallyComposableHTML<FASTRadio>;
};
/**
 * A Radio Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#radio | ARIA radio }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot - The default slot for the label
 * @csspart control - The element representing the visual radio control
 * @csspart label - The label
 * @fires change - Emits a custom change event when the checked state changes
 *
 * @public
 */
export declare class FASTRadio extends FormAssociatedRadio implements RadioControl {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    protected readOnlyChanged(): void;
    /**
     * The name of the radio. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefname | name attribute} for more info.
     */
    name: string;
    /**
     * The element's value to be included in form submission when checked.
     * Default to "on" to reach parity with input[type="radio"]
     *
     * @internal
     */
    initialValue: string;
    /**
     * @internal
     */
    defaultSlottedNodes: Node[];
    /**
     * @internal
     */
    defaultCheckedChanged(): void;
    constructor();
    /**
     * @internal
     */
    connectedCallback(): void;
    private isInsideRadioGroup;
    /**
     * Handles key presses on the radio.
     * @beta
     */
    keypressHandler(e: KeyboardEvent): boolean | void;
}
