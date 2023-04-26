import { elements, html, ref, slotted, when } from "@microsoft/fast-element";
import { staticallyCompose } from "../utilities/template-helpers.js";
import { endSlotTemplate, startSlotTemplate } from "../patterns/start-end.js";
/**
 * @public
 */
export function horizontalScrollTemplate(options = {}) {
    return html `
        <template @keyup="${(x, c) => x.keyupHandler(c.event)}">
            ${startSlotTemplate(options)}
            <div class="scroll-area" part="scroll-area">
                <div
                    class="scroll-view"
                    part="scroll-view"
                    @scroll="${x => x.scrolled()}"
                    ${ref("scrollContainer")}
                >
                    <div
                        class="content-container"
                        part="content-container"
                        ${ref("content")}
                    >
                        <slot
                            ${slotted({
        property: "scrollItems",
        filter: elements(),
    })}
                        ></slot>
                    </div>
                </div>
                ${when(x => x.view !== "mobile", html `
                        <div
                            class="scroll scroll-prev"
                            part="scroll-prev"
                            ${ref("previousFlipperContainer")}
                        >
                            <div class="scroll-action" part="scroll-action-previous">
                                <slot name="previous-flipper">
                                    ${staticallyCompose(options.previousFlipper)}
                                </slot>
                            </div>
                        </div>
                        <div
                            class="scroll scroll-next"
                            part="scroll-next"
                            ${ref("nextFlipperContainer")}
                        >
                            <div class="scroll-action" part="scroll-action-next">
                                <slot name="next-flipper">
                                    ${staticallyCompose(options.nextFlipper)}
                                </slot>
                            </div>
                        </div>
                    `)}
            </div>
            ${endSlotTemplate(options)}
        </template>
    `;
}
