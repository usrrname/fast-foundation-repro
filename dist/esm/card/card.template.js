import { html } from "@microsoft/fast-element";
/**
 * The template for the {@link @microsoft/fast-foundation#FASTCard} component.
 * @public
 */
export function cardTemplate() {
    return html `
        <slot></slot>
    `;
}
