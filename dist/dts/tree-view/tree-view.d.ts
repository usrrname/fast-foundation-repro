import { FASTElement } from "@microsoft/fast-element";
import { FASTTreeItem } from "../tree-item/tree-item.js";
/**
 * A Tree view Custom HTML Element.
 * Implements the {@link https://w3c.github.io/aria-practices/#TreeView | ARIA TreeView }.
 *
 * @slot - The default slot for tree items
 *
 * @public
 */
export declare class FASTTreeView extends FASTElement {
    /**
     * The currently selected tree item
     * @public
     */
    currentSelected: HTMLElement | FASTTreeItem | null;
    /**
     *  Slotted children
     *
     * @internal
     */
    slottedTreeItems: HTMLElement[];
    protected slottedTreeItemsChanged(): void;
    /**
     * The tree item that is designated to be in the tab queue.
     *
     * @internal
     */
    currentFocused: HTMLElement | FASTTreeItem | null;
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
     * ref to the tree item
     *
     * @internal
     */
    treeView: HTMLElement;
    private nested;
    connectedCallback(): void;
    /**
     * KeyDown handler
     *
     *  @internal
     */
    handleKeyDown: (e: KeyboardEvent) => boolean | void;
    /**
     * Handles click events bubbling up
     *
     *  @internal
     */
    handleClick(e: Event): boolean | void;
    /**
     * Handles the selected-changed events bubbling up
     * from child tree items
     *
     *  @internal
     */
    handleSelectedChange: (e: Event) => boolean | void;
    /**
     * Move focus to a tree item based on its offset from the provided item
     */
    private focusNextNode;
    /**
     * Updates the tree view when slottedTreeItems changes
     */
    private setItems;
    /**
     * checks if there are any nested tree items
     */
    private getValidFocusableItem;
    /**
     * checks if there are any nested tree items
     */
    private checkForNestedItems;
    /**
     * check if the item is focusable
     */
    private isFocusableElement;
    private isSelectedElement;
    private getVisibleNodes;
}
