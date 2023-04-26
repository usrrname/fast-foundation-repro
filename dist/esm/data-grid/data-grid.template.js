import { children, elements, html } from "@microsoft/fast-element";
import { tagFor } from "../patterns/tag-for.js";
function rowItemTemplate(options) {
    const rowTag = html.partial(tagFor(options.dataGridRow));
    return html `
    <${rowTag}
        :rowData="${x => x}"
        :cellItemTemplate="${(x, c) => c.parent.cellItemTemplate}"
        :headerCellItemTemplate="${(x, c) => c.parent.headerCellItemTemplate}"
    ></${rowTag}>
`;
}
/**
 * Generates a template for the {@link @microsoft/fast-foundation#FASTDataGrid} component using
 * the provided prefix.
 *
 * @public
 */
export function dataGridTemplate(options) {
    const rowTag = tagFor(options.dataGridRow);
    return html `
        <template
            role="grid"
            tabindex="0"
            :rowElementTag="${rowTag}"
            :defaultRowItemTemplate="${rowItemTemplate(options)}"
            ${children({
        property: "rowElements",
        filter: elements("[role=row]"),
    })}
        >
            <slot></slot>
        </template>
    `;
}
