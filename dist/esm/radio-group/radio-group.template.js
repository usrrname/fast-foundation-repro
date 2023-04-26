import { elements, html, slotted } from "@microsoft/fast-element";
import { RadioGroupOrientation } from "./radio-group.options.js";
/**
 * The template for the {@link @microsoft/fast-foundation#FASTRadioGroup} component.
 * @public
 */
export function radioGroupTemplate() {
    return html `
        <template
            role="radiogroup"
            tabindex="${x => (x.disabled ? -1 : void 0)}"
            aria-disabled="${x => x.disabled}"
            aria-readonly="${x => x.readOnly}"
            aria-orientation="${x => x.orientation}"
            @click="${(x, c) => x.clickHandler(c.event)}"
            @mousedown="${(x, c) => x.handleDisabledClick(c.event)}"
            @keydown="${(x, c) => x.keydownHandler(c.event)}"
            @focusout="${(x, c) => x.focusOutHandler(c.event)}"
        >
            <slot name="label"></slot>
            <div
                class="positioning-region ${x => x.orientation === RadioGroupOrientation.horizontal
        ? "horizontal"
        : "vertical"}"
                part="positioning-region"
            >
                <slot
                    ${slotted({
        property: "slottedRadioButtons",
        filter: elements("[role=radio]"),
    })}
                ></slot>
            </div>
        </template>
    `;
}
