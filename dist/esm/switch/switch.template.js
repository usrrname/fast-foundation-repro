import { html, slotted } from "@microsoft/fast-element";
import { staticallyCompose } from "../utilities/template-helpers.js";
/**
 * The template for the {@link @microsoft/fast-foundation#(FASTSwitch:class)} component.
 * @public
 */
export function switchTemplate(options = {}) {
    return html `
        <template
            role="switch"
            aria-checked="${x => x.checked}"
            aria-disabled="${x => x.disabled}"
            aria-readonly="${x => x.readOnly}"
            tabindex="${x => (x.disabled ? null : 0)}"
            @keypress="${(x, c) => x.keypressHandler(c.event)}"
            @click="${(x, c) => x.clickHandler(c.event)}"
        >
            <label
                part="label"
                class="${x => x.defaultSlottedNodes && x.defaultSlottedNodes.length
        ? "label"
        : "label label__hidden"}"
            >
                <slot ${slotted("defaultSlottedNodes")}></slot>
            </label>
            <div part="switch" class="switch">
                <slot name="switch">${staticallyCompose(options.switch)}</slot>
            </div>
        </template>
    `;
}
