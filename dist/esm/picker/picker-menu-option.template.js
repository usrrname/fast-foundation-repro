import { html } from "@microsoft/fast-element";
/**
 *
 * @public
 */
export function pickerMenuOptionTemplate() {
    return html `
        <template
            role="listitem"
            tabindex="-1"
            @click="${(x, c) => x.handleClick(c.event)}"
        >
            <slot></slot>
        </template>
    `;
}
