import { html } from "@microsoft/fast-element";
/**
 * The template for the {@link @microsoft/fast-foundation#FASTDivider} component.
 * @public
 */
export function dividerTemplate() {
    return html `
        <template role="${x => x.role}" aria-orientation="${x => x.orientation}">
            <slot></slot>
        </template>
    `;
}
