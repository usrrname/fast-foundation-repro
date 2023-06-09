import { html, ref, slotted, when } from "@microsoft/fast-element";
import { staticallyCompose } from "../utilities/template-helpers.js";
import { FASTListbox } from "../listbox/listbox.js";
import { endSlotTemplate, startSlotTemplate } from "../patterns/index.js";
/**
 * The template for the {@link @microsoft/fast-foundation#(FASTSelect:class)} component.
 * @public
 */
export function selectTemplate(options = {}) {
    return html `
        <template
            aria-activedescendant="${x => x.ariaActiveDescendant}"
            aria-controls="${x => x.ariaControls}"
            aria-disabled="${x => x.ariaDisabled}"
            aria-expanded="${x => x.ariaExpanded}"
            aria-haspopup="${x => (x.collapsible ? "listbox" : null)}"
            aria-multiselectable="${x => x.ariaMultiSelectable}"
            ?open="${x => x.open}"
            role="combobox"
            tabindex="${x => (!x.disabled ? "0" : null)}"
            @click="${(x, c) => x.clickHandler(c.event)}"
            @focusin="${(x, c) => x.focusinHandler(c.event)}"
            @focusout="${(x, c) => x.focusoutHandler(c.event)}"
            @keydown="${(x, c) => x.keydownHandler(c.event)}"
            @mousedown="${(x, c) => x.mousedownHandler(c.event)}"
        >
            ${when(x => x.collapsible, html `
                    <div
                        class="control"
                        part="control"
                        ?disabled="${x => x.disabled}"
                        ${ref("control")}
                    >
                        ${startSlotTemplate(options)}
                        <slot name="button-container">
                            <div class="selected-value" part="selected-value">
                                <slot name="selected-value">${x => x.displayValue}</slot>
                            </div>
                            <div aria-hidden="true" class="indicator" part="indicator">
                                <slot name="indicator">
                                    ${staticallyCompose(options.indicator)}
                                </slot>
                            </div>
                        </slot>
                        ${endSlotTemplate(options)}
                    </div>
                `)}
            <div
                class="listbox"
                id="${x => x.listboxId}"
                part="listbox"
                role="listbox"
                ?disabled="${x => x.disabled}"
                ?hidden="${x => (x.collapsible ? !x.open : false)}"
                ${ref("listbox")}
            >
                <slot
                    ${slotted({
        filter: FASTListbox.slottedOptionFilter,
        flatten: true,
        property: "slottedOptions",
    })}
                ></slot>
            </div>
        </template>
    `;
}
