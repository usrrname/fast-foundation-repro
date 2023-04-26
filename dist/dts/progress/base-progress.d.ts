import { FASTElement } from "@microsoft/fast-element";
/**
 * A base class for progress components.
 * @public
 */
export declare class FASTBaseProgress extends FASTElement {
    /**
     * The value of the progress
     * @public
     * @remarks
     * HTML Attribute: value
     */
    value: number | null;
    protected valueChanged(): void;
    /**
     * The minimum value
     * @public
     * @remarks
     * HTML Attribute: min
     */
    min: number;
    protected minChanged(): void;
    /**
     * The maximum value
     * @public
     * @remarks
     * HTML Attribute: max
     */
    max: number;
    protected maxChanged(): void;
    /**
     * Indicates progress in %
     * @internal
     */
    percentComplete: number;
    /**
     * @internal
     */
    connectedCallback(): void;
    private updatePercentComplete;
}
