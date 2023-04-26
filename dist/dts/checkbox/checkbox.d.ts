import type { StaticallyComposableHTML } from "../utilities/template-helpers.js";
import { FormAssociatedCheckbox } from "./checkbox.form-associated.js";
/**
 * Checkbox configuration options
 * @public
 */
export type CheckboxOptions = {
    checkedIndicator?: StaticallyComposableHTML<FASTCheckbox>;
    indeterminateIndicator?: StaticallyComposableHTML<FASTCheckbox>;
};
/**
 * A Checkbox Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#checkbox | ARIA checkbox }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot indeterminate-indicator - The indeterminate indicator
 * @slot - The default slot for the label
 * @csspart control - The element representing the visual checkbox control
 * @csspart label - The label
 * @fires change - Emits a custom change event when the checked state changes
 *
 * @public
 */
export declare class FASTCheckbox extends FormAssociatedCheckbox {
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
    /**
     * The indeterminate state of the control
     */
    indeterminate: boolean;
    constructor();
    private toggleChecked;
    /**
     * @internal
     */
    keypressHandler: (e: KeyboardEvent) => void;
    /**
     * @internal
     */
    clickHandler: (e: MouseEvent) => void;
}
