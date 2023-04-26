import { FASTElement } from "@microsoft/fast-element";
/**
 * A Menu Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#menu | ARIA menu }.
 *
 * @slot - The default slot for the menu items
 *
 * @public
 */
export declare class FASTMenu extends FASTElement {
    /**
     * @internal
     */
    items: HTMLElement[];
    protected itemsChanged(oldValue: HTMLElement[], newValue: HTMLElement[]): void;
    protected menuItems: Element[] | undefined;
    private expandedItem;
    /**
     * The index of the focusable element in the items array
     * defaults to -1
     */
    private focusIndex;
    private static focusableElementRoles;
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
    readonly isNestedMenu: () => boolean;
    /**
     * Focuses the first item in the menu.
     *
     * @public
     */
    focus(): void;
    /**
     * Collapses any expanded menu items.
     *
     * @public
     */
    collapseExpandedItem(): void;
    /**
     * @internal
     */
    handleMenuKeyDown(e: KeyboardEvent): void | boolean;
    /**
     * if focus is moving out of the menu, reset to a stable initial state
     * @internal
     */
    handleFocusOut: (e: FocusEvent) => void;
    private handleItemFocus;
    private handleExpandedChanged;
    private removeItemListeners;
    protected setItems(): void;
    handleChange(source: any, propertyName: string): void;
    /**
     * handle change from child element
     */
    private changeHandler;
    /**
     * check if the item is a menu item
     */
    protected isMenuItemElement: (el: Element) => el is HTMLElement;
    /**
     * check if the item is focusable
     */
    private isFocusableElement;
    private setFocus;
}
