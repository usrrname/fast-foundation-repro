import { ARIAGlobalStatesAndProperties, StartEnd } from "../patterns/index.js";
import type { StartEndOptions } from "../patterns/start-end.js";
import { FormAssociatedButton } from "./button.form-associated.js";
import { ButtonType } from "./button.options.js";
/**
 * Button configuration options
 * @public
 */
export type ButtonOptions = StartEndOptions<FASTButton>;
/**
 * A Button Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element }.
 *
 * @slot start - Content which can be provided before the button content
 * @slot end - Content which can be provided after the button content
 * @slot - The default slot for button content
 * @csspart control - The button element
 * @csspart content - The element wrapping button content
 *
 * @public
 */
export declare class FASTButton extends FormAssociatedButton {
    /**
     * Determines if the element should receive document focus on page load.
     *
     * @public
     * @remarks
     * HTML Attribute: autofocus
     */
    autofocus: boolean;
    /**
     * The id of a form to associate the element to.
     *
     * @public
     * @remarks
     * HTML Attribute: form
     */
    formId: string;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formaction
     */
    formaction: string;
    protected formactionChanged(): void;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formenctype
     */
    formenctype: string;
    protected formenctypeChanged(): void;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formmethod
     */
    formmethod: string;
    protected formmethodChanged(): void;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formnovalidate
     */
    formnovalidate: boolean;
    protected formnovalidateChanged(): void;
    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formtarget
     */
    formtarget: "_self" | "_blank" | "_parent" | "_top";
    protected formtargetChanged(): void;
    /**
     * The button type.
     *
     * @public
     * @remarks
     * HTML Attribute: type
     */
    type: ButtonType;
    protected typeChanged(previous: ButtonType | undefined, next: ButtonType): void;
    /**
     *
     * Default slotted content
     *
     * @public
     * @remarks
     */
    defaultSlottedContent: HTMLElement[];
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate(): void;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * Submits the parent form
     */
    private handleSubmission;
    /**
     * Resets the parent form
     */
    private handleFormReset;
    control: HTMLButtonElement;
}
/**
 * Includes ARIA states and properties relating to the ARIA button role
 *
 * @public
 */
export declare class DelegatesARIAButton {
    /**
     * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
     * @public
     * @remarks
     * HTML Attribute: aria-expanded
     */
    ariaExpanded: "true" | "false" | string | null;
    /**
     * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
     * @public
     * @remarks
     * HTML Attribute: aria-pressed
     */
    ariaPressed: "true" | "false" | "mixed" | string | null;
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface DelegatesARIAButton extends ARIAGlobalStatesAndProperties {
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface FASTButton extends StartEnd, DelegatesARIAButton {
}
