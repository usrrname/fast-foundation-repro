import { html, when } from "@microsoft/fast-element";
/**
 * The template for the {@link @microsoft/fast-foundation#(FASTAnchoredRegion:class)} component.
 * @public
 */
export function anchoredRegionTemplate() {
    return html `
        <template data-loaded="${x => (x.initialLayoutComplete ? "loaded" : "")}">
            ${when(x => x.initialLayoutComplete, html `
                    <slot></slot>
                `)}
        </template>
    `;
}
