import { html, slotted } from "@microsoft/fast-element";
import { endSlotTemplate, startSlotTemplate } from "../patterns/index.js";
/**
 * The template for the {@link @microsoft/fast-foundation#(FASTListboxOption:class)} component.
 * @public
 */
export function listboxOptionTemplate(options = {}) {
    return html `
        <template
            aria-checked="${x => x.ariaChecked}"
            aria-disabled="${x => x.ariaDisabled}"
            aria-posinset="${x => x.ariaPosInSet}"
            aria-selected="${x => x.ariaSelected}"
            aria-setsize="${x => x.ariaSetSize}"
            role="option"
        >
            ${startSlotTemplate(options)}
            <span class="content" part="content">
                <slot ${slotted("content")}></slot>
            </span>
            ${endSlotTemplate(options)}
        </template>
    `;
}
