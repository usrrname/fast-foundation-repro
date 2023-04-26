import { html } from "@microsoft/fast-element";
/**
 *
 * @public
 */
export function pickerListTemplate() {
    return html `
        <template slot="list-region" role="list">
            <slot></slot>
            <slot name="input-region"></slot>
        </template>
    `;
}
