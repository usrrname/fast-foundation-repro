import { ElementViewTemplate } from "@microsoft/fast-element";
import { TemplateElementDependency } from "../patterns/tag-for.js";
import type { FASTDataGrid } from "./data-grid.js";
/**
 * Options for data grid templates.
 * @public
 */
export type DataGridOptions = {
    dataGridRow: TemplateElementDependency;
};
/**
 * Generates a template for the {@link @microsoft/fast-foundation#FASTDataGrid} component using
 * the provided prefix.
 *
 * @public
 */
export declare function dataGridTemplate<T extends FASTDataGrid>(options: DataGridOptions): ElementViewTemplate<T>;
