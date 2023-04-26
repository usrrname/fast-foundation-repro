import { html } from "@microsoft/fast-element";
/**
 * The template for the {@link @microsoft/fast-foundation#FASTTabPanel} component.
 * @public
 */
export function tabPanelTemplate() {
    return html `
        <template slot="tabpanel" role="tabpanel">
            <slot></slot>
        </template>
    `;
}
