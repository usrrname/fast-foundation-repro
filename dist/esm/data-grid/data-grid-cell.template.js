import { html } from "@microsoft/fast-element";
import { DataGridCellRole } from "./data-grid.options.js";
/**
 * Generates a template for the {@link @microsoft/fast-foundation#FASTDataGridCell} component using
 * the provided prefix.
 * @public
 */
export function dataGridCellTemplate() {
    return html `
        <template
            tabindex="-1"
            role="${x => { var _a; return (_a = DataGridCellRole[x.cellType]) !== null && _a !== void 0 ? _a : DataGridCellRole.default; }}"
        >
            <slot></slot>
        </template>
    `;
}
