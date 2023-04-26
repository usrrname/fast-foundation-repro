import { html } from "@microsoft/fast-element";
/**
 *
 * @public
 */
export function pickerListItemTemplate() {
    return html `
        <template
            role="listitem"
            tabindex="0"
            @click="${(x, c) => x.handleClick(c.event)}"
            @keydown="${(x, c) => x.handleKeyDown(c.event)}"
        >
            <slot></slot>
        </template>
    `;
}
