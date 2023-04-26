import { children, elements, html, slotted, } from "@microsoft/fast-element";
import { tagFor } from "../patterns/index.js";
function cellItemTemplate(options) {
    const cellTag = html.partial(tagFor(options.dataGridCell));
    return html `
    <${cellTag}
        cell-type="${x => (x.isRowHeader ? "rowheader" : undefined)}"
        grid-column="${(x, c) => c.index + 1}"
        :rowData="${(x, c) => c.parent.rowData}"
        :columnDefinition="${x => x}"
    ></${cellTag}>
`;
}
function headerCellItemTemplate(options) {
    const cellTag = html.partial(tagFor(options.dataGridCell));
    return html `
    <${cellTag}
        cell-type="columnheader"
        grid-column="${(x, c) => c.index + 1}"
        :columnDefinition="${x => x}"
    ></${cellTag}>
`;
}
/**
 * Generates a template for the {@link @microsoft/fast-foundation#FASTDataGridRow} component using
 * the provided prefix.
 *
 * @public
 */
export function dataGridRowTemplate(options) {
    return html `
        <template
            role="row"
            :defaultCellItemTemplate="${cellItemTemplate(options)}"
            :defaultHeaderCellItemTemplate="${headerCellItemTemplate(options)}"
            ${children({
        property: "cellElements",
        filter: elements('[role="cell"],[role="gridcell"],[role="columnheader"],[role="rowheader"]'),
    })}
        >
            <slot ${slotted("slottedCellElements")}></slot>
        </template>
    `;
}
