import { html, ref, slotted, when } from "@microsoft/fast-element";
import { endSlotTemplate, startSlotTemplate } from "../patterns/index.js";
/**
 * The template for the {@link @microsoft/fast-foundation#(FASTTabs:class)} component.
 * @public
 */
export function tabsTemplate(options = {}) {
    return html `
        ${startSlotTemplate(options)}
        <div class="tablist" part="tablist" role="tablist">
            <slot name="tab" ${slotted("tabs")}></slot>

            ${when(x => x.showActiveIndicator, html `
                    <div
                        ${ref("activeIndicatorRef")}
                        class="active-indicator"
                        part="active-indicator"
                    ></div>
                `)}
        </div>
        ${endSlotTemplate(options)}
        <div class="tabpanel" part="tabpanel">
            <slot name="tabpanel" ${slotted("tabpanels")}></slot>
        </div>
    `;
}
