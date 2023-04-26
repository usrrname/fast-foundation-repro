import { FASTElement } from "@microsoft/fast-element";
import type { StaticallyComposableHTML } from "../utilities/template-helpers.js";
import { StartEnd } from "../patterns/start-end.js";
import type { StartEndOptions } from "../patterns/start-end.js";
/**
 * check if the item is a tree item
 * @public
 * @remarks
 * determines if element is an HTMLElement and if it has the role treeitem
 */
export declare function isTreeItemElement(el: Element): el is HTMLElement;
/**
 * Tree Item configuration options
 * @public
 */
export type TreeItemOptions = StartEndOptions<FASTTreeItem> & {
    expandCollapseGlyph?: StaticallyComposableHTML<FASTTreeItem>;
};
/**
 * A Tree item Custom HTML Element.
 *
 * @slot start - Content which can be provided before the tree item content
 * @slot end - Content which can be provided after the tree item content
 * @slot - The default slot for tree item text content
 * @slot item - The slot for tree items (fast tree items manage this assignment themselves)
 * @slot expand-collapse-button - The expand/collapse button
 * @csspart positioning-region - The element used to position the tree item content with exception of any child nodes
 * @csspart content-region - The element containing the expand/collapse, start, and end slots
 * @csspart items - The element wrapping any child items
 * @csspart expand-collapse-button - The expand/collapse button
 * @fires expanded-change - Fires a custom 'expanded-change' event when the expanded state changes
 * @fires selected-change - Fires a custom 'selected-change' event when the selected state changes
 *
 * @public
 */
export declare class FASTTreeItem extends FASTElement {
    /**
     * When true, the control will be appear expanded by user interaction.
     * @public
     * @remarks
     * HTML Attribute: expanded
     */
    expanded: boolean;
    protected expandedChanged(prev: boolean | undefined, next: boolean): void;
    /**
     * When true, the control will appear selected by user interaction.
     * @public
     * @remarks
     * HTML Attribute: selected
     */
    selected: boolean;
    protected selectedChanged(prev: boolean | undefined, next: boolean): void;
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    disabled: boolean;
    /**
     *  Reference to the expand/collapse button
     *
     * @internal
     */
    expandCollapseButton: HTMLDivElement;
    /**
     *  Readonly property identifying the element as a tree item
     *
     * @internal
     */
    readonly isTreeItem: boolean;
    /**
     * Whether the item is focusable
     *
     * @internal
     */
    focusable: boolean;
    /**
     *
     *
     * @internal
     */
    childItems: HTMLElement[];
    /**
     * The slotted child tree items
     *
     * @internal
     */
    items: HTMLElement[];
    protected itemsChanged(oldValue: unknown, newValue: HTMLElement[]): void;
    /**
     * Indicates if the tree item is nested
     *
     * @public
     * @deprecated - will be removed in coming ALPHA version
     * HTML Attribute: nested
     */
    nested: boolean;
    /**
     * Places document focus on a tree item
     *
     * @public
     * @param el - the element to focus
     */
    static focusItem(el: HTMLElement): void;
    /**
     * Whether the tree is nested
     *
     * @public
     */
    readonly isNestedItem: () => boolean;
    /**
     * Handle expand button click
     *
     * @internal
     */
    handleExpandCollapseButtonClick: (e: MouseEvent) => void;
    /**
     * Handle focus events
     *
     * @internal
     */
    handleFocus: (e: FocusEvent) => void;
    /**
     * Handle blur events
     *
     * @internal
     */
    handleBlur: (e: FocusEvent) => void;
    /**
     * Gets number of children
     *
     * @internal
     */
    get childItemLength(): number;
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast-dna/issues/3317
 * @internal
 */
export interface FASTTreeItem extends StartEnd {
}
