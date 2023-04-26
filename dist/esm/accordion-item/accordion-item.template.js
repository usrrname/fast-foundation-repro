import { html, ref } from "@microsoft/fast-element";
import { staticallyCompose } from "../utilities/template-helpers.js";
import { endSlotTemplate, startSlotTemplate } from "../patterns/index.js";
/**
 * The template for the {@link @microsoft/fast-foundation#(FASTAccordionItem:class)} component.
 * @public
 */
export function accordionItemTemplate(options = {}) {
    return html `
        <div
            class="heading"
            part="heading"
            role="heading"
            aria-level="${x => x.headinglevel}"
        >
            <button
                class="button"
                part="button"
                ${ref("expandbutton")}
                ?disabled="${x => (x.disabled ? "true" : void 0)}"
                aria-expanded="${x => x.expanded}"
                aria-controls="${x => x.id}-panel"
                id="${x => x.id}"
                @click="${(x, c) => x.clickHandler(c.event)}"
            >
                <span class="heading-content" part="heading-content">
                    <slot name="heading"></slot>
                </span>
            </button>
            ${startSlotTemplate(options)}
            ${endSlotTemplate(options)}
            <span class="icon" part="icon" aria-hidden="true">
                <slot name="expanded-icon">
                    ${staticallyCompose(options.expandedIcon)}
                </slot>
                <slot name="collapsed-icon">
                    ${staticallyCompose(options.collapsedIcon)}
                </slot>
            <span>
        </div>
        <div
            class="region"
            part="region"
            id="${x => x.id}-panel"
            role="region"
            aria-labelledby="${x => x.id}"
        >
            <slot></slot>
        </div>
`;
}
