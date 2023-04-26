import { html, when } from "@microsoft/fast-element";
import { staticallyCompose } from "../utilities/template-helpers.js";
import { anchorTemplate } from "../anchor/anchor.template.js";
/**
 * The template for the {@link @microsoft/fast-foundation#(FASTBreadcrumbItem:class)} component.
 * @public
 */
export function breadcrumbItemTemplate(options = {}) {
    return html `
        <div role="listitem" class="listitem" part="listitem">
            ${anchorTemplate(options).inline()}
            ${when(x => x.separator, html `
                    <span class="separator" part="separator" aria-hidden="true">
                        <slot name="separator">
                            ${staticallyCompose(options.separator)}
                        </slot>
                    </span>
                `)}
        </div>
    `;
}
