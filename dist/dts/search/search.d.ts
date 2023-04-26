import { ARIAGlobalStatesAndProperties, StartEnd } from "../patterns/index.js";
import type { StartEndOptions } from "../patterns/start-end.js";
import { FormAssociatedSearch } from "./search.form-associated.js";
/**
 * Search configuration options
 * @public
 */
export type SearchOptions = StartEndOptions<FASTSearch>;
/**
 * A Search Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search | <input type="search" /> element }.
 *
 * @slot start - Content which can be provided before the search input
 * @slot end - Content which can be provided after the search clear button
 * @slot - The default slot for the label
 * @slot clear-button - The clear button
 * @slot clear-glyph - The clear glyph
 * @csspart label - The label
 * @csspart root - The element wrapping the control, including start and end slots
 * @csspart control - The element representing the input
 * @csspart clear-button - The button to clear the input
 *
 * @public
 */
export declare class FASTSearch extends FormAssociatedSearch {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    readOnly: boolean;
    protected readOnlyChanged(): void;
    /**
     * Indicates that this element should get focus after the page finishes loading. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautofocus | autofocus HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: autofocus
     */
    autofocus: boolean;
    protected autofocusChanged(): void;
    /**
     * Sets the placeholder value of the element, generally used to provide a hint to the user.
     * @public
     * @remarks
     * HTML Attribute: placeholder
     * Using this attribute does is not a valid substitute for a labeling element.
     */
    placeholder: string;
    protected placeholderChanged(): void;
    /**
     * Allows associating a {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist | datalist} to the element by {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/id}.
     * @public
     * @remarks
     * HTML Attribute: list
     */
    list: string;
    protected listChanged(): void;
    /**
     * The maximum number of characters a user can enter.
     * @public
     * @remarks
     * HTMLAttribute: maxlength
     */
    maxlength: number;
    protected maxlengthChanged(): void;
    /**
     * The minimum number of characters a user can enter.
     * @public
     * @remarks
     * HTMLAttribute: minlength
     */
    minlength: number;
    protected minlengthChanged(): void;
    /**
     * A regular expression that the value must match to pass validation.
     * @public
     * @remarks
     * HTMLAttribute: pattern
     */
    pattern: string;
    protected patternChanged(): void;
    /**
     * Sets the width of the element to a specified number of characters.
     * @public
     * @remarks
     * HTMLAttribute: size
     */
    size: number;
    protected sizeChanged(): void;
    /**
     * Controls whether or not to enable spell checking for the input field, or if the default spell checking configuration should be used.
     * @public
     * @remarks
     * HTMLAttribute: size
     */
    spellcheck: boolean;
    protected spellcheckChanged(): void;
    /**
     * @internal
     */
    defaultSlottedNodes: Node[];
    /**
     * A reference to the internal close button element
     * @internal
     */
    root: HTMLDivElement;
    /**
     * A reference to the internal input element
     * @internal
     */
    control: HTMLInputElement;
    /**
     * @internal
     */
    connectedCallback(): void;
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate(): void;
    /**
     * Handles the internal control's `input` event
     * @internal
     */
    handleTextInput(): void;
    /**
     * Handles the control's clear value event
     * @public
     */
    handleClearInput(): void;
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
}
/**
 * Includes ARIA states and properties relating to the ARIA textbox role
 *
 * @public
 */
export declare class DelegatesARIASearch {
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface DelegatesARIASearch extends ARIAGlobalStatesAndProperties {
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface FASTSearch extends StartEnd, DelegatesARIASearch {
}
