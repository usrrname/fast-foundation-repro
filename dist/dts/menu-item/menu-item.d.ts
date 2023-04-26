import { FASTElement } from "@microsoft/fast-element";
import type { StaticallyComposableHTML } from "../utilities/template-helpers.js";
import type { StartEndOptions } from "../patterns/start-end.js";
import { StartEnd } from "../patterns/start-end.js";
import { MenuItemRole, roleForMenuItem } from "./menu-item.options.js";
export { MenuItemRole, roleForMenuItem };
/**
 * Menu Item configuration options
 * @public
 */
export type MenuItemOptions = StartEndOptions<FASTMenuItem> & {
    checkboxIndicator?: StaticallyComposableHTML<FASTMenuItem>;
    expandCollapseGlyph?: StaticallyComposableHTML<FASTMenuItem>;
    radioIndicator?: StaticallyComposableHTML<FASTMenuItem>;
};
/**
 * A Switch Custom HTML Element.
 * Implements {@link https://www.w3.org/TR/wai-aria-1.1/#menuitem | ARIA menuitem }, {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemcheckbox | ARIA menuitemcheckbox}, or {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemradio | ARIA menuitemradio }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot radio-indicator - The radio indicator
 * @slot start - Content which can be provided before the menu item content
 * @slot end - Content which can be provided after the menu item content
 * @slot - The default slot for menu item content
 * @slot expand-collapse-indicator - The expand/collapse indicator
 * @slot submenu - Used to nest menu's within menu items
 * @csspart input-container - The element representing the visual checked or radio indicator
 * @csspart checkbox - The element wrapping the `menuitemcheckbox` indicator
 * @csspart radio - The element wrapping the `menuitemradio` indicator
 * @csspart content - The element wrapping the menu item content
 * @csspart expand-collapse-glyph-container - The element wrapping the expand collapse element
 * @csspart expand-collapse - The expand/collapse element
 * @csspart submenu-region - The container for the submenu, used for positioning
 * @fires expanded-change - Fires a custom 'expanded-change' event when the expanded state changes
 * @fires change - Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked
 *
 * @public
 */
export declare class FASTMenuItem extends FASTElement {
    /**
     * The disabled state of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    disabled: boolean;
    /**
     * The expanded state of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: expanded
     */
    expanded: boolean;
    protected expandedChanged(prev: boolean | undefined, next: boolean): void;
    /**
     * The role of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: role
     */
    role: MenuItemRole;
    /**
     * Cleanup function for the submenu positioner.
     *
     * @public
     */
    cleanup: () => void;
    /**
     * The checked value of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: checked
     */
    checked: boolean;
    protected checkedChanged(oldValue: boolean, newValue: boolean): void;
    /**
     * The hidden attribute.
     *
     * @public
     * @remarks
     * HTML Attribute: hidden
     */
    hidden: boolean;
    /**
     * The submenu slotted content.
     *
     * @internal
     */
    slottedSubmenu: HTMLElement[];
    /**
     * @internal
     */
    get hasSubmenu(): boolean;
    /**
     * Sets the submenu and updates its position.
     *
     * @internal
     */
    protected slottedSubmenuChanged(prev: HTMLElement[] | undefined, next: HTMLElement[]): void;
    /**
     * The container for the submenu.
     *
     * @internal
     */
    submenuContainer: HTMLDivElement;
    /**
     * @internal
     */
    submenu: HTMLElement | undefined;
    private focusSubmenuOnLoad;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * @internal
     */
    handleMenuItemKeyDown: (e: KeyboardEvent) => boolean;
    /**
     * @internal
     */
    handleMenuItemClick: (e: MouseEvent) => boolean;
    /**
     * @internal
     */
    submenuLoaded: () => void;
    /**
     * @internal
     */
    handleMouseOver: (e: MouseEvent) => boolean;
    /**
     * @internal
     */
    handleMouseOut: (e: MouseEvent) => boolean;
    /**
     * @internal
     */
    private closeSubMenu;
    /**
     * @internal
     */
    private expandAndFocus;
    /**
     * @internal
     */
    private invoke;
    /**
     * Calculate and apply submenu positioning.
     *
     * @public
     */
    updateSubmenu(): void;
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface FASTMenuItem extends StartEnd {
}
