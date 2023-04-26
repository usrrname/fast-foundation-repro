import type { StaticallyComposableHTML } from "../utilities/template-helpers.js";
import type { FASTListboxOption } from "../listbox-option/listbox-option.js";
import { DelegatesARIAListbox } from "../listbox/listbox.js";
import { StartEnd } from "../patterns/start-end.js";
import type { StartEndOptions } from "../patterns/start-end.js";
import { FormAssociatedCombobox } from "./combobox.form-associated.js";
import { ComboboxAutocomplete } from "./combobox.options.js";
/**
 * Combobox configuration options
 * @public
 */
export type ComboboxOptions = StartEndOptions<FASTCombobox> & {
    indicator?: StaticallyComposableHTML<FASTCombobox>;
};
/**
 * A Combobox Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria-practices/#combobox | ARIA combobox }.
 *
 * @slot start - Content which can be provided before the input
 * @slot end - Content which can be provided after the input
 * @slot control - Used to replace the input element representing the combobox
 * @slot indicator - The visual indicator representing the expanded state
 * @slot - The default slot for the options
 * @csspart control - The wrapper element containing the input area, including start and end
 * @csspart selected-value - The input element representing the selected value
 * @csspart indicator - The element wrapping the indicator slot
 * @csspart listbox - The wrapper for the listbox slotted options
 * @fires change - Fires a custom 'change' event when the value updates
 *
 * @public
 */
export declare class FASTCombobox extends FormAssociatedCombobox {
    /**
     * The internal value property.
     *
     * @internal
     */
    private _value;
    /**
     * The autocomplete attribute.
     *
     * @public
     * @remarks
     * HTML Attribute: autocomplete
     */
    autocomplete: ComboboxAutocomplete | undefined;
    /**
     * Reference to the internal text input element.
     *
     * @internal
     */
    control: HTMLInputElement;
    /**
     * Reference to the internal listbox element.
     *
     * @internal
     */
    listbox: HTMLDivElement;
    /**
     * The collection of currently filtered options.
     *
     * @public
     */
    filteredOptions: FASTListboxOption[];
    /**
     * The current filter value.
     *
     * @internal
     */
    private filter;
    /**
     * Reset the element to its first selectable option when its parent form is reset.
     *
     * @internal
     */
    formResetCallback(): void;
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate(): void;
    private get isAutocompleteInline();
    private get isAutocompleteList();
    private get isAutocompleteBoth();
    /**
     * The unique id for the internal listbox element.
     *
     * @internal
     */
    listboxId: string;
    /**
     * The open attribute.
     *
     * @public
     * @remarks
     * HTML Attribute: open
     */
    open: boolean;
    /**
     * Sets focus and synchronize ARIA attributes when the open property changes.
     *
     * @param prev - the previous open value
     * @param next - the current open value
     *
     * @internal
     */
    protected openChanged(): void;
    /**
     * The list of options.
     *
     * @public
     * @remarks
     * Overrides `Listbox.options`.
     */
    get options(): FASTListboxOption[];
    set options(value: FASTListboxOption[]);
    /**
     * Sets the placeholder value of the element, generally used to provide a hint to the user.
     * @public
     * @remarks
     * HTML Attribute: placeholder
     * Using this attribute is not a valid substitute for a labeling element.
     */
    placeholder: string;
    /**
     * Updates the placeholder on the proxy element.
     * @internal
     */
    protected placeholderChanged(): void;
    /**
     * The value property.
     *
     * @public
     */
    get value(): string;
    set value(next: string);
    /**
     * Cleanup function for the listbox positioner.
     *
     * @public
     */
    cleanup: () => void;
    /**
     * Handle opening and closing the listbox when the combobox is clicked.
     *
     * @param e - the mouse event
     * @internal
     */
    clickHandler(e: MouseEvent): boolean | void;
    connectedCallback(): void;
    /**
     * Synchronize the `aria-disabled` property when the `disabled` property changes.
     *
     * @param prev - The previous disabled value
     * @param next - The next disabled value
     *
     * @internal
     */
    disabledChanged(prev: boolean, next: boolean): void;
    disconnectedCallback(): void;
    /**
     * Filter available options by text value.
     *
     * @public
     */
    filterOptions(): void;
    /**
     * Focus the control and scroll the first selected option into view.
     *
     * @internal
     * @remarks
     * Overrides: `Listbox.focusAndScrollOptionIntoView`
     */
    protected focusAndScrollOptionIntoView(): void;
    /**
     * Handle focus state when the element or its children lose focus.
     *
     * @param e - The focus event
     * @internal
     */
    focusoutHandler(e: FocusEvent): boolean | void;
    /**
     * Handle content changes on the control input.
     *
     * @param e - the input event
     * @internal
     */
    inputHandler(e: InputEvent): boolean | void;
    /**
     * Handle keydown actions for listbox navigation.
     *
     * @param e - the keyboard event
     * @internal
     */
    keydownHandler(e: Event & KeyboardEvent): boolean | void;
    /**
     * Handle keyup actions for value input and text field manipulations.
     *
     * @param e - the keyboard event
     * @internal
     */
    keyupHandler(e: KeyboardEvent): boolean | void;
    /**
     * Ensure that the selectedIndex is within the current allowable filtered range.
     *
     * @param prev - the previous selected index value
     * @param next - the current selected index value
     *
     * @internal
     */
    selectedIndexChanged(prev: number | undefined, next: number): void;
    /**
     * Move focus to the previous selectable option.
     *
     * @internal
     * @remarks
     * Overrides `Listbox.selectPreviousOption`
     */
    selectPreviousOption(): void;
    /**
     * Set the default selected options at initialization or reset.
     *
     * @internal
     * @remarks
     * Overrides `Listbox.setDefaultSelectedOption`
     */
    setDefaultSelectedOption(): void;
    /**
     * Focus and select the content of the control based on the first selected option.
     *
     * @param start - The index for the starting range
     * @internal
     */
    private setInlineSelection;
    /**
     * Calculate and apply listbox positioning based on available viewport space.
     *
     * @public
     */
    setPositioning(): void;
    /**
     * Ensure that the entire list of options is used when setting the selected property.
     *
     * @param prev - the previous list of selected options
     * @param next - the current list of selected options
     *
     * @internal
     * @remarks
     * Overrides: `Listbox.selectedOptionsChanged`
     */
    selectedOptionsChanged(prev: FASTListboxOption[] | undefined, next: FASTListboxOption[]): void;
    /**
     * Synchronize the form-associated proxy and update the value property of the element.
     *
     * @param prev - the previous collection of slotted option elements
     * @param next - the next collection of slotted option elements
     *
     * @internal
     */
    slottedOptionsChanged(prev: Element[] | undefined, next: Element[]): void;
    /**
     * Sets the value and to match the first selected option.
     *
     * @param shouldEmit - if true, the change event will be emitted
     *
     * @internal
     */
    private updateValue;
    /**
     * @internal
     */
    private clearSelectionRange;
}
/**
 * Includes ARIA states and properties relating to the ARIA combobox role.
 *
 * @public
 */
export declare class DelegatesARIACombobox {
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#aria-autocomplete} for more information.
     *
     * @public
     * @remarks
     * HTML Attribute: `aria-autocomplete`
     */
    ariaAutoComplete: "inline" | "list" | "both" | "none" | string | null;
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#aria-controls} for more information.
     *
     * @public
     * @remarks
     * HTML Attribute: `aria-controls`
     */
    ariaControls: string | null;
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface DelegatesARIACombobox extends DelegatesARIAListbox {
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface FASTCombobox extends StartEnd, DelegatesARIACombobox {
}
