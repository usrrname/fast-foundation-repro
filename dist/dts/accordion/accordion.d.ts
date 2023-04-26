import { FASTElement } from "@microsoft/fast-element";
import { AccordionExpandMode } from "./accordion.options.js";
/**
 * An Accordion Custom HTML Element
 * Implements {@link https://www.w3.org/TR/wai-aria-practices-1.1/#accordion | ARIA Accordion}.
 *
 * @fires change - Fires a custom 'change' event when the active item changes
 * @csspart item - The slot for the accordion items
 * @public
 *
 * @remarks
 * Designed to be used with {@link @microsoft/fast-foundation#accordionTemplate} and {@link @microsoft/fast-foundation#(FASTAccordionItem:class)}.
 */
export declare class FASTAccordion extends FASTElement {
    /**
     * Controls the expand mode of the Accordion, either allowing
     * single or multiple item expansion.
     * @public
     *
     * @remarks
     * HTML attribute: expand-mode
     */
    expandmode: AccordionExpandMode;
    expandmodeChanged(prev: AccordionExpandMode, next: AccordionExpandMode): void;
    /**
     * @internal
     */
    slottedAccordionItems: HTMLElement[];
    protected accordionItems: Element[];
    /**
     * @internal
     */
    slottedAccordionItemsChanged(oldValue: HTMLElement[], newValue: HTMLElement[]): void;
    /**
     * @internal
     */
    handleChange(source: any, propertyName: string): void;
    private activeid;
    private activeItemIndex;
    private accordionIds;
    private change;
    private findExpandedItem;
    private setItems;
    private setSingleExpandMode;
    private removeItemListeners;
    private activeItemChange;
    private handleExpandedChange;
    private getItemIds;
    private isSingleExpandMode;
    private handleItemKeyDown;
    private handleItemFocus;
    private adjust;
    private focusItem;
}
