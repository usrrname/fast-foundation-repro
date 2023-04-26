import { html, slotted } from "@microsoft/fast-element";
import { staticallyCompose } from "../utilities/template-helpers.js";
/**
 * The template for the {@link @microsoft/fast-foundation#(FASTCheckbox:class)} component.
 * @public
 */
export function checkboxTemplate(options = {}) {
    return html `
        <template
            role="checkbox"
            aria-checked="${x => (x.indeterminate ? "mixed" : x.checked)}"
            aria-required="${x => x.required}"
            aria-disabled="${x => x.disabled}"
            tabindex="${x => (x.disabled ? null : 0)}"
            @keypress="${(x, c) => x.keypressHandler(c.event)}"
            @click="${(x, c) => x.clickHandler(c.event)}"
        >
            <div part="control" class="control">
                <slot name="checked-indicator">
                    ${staticallyCompose(options.checkedIndicator)}
                </slot>
                <slot name="indeterminate-indicator">
                    ${staticallyCompose(options.indeterminateIndicator)}
                </slot>
            </div>
            <label
                part="label"
                class="${x => x.defaultSlottedNodes && x.defaultSlottedNodes.length
        ? "label"
        : "label label__hidden"}"
            >
                <slot ${slotted("defaultSlottedNodes")}></slot>
            </label>
        </template>
    `;
}
