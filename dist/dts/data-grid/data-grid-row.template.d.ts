import { ElementViewTemplate } from "@microsoft/fast-element";
import { TemplateElementDependency } from "../patterns/index.js";
import type { FASTDataGridRow } from "./data-grid-row.js";
/**
 * Options for data grid cells.
 * @public
 */
export type CellItemTemplateOptions = {
    dataGridCell: TemplateElementDependency;
};
/**
 * Generates a template for the {@link @microsoft/fast-foundation#FASTDataGridRow} component using
 * the provided prefix.
 *
 * @public
 */
export declare function dataGridRowTemplate<T extends FASTDataGridRow>(options: CellItemTemplateOptions): ElementViewTemplate<T>;
