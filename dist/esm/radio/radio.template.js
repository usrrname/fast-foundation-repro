import { html, slotted } from "@microsoft/fast-element";
import { staticallyCompose } from "../utilities/template-helpers.js";
import { whitespaceFilter } from "../utilities/whitespace-filter.js";
/**
 * The template for the {@link @microsoft/fast-foundation#(FASTRadio:class)} component.
 * @public
 */
export function radioTemplate(options = {}) {
    return html `
        <template
            role="radio"
            aria-checked="${x => x.checked}"
            aria-required="${x => x.required}"
            aria-disabled="${x => x.disabled}"
            aria-readonly="${x => x.readOnly}"
            @keypress="${(x, c) => x.keypressHandler(c.event)}"
        >
            <div part="control" class="control">
                <slot name="checked-indicator">
                    ${staticallyCompose(options.checkedIndicator)}
                </slot>
            </div>
            <label
                part="label"
                class="${x => {
        var _a;
        return ["label", !((_a = x.defaultSlottedNodes) === null || _a === void 0 ? void 0 : _a.length) && "label__hidden"]
            .filter(Boolean)
            .join(" ");
    }}"
            >
                <slot
                    ${slotted({
        property: "defaultSlottedNodes",
        filter: whitespaceFilter,
    })}
                ></slot>
            </label>
        </template>
    `;
}
