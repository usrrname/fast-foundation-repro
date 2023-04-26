import { html, slotted } from "@microsoft/fast-element";
import { FASTListboxElement } from "./listbox.element.js";
/**
 * The template for the {@link @microsoft/fast-foundation#(FASTListbox:class)} component.
 * @public
 */
export function listboxTemplate() {
    return html `
        <template
            aria-activedescendant="${x => x.ariaActiveDescendant}"
            aria-multiselectable="${x => x.ariaMultiSelectable}"
            role="listbox"
            tabindex="${x => (!x.disabled ? "0" : null)}"
            @click="${(x, c) => x.clickHandler(c.event)}"
            @focusin="${(x, c) => x.focusinHandler(c.event)}"
            @keydown="${(x, c) => x.keydownHandler(c.event)}"
            @mousedown="${(x, c) => x.mousedownHandler(c.event)}"
        >
            <slot
                ${slotted({
        filter: FASTListboxElement.slottedOptionFilter,
        flatten: true,
        property: "slottedOptions",
    })}
            ></slot>
        </template>
    `;
}
