import type { SyntheticViewTemplate, ViewTemplate } from "@microsoft/fast-element";
import { FASTElement } from "@microsoft/fast-element";
import type { FASTDataGridCell } from "./data-grid-cell.js";
import { DataGridRowTypes, GenerateHeaderOptions } from "./data-grid.options.js";
export { DataGridRowTypes, GenerateHeaderOptions };
/**
 * Defines a column in the grid
 *
 * @public
 */
export interface ColumnDefinition {
    /**
     * Identifies the data item to be displayed in this column
     * (i.e. how the data item is labelled in each row)
     */
    columnDataKey: string;
    /**
     * Sets the css grid-column property on the cell which controls its placement in
     * the parent row. If left unset the cells will set this value to match the index
     * of their column in the parent collection of ColumnDefinitions.
     */
    gridColumn?: string;
    /**
     *  Column title, if not provided columnDataKey is used as title
     */
    title?: string;
    /**
     *  Header cell template
     */
    headerCellTemplate?: ViewTemplate | SyntheticViewTemplate;
    /**
     * Whether the header cell has an internal focus queue
     */
    headerCellInternalFocusQueue?: boolean;
    /**
     * Callback function that returns the element to focus in a custom cell.
     * When headerCellInternalFocusQueue is false this function is called when the cell is first focused
     * to immediately move focus to a cell element, for example a cell that is a checkbox could move
     * focus directly to the checkbox.
     * When headerCellInternalFocusQueue is true this function is called when the user hits Enter or F2
     */
    headerCellFocusTargetCallback?: (cell: FASTDataGridCell) => HTMLElement;
    /**
     * cell template
     */
    cellTemplate?: ViewTemplate | SyntheticViewTemplate;
    /**
     * Whether the cell has an internal focus queue
     */
    cellInternalFocusQueue?: boolean;
    /**
     * Callback function that returns the element to focus in a custom cell.
     * When cellInternalFocusQueue is false this function is called when the cell is first focused
     * to immediately move focus to a cell element, for example a cell that is a checkbox could move
     * focus directly to the checkbox.
     * When cellInternalFocusQueue is true this function is called when the user hits Enter or F2
     */
    cellFocusTargetCallback?: (cell: FASTDataGridCell) => HTMLElement;
    /**
     * Whether this column is the row header
     */
    isRowHeader?: boolean;
}
/**
 * A Data Grid Custom HTML Element.
 *
 * @slot - The default slot for custom row elements
 * @public
 */
export declare class FASTDataGrid extends FASTElement {
    /**
     *  generates a basic column definition by examining sample row data
     */
    static generateColumns: (row: object) => ColumnDefinition[];
    /**
     *  generates a gridTemplateColumns based on columndata array
     */
    private static generateTemplateColumns;
    /**
     * When true the component will not add itself to the tab queue.
     * Default is false.
     *
     * @public
     * @remarks
     * HTML Attribute: no-tabbing
     */
    noTabbing: boolean;
    protected noTabbingChanged(): void;
    /**
     *  Whether the grid should automatically generate a header row and its type
     *
     * @public
     * @remarks
     * HTML Attribute: generate-header
     */
    generateHeader: GenerateHeaderOptions;
    private generateHeaderChanged;
    /**
     * String that gets applied to the the css gridTemplateColumns attribute of child rows
     *
     * @public
     * @remarks
     * HTML Attribute: grid-template-columns
     */
    gridTemplateColumns: string;
    protected gridTemplateColumnsChanged(): void;
    /**
     * The number of rows to move selection on page up/down keystrokes.
     * When undefined the grid will use viewport height/the height of the first non-header row.
     * If the grid itself is a scrolling container it will be considered the viewport for this purpose,
     * otherwise the document will be used.
     *
     * @public
     * @remarks
     * HTML Attribute: page-size
     */
    pageSize: number | undefined;
    /**
     * The data being displayed in the grid
     *
     * @public
     */
    rowsData: object[];
    protected rowsDataChanged(): void;
    /**
     * The column definitions of the grid
     *
     * @public
     */
    columnDefinitions: ColumnDefinition[] | null;
    protected columnDefinitionsChanged(): void;
    /**
     * The template to use for the programmatic generation of rows
     *
     * @public
     */
    rowItemTemplate: ViewTemplate;
    /**
     * The template used to render cells in generated rows.
     *
     * @public
     */
    cellItemTemplate?: ViewTemplate;
    /**
     * The template used to render header cells in generated rows.
     *
     * @public
     */
    headerCellItemTemplate?: ViewTemplate;
    private headerCellItemTemplateChanged;
    /**
     * The index of the row that will receive focus the next time the
     * grid is focused. This value changes as focus moves to different
     * rows within the grid.  Changing this value when focus is already
     * within the grid moves focus to the specified row.
     *
     * @public
     */
    focusRowIndex: number;
    private focusRowIndexChanged;
    /**
     * The index of the column that will receive focus the next time the
     * grid is focused. This value changes as focus moves to different rows
     * within the grid.  Changing this value when focus is already within
     * the grid moves focus to the specified column.
     *
     * @public
     */
    focusColumnIndex: number;
    private focusColumnIndexChanged;
    /**
     * The default row item template.  Set by the component templates.
     *
     * @internal
     */
    defaultRowItemTemplate: ViewTemplate;
    /**
     * Set by the component templates.
     *
     */
    rowElementTag: string;
    /**
     * Children that are rows
     *
     * @internal
     */
    rowElements: HTMLElement[];
    private rowsPlaceholder;
    private behaviorOrchestrator;
    private generatedHeader;
    private isUpdatingFocus;
    private pendingFocusUpdate;
    private observer;
    private rowindexUpdateQueued;
    private columnDefinitionsStale;
    private generatedGridTemplateColumns;
    constructor();
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * @internal
     */
    handleRowFocus(e: Event): void;
    /**
     * @internal
     */
    handleFocus(e: FocusEvent): void;
    /**
     * @internal
     */
    handleFocusOut(e: FocusEvent): void;
    /**
     * @internal
     */
    handleKeydown(e: KeyboardEvent): void;
    private getPageSize;
    private focusOnCell;
    private queueFocusUpdate;
    private updateFocus;
    private toggleGeneratedHeader;
    private onChildListChange;
    private queueRowIndexUpdate;
    private updateRowIndexes;
}
