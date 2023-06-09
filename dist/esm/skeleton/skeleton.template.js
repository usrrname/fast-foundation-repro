import { html, when } from "@microsoft/fast-element";
/**
 * The template for the fast-skeleton component
 * @public
 */
export function skeletonTemplate() {
    return html `
        <template pattern="${x => x.pattern}" ?shimmer="${x => x.shimmer}">
            ${when(x => x.shimmer === true, html `
                    <span class="shimmer"></span>
                `)}
            <object type="image/svg+xml" data="${x => x.pattern}" role="presentation">
                <img class="pattern" src="${x => x.pattern}" />
            </object>
            <slot></slot>
        </template>
    `;
}
