import { html } from "@microsoft/fast-element";
import { endSlotTemplate, startSlotTemplate } from "../patterns/index.js";
/**
 * The template for the {@link @microsoft/fast-foundation#(FASTTab:class)} component.
 * @public
 */
export function tabTemplate(options = {}) {
    return html `
        <template slot="tab" role="tab" aria-disabled="${x => x.disabled}">
            ${startSlotTemplate(options)}
            <slot></slot>
            ${endSlotTemplate(options)}
        </template>
    `;
}
