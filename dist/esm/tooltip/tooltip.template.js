import { html } from "@microsoft/fast-element";
/**
 * Creates a template for the {@link @microsoft/fast-foundation#(FASTTooltip:class)} component using the provided prefix.
 * @public
 */
export function tooltipTemplate() {
    return html `
        <template role="tooltip" ?visible="${x => x.visible}">
            <slot></slot>
        </template>
    `;
}
