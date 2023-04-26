import { FASTElement, ViewTemplate } from "@microsoft/fast-element";
/**
 * A picker list item Custom HTML Element.
 *
 * @beta
 */
export declare class FASTPickerMenuOption extends FASTElement {
    /**
     * The underlying string value of the item
     *
     * @remarks
     * HTML Attribute: value
     */
    value: string;
    /**
     *  The template used to render the contents of the list item
     */
    contentsTemplate: ViewTemplate;
    protected contentsTemplateChanged(): void;
    private customView;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    handleClick(e: MouseEvent): boolean;
    private handleInvoked;
    private updateView;
    private disconnectView;
}
