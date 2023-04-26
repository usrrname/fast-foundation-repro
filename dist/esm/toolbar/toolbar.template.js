import { children, elements, html, slotted, } from "@microsoft/fast-element";
import { endSlotTemplate, startSlotTemplate } from "../patterns/index.js";
/**
 * The template for the {@link @microsoft/fast-foundation#(FASTToolbar:class)} component.
 *
 * @public
 */
export function toolbarTemplate(options = {}) {
    return html `
        <template
            aria-label="${x => x.ariaLabel}"
            aria-labelledby="${x => x.ariaLabelledby}"
            aria-orientation="${x => x.orientation}"
            orientation="${x => x.orientation}"
            role="toolbar"
            @click="${(x, c) => x.clickHandler(c.event)}"
            @focusin="${(x, c) => x.focusinHandler(c.event)}"
            @keydown="${(x, c) => x.keydownHandler(c.event)}"
            ${children({
        property: "childItems",
        attributeFilter: ["disabled", "hidden"],
        selector: "*",
        subtree: true,
    })}
        >
            <slot name="label"></slot>
            <div class="positioning-region" part="positioning-region">
                ${startSlotTemplate(options)}
                <slot
                    ${slotted({
        filter: elements(),
        property: "slottedItems",
    })}
                ></slot>
                ${endSlotTemplate(options)}
            </div>
        </template>
    `;
}
