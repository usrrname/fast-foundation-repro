import { FASTElement } from "@microsoft/fast-element";
import type { ColumnDefinition } from "./data-grid.js";
import { DataGridCellTypes } from "./data-grid.options.js";
export { DataGridCellTypes };
/**
 * A Data Grid Cell Custom HTML Element.
 *
 * @fires cell-focused - Fires a custom 'cell-focused' event when focus is on the cell or its contents
 * @slot - The default slot for cell contents.  The "cell contents template" renders here.
 * @public
 */
export declare class FASTDataGridCell extends FASTElement {
    /**
     * The type of cell
     *
     * @public
     * @remarks
     * HTML Attribute: cell-type
     */
    cellType: DataGridCellTypes;
    private cellTypeChanged;
    /**
     * The column index of the cell.
     * This will be applied to the css grid-column-index value
     * applied to the cell
     *
     * @public
     * @remarks
     * HTML Attribute: grid-column
     */
    gridColumn: string;
    protected gridColumnChanged(): void;
    /**
     * The base data for the parent row
     *
     * @public
     */
    rowData: object | null;
    /**
     * The base data for the column
     *
     * @public
     */
    columnDefinition: ColumnDefinition | null;
    protected columnDefinitionChanged(oldValue: ColumnDefinition | null, newValue: ColumnDefinition | null): void;
    private isActiveCell;
    private customCellView;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    handleFocusin(e: FocusEvent): void;
    handleFocusout(e: FocusEvent): void;
    handleKeydown(e: KeyboardEvent): void;
    private updateCellView;
    private disconnectCellView;
    private updateCellStyle;
}
