import type { StaticallyComposableHTML } from "../utilities/template-helpers.js";
import type { FASTListboxOption } from "../listbox-option/listbox-option.js";
import { DelegatesARIAListbox } from "../listbox/listbox.js";
import { StartEnd } from "../patterns/start-end.js";
import type { StartEndOptions } from "../patterns/start-end.js";
import { FormAssociatedSelect } from "./select.form-associated.js";
/**
 * Select configuration options
 * @public
 */
export type SelectOptions = StartEndOptions<FASTSelect> & {
    indicator?: StaticallyComposableHTML<FASTSelect>;
};
/**
 * A Select Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#select | ARIA select }.
 *
 * @slot start - Content which can be provided before the button content
 * @slot end - Content which can be provided after the button content
 * @slot button-container - The element representing the select button
 * @slot selected-value - The selected value
 * @slot indicator - The visual indicator for the expand/collapse state of the button
 * @slot - The default slot for slotted options
 * @csspart control - The element representing the select invoking element
 * @csspart selected-value - The element wrapping the selected value
 * @csspart indicator - The element wrapping the visual indicator
 * @csspart listbox - The listbox element
 * @fires input - Fires a custom 'input' event when the value updates
 * @fires change - Fires a custom 'change' event when the value updates
 *
 * @public
 */
export declare class FASTSelect extends FormAssociatedSelect {
    /**
     * The open attribute.
     *
     * @public
     * @remarks
     * HTML Attribute: open
     */
    open: boolean;
    /**
     * Sets focus and synchronizes ARIA attributes when the open property changes.
     *
     * @param prev - the previous open value
     * @param next - the current open value
     *
     * @internal
     */
    protected openChanged(prev: boolean | undefined, next: boolean): void;
    /**
     * The selectedIndex when the open property is true.
     *
     * @internal
     */
    private indexWhenOpened;
    /**
     * The internal value property.
     *
     * @internal
     */
    private _value;
    /**
     * The component is collapsible when in single-selection mode with no size attribute.
     *
     * @internal
     */
    get collapsible(): boolean;
    /**
     * The ref to the internal `.control` element.
     *
     * @internal
     */
    control: HTMLElement;
    /**
     * The value property.
     *
     * @public
     */
    get value(): string;
    set value(next: string);
    /**
     * Sets the value and display value to match the first selected option.
     *
     * @param shouldEmit - if true, the input and change events will be emitted
     *
     * @internal
     */
    private updateValue;
    /**
     * Updates the proxy value when the selected index changes.
     *
     * @param prev - the previous selected index
     * @param next - the next selected index
     *
     * @internal
     */
    selectedIndexChanged(prev: number | undefined, next: number): void;
    /**
     * Reference to the internal listbox element.
     *
     * @internal
     */
    listbox: HTMLDivElement;
    /**
     * The unique id for the internal listbox element.
     *
     * @internal
     */
    listboxId: string;
    /**
     * Cleanup function for the listbox positioner.
     *
     * @public
     */
    cleanup: () => void;
    /**
     * Calculate and apply listbox positioning based on available viewport space.
     *
     * @public
     */
    setPositioning(): void;
    /**
     * The value displayed on the button.
     *
     * @public
     */
    get displayValue(): string;
    /**
     * Synchronize the `aria-disabled` property when the `disabled` property changes.
     *
     * @param prev - The previous disabled value
     * @param next - The next disabled value
     *
     * @internal
     */
    disabledChanged(prev: boolean, next: boolean): void;
    /**
     * Reset the element to its first selectable option when its parent form is reset.
     *
     * @internal
     */
    formResetCallback(): void;
    /**
     * Handle opening and closing the listbox when the select is clicked.
     *
     * @param e - the mouse event
     * @internal
     */
    clickHandler(e: MouseEvent): boolean | void;
    /**
     * Handles focus state when the element or its children lose focus.
     *
     * @param e - The focus event
     * @internal
     */
    focusoutHandler(e: FocusEvent): boolean | void;
    /**
     * Updates the value when an option's value changes.
     *
     * @param source - the source object
     * @param propertyName - the property to evaluate
     *
     * @internal
     * @override
     */
    handleChange(source: any, propertyName: string): void;
    /**
     * Synchronize the form-associated proxy and updates the value property of the element.
     *
     * @param prev - the previous collection of slotted option elements
     * @param next - the next collection of slotted option elements
     *
     * @internal
     */
    slottedOptionsChanged(prev: Element[] | undefined, next: Element[]): void;
    /**
     * Prevents focus when size is set and a scrollbar is clicked.
     *
     * @param e - the mouse event object
     *
     * @override
     * @internal
     */
    mousedownHandler(e: MouseEvent): boolean | void;
    /**
     * Sets the multiple property on the proxy element.
     *
     * @param prev - the previous multiple value
     * @param next - the current multiple value
     */
    multipleChanged(prev: boolean | undefined, next: boolean): void;
    /**
     * Updates the selectedness of each option when the list of selected options changes.
     *
     * @param prev - the previous list of selected options
     * @param next - the current list of selected options
     *
     * @override
     * @internal
     */
    protected selectedOptionsChanged(prev: FASTListboxOption[] | undefined, next: FASTListboxOption[]): void;
    /**
     * Sets the selected index to match the first option with the selected attribute, or
     * the first selectable option.
     *
     * @override
     * @internal
     */
    protected setDefaultSelectedOption(): void;
    /**
     * Resets and fills the proxy to match the component's options.
     *
     * @internal
     */
    private setProxyOptions;
    /**
     * Handle keyboard interaction for the select.
     *
     * @param e - the keyboard event
     * @internal
     */
    keydownHandler(e: KeyboardEvent): boolean | void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Updates the proxy's size property when the size attribute changes.
     *
     * @param prev - the previous size
     * @param next - the current size
     *
     * @override
     * @internal
     */
    protected sizeChanged(prev: number | undefined, next: number): void;
    /**
     *
     * @internal
     */
    private updateDisplayValue;
}
/**
 * Includes ARIA states and properties relating to the ARIA select role.
 *
 * @public
 */
export declare class DelegatesARIASelect {
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#combobox} for more information
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
export interface DelegatesARIASelect extends DelegatesARIAListbox {
}
/**
 * @internal
 */
export interface FASTSelect extends StartEnd, DelegatesARIASelect {
}
