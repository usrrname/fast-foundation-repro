import { FASTElement, ViewTemplate } from "@microsoft/fast-element";
import type { ColumnDefinition } from "./data-grid.js";
import { DataGridRowTypes } from "./data-grid.options.js";
/**
 * A Data Grid Row Custom HTML Element.
 *
 * @fires row-focused - Fires a custom 'row-focused' event when focus is on an element (usually a cell or its contents) in the row
 * @slot - The default slot for custom cell elements
 * @public
 */
export declare class FASTDataGridRow extends FASTElement {
    /**
     * String that gets applied to the the css gridTemplateColumns attribute for the row
     *
     * @public
     * @remarks
     * HTML Attribute: grid-template-columns
     */
    gridTemplateColumns: string;
    protected gridTemplateColumnsChanged(): void;
    /**
     * The type of row
     *
     * @public
     * @remarks
     * HTML Attribute: row-type
     */
    rowType: DataGridRowTypes;
    private rowTypeChanged;
    /**
     * The base data for this row
     *
     * @public
     */
    rowData: object | null;
    protected rowDataChanged(): void;
    /**
     * The column definitions of the row
     *
     * @public
     */
    columnDefinitions: ColumnDefinition[] | null;
    /**
     * The template used to render cells in generated rows.
     *
     * @public
     */
    cellItemTemplate?: ViewTemplate;
    private cellItemTemplateChanged;
    /**
     * The template used to render header cells in generated rows.
     *
     * @public
     */
    headerCellItemTemplate?: ViewTemplate;
    private headerCellItemTemplateChanged;
    /**
     * The index of the row in the parent grid.
     * This is typically set programmatically by the parent grid.
     *
     * @public
     */
    rowIndex: number;
    /**
     * Whether focus is on/in a cell within this row.
     *
     * @internal
     */
    isActiveRow: boolean;
    /**
     * The cell item template currently in use.
     *
     * @internal
     */
    activeCellItemTemplate?: ViewTemplate;
    /**
     * The default cell item template.  Set by the component templates.
     *
     * @internal
     */
    defaultCellItemTemplate?: ViewTemplate;
    /**
     * The default header cell item template.  Set by the component templates.
     *
     * @internal
     */
    defaultHeaderCellItemTemplate?: ViewTemplate;
    /**
     * Children that are cells
     *
     * @internal
     */
    cellElements: HTMLElement[];
    private behaviorOrchestrator;
    /**
     * @internal
     */
    slottedCellElements: HTMLElement[];
    /**
     * @internal
     */
    focusColumnIndex: number;
    private refocusOnLoad;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    handleFocusout(e: FocusEvent): void;
    handleCellFocus(e: Event): void;
    handleKeydown(e: KeyboardEvent): void;
    private updateItemTemplate;
    private updateRowStyle;
}
