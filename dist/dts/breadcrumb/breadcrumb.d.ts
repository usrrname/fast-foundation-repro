import { FASTElement } from "@microsoft/fast-element";
/**
 * A Breadcrumb Custom HTML Element.
 * @slot - The default slot for the breadcrumb items
 * @csspart list - The element wrapping the slotted items
 *
 * @public
 */
export declare class FASTBreadcrumb extends FASTElement {
    /**
     * @internal
     */
    slottedBreadcrumbItems: HTMLElement[];
    protected slottedBreadcrumbItemsChanged(): void;
    private setItemSeparator;
    /**
     * Finds anchor childnodes in the light DOM or shadow DOM.
     * We look in the shadow DOM because we use an anchor inside the breadcrumb-item template.
     */
    private findChildAnchor;
    /**
     * Sets ARIA Current for the "current" node
     * `aria-current` is not optional and should be set regardless of the href value of a given anchor
     */
    private setAriaCurrent;
}
