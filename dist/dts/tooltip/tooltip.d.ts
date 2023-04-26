import { ElementStyles, FASTElement } from "@microsoft/fast-element";
import { TooltipPlacement } from "./tooltip.options.js";
/**
 * A Tooltip Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.2/#tooltip | ARIA tooltip }.
 *
 * @slot - The default slot for the tooltip content
 * @fires dismiss - Fires a custom 'dismiss' event when the tooltip is visible and escape key is pressed
 *
 * @public
 */
export declare class FASTTooltip extends FASTElement {
    /**
     * The visibility of the tooltip.
     *
     * @internal
     */
    private _visible;
    /**
     * The id of the element the tooltip is anchored to.
     *
     * @defaultValue - undefined
     * @public
     * @remarks
     * HTML Attribute: `anchor`
     */
    anchor: string;
    /**
     * Removes listeners from the previous anchor element and updates the anchor element reference.
     *
     * @param prev - the previous anchor string
     * @param next - the current anchor string
     *
     * @internal
     */
    protected anchorChanged(prev: string | undefined, next: string): void;
    /**
     * A reference to the anchor element.
     *
     * @internal
     */
    anchorElement: Element | null;
    /**
     * Cleanup function for the tooltip positioner.
     *
     * @public
     */
    cleanup: () => void;
    /**
     * Indicates if the tooltip visibility is controlled by the `visible` attribute.
     *
     * When `true`, the tooltip visibility is controlled by the `visible` attribute.
     * When `false`, the tooltip visibility is controlled by the `mouseover` and `focusin` events on the anchor element.
     *
     * @internal
     */
    private controlledVisibility;
    /**
     * Switches between controlled and uncontrolled visibility.
     *
     * @param prev - the previous forced visibility state
     * @param next - the current forced visibility state
     * @internal
     */
    protected controlledVisibilityChanged(prev: boolean | undefined, next: boolean): void;
    /**
     * Hides the tooltip when the anchor element loses focus.
     *
     * @internal
     */
    protected focusoutAnchorHandler: () => void;
    /**
     * Shows the tooltip when the anchor element gains focus.
     *
     * @internal
     */
    protected focusinAnchorHandler: () => void;
    /**
     * The tooltip ID attribute.
     *
     * @public
     * @remarks
     * HTML Attribute: `id`
     */
    id: string;
    idChanged(prev: string, next: string): void;
    /**
     * Hides the tooltip when the `Escape` key is pressed.
     *
     * @param e - the keyboard event
     *
     * @internal
     */
    private keydownDocumentHandler;
    /**
     * Shows the tooltip when the mouse is over the anchor element.
     *
     * @internal
     */
    private mouseoverAnchorHandler;
    /**
     * Hides the tooltip when the mouse leaves the anchor element.
     *
     * @internal
     */
    private mouseoutAnchorHandler;
    /**
     * The placement of the tooltip relative to the anchor element.
     *
     * @public
     * @remarks
     * HTML Attribute: `placement`
     */
    placement: TooltipPlacement;
    /**
     * Calculated styles for the tooltip position.
     *
     * @internal
     */
    protected positionStyles: ElementStyles;
    /**
     * Updates the styles for the tooltip position.
     *
     * @param prev - the previous placement styles
     * @param next - the current placement styles
     *
     * @internal
     */
    protected positionStylesChanged(prev: ElementStyles | undefined, next: ElementStyles | undefined): void;
    /**
     * The visibility state of the tooltip.
     *
     * @public
     * @remarks
     * HTML Attribute: `show`
     */
    show: boolean | undefined;
    showChanged(prev: boolean | undefined, next: boolean | undefined): void;
    /**
     * Returns the current visibility of the tooltip.
     * @public
     */
    get visible(): boolean | undefined;
    /**
     * Sets the forced visibility state and shows or hides the tooltip.
     *
     * @internal
     */
    private set visible(value);
    /**
     * Adds the `id` of the tooltip to the `aria-describedby` attribute of the anchor element.
     *
     * @internal
     */
    private addAnchorAriaDescribedBy;
    /**
     * Adds event listeners to the anchor element, the tooltip element, and the document.
     *
     * @internal
     */
    private addListeners;
    connectedCallback(): void;
    /**
     * Hides the tooltip and emits a custom `dismiss` event.
     *
     * @internal
     */
    private dismiss;
    /**
     * Hides the tooltip.
     *
     * @internal
     */
    hideTooltip(): void;
    /**
     * Gets the anchor element by id.
     *
     * @param id - the id of the anchor element
     *
     * @internal
     */
    private getAnchorElement;
    /**
     * Removes the `id` of the tooltip from the `aria-describedby` attribute of the anchor element.
     *
     * @param id - the id of the tooltip
     *
     * @internal
     */
    private removeAnchorAriaDescribedBy;
    /**
     * Removes event listeners from the anchor element, the tooltip element, and the document.
     *
     * @internal
     */
    private removeListeners;
    /**
     * Sets the tooltip position.
     *
     * @public
     */
    setPositioning(): void;
    /**
     * Shows the tooltip.
     *
     * @internal
     */
    private showTooltip;
}
