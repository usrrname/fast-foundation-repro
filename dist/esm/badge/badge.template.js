import { html } from "@microsoft/fast-element";
/**
 * The template for the {@link @microsoft/fast-foundation#FASTBadge} component.
 * @public
 */
export function badgeTemplate() {
    return html `
        <div class="control" part="control">
            <slot></slot>
        </div>
    `;
}
