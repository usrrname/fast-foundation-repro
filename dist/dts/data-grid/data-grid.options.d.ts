import type { ValuesOf } from "../utilities/index.js";
/**
 * Enumerates the data grid auto generated header options
 * default option generates a non-sticky header row
 *
 * @public
 */
export declare const GenerateHeaderOptions: {
    readonly none: "none";
    readonly default: "default";
    readonly sticky: "sticky";
};
/**
 * The types for the data grid auto generated header options
 *
 * @public
 */
export type GenerateHeaderOptions = ValuesOf<typeof GenerateHeaderOptions>;
/**
 * Enumerates possible data grid cell types.
 *
 * @public
 */
export declare const DataGridCellTypes: {
    readonly default: "default";
    readonly columnHeader: "columnheader";
    readonly rowHeader: "rowheader";
};
/**
 * The possible cell types.
 *
 * @public
 */
export type DataGridCellTypes = ValuesOf<typeof DataGridCellTypes>;
/**
 * Enumerates possible data grid row types
 *
 * @public
 */
export declare const DataGridRowTypes: {
    readonly default: "default";
    readonly header: "header";
    readonly stickyHeader: "sticky-header";
};
/**
 * The possible data grid row types
 *
 * @public
 */
export type DataGridRowTypes = ValuesOf<typeof DataGridRowTypes>;
/**
 * Class names for the data grid cell
 * @public
 */
export declare const DataGridCellTypeClass: {
    readonly columnheader: "column-header";
    readonly default: "";
    readonly rowheader: "row-header";
};
/**
 * Types for the data grid cell class names
 * @public
 */
export type DataGridCellTypeClass = ValuesOf<typeof DataGridCellTypeClass>;
/**
 * Roles for the data grid cell
 *
 * @public
 */
export declare const DataGridCellRole: {
    readonly columnheader: "columnheader";
    readonly rowheader: "rowheader";
    readonly default: "gridcell";
};
/**
 * Type for the data grid cell roles
 * @public
 */
export type DataGridCellRole = ValuesOf<typeof DataGridCellRole>;
