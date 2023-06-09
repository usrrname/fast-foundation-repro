import type { StaticallyComposableHTML } from "../utilities/template-helpers.js";
import { FormAssociatedSwitch } from "./switch.form-associated.js";
/**
 * Switch configuration options
 * @public
 */
export type SwitchOptions = {
    switch?: StaticallyComposableHTML<FASTSwitch>;
};
/**
 * A Switch Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#switch | ARIA switch }.
 *
 * @slot - The deafult slot for the label
 * @slot checked-message - The message when in a checked state
 * @slot unchecked-message - The message when in an unchecked state
 * @csspart label - The label
 * @csspart switch - The element representing the switch, which wraps the indicator
 * @csspart status-message - The wrapper for the status messages
 * @csspart checked-message - The checked message
 * @csspart unchecked-message - The unchecked message
 * @fires change - Emits a custom change event when the checked state changes
 *
 * @public
 */
export declare class FASTSwitch extends FormAssociatedSwitch {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    protected readOnlyChanged(): void;
    /**
     * The element's value to be included in form submission when checked.
     * Default to "on" to reach parity with input[type="checkbox"]
     *
     * @internal
     */
    initialValue: string;
    /**
     * @internal
     */
    defaultSlottedNodes: Node[];
    constructor();
    /**
     * @internal
     */
    keypressHandler: (e: KeyboardEvent) => void;
    /**
     * @internal
     */
    clickHandler: (e: MouseEvent) => void;
}
