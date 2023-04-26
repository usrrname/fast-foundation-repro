import { html } from "@microsoft/fast-element";
import { staticallyCompose } from "../utilities/template-helpers.js";
/**
 * The template for the {@link @microsoft/fast-foundation#FASTFlipper} component.
 * @public
 */
export function flipperTemplate(options = {}) {
    const templateCache = {};
    function setFlipperTemplateByDirection(direction, options) {
        let existing = templateCache[direction];
        if (!existing) {
            templateCache[direction] = existing = html `
                <span part="${direction}" class="${direction}">
                    <slot name="${direction}">
                        ${staticallyCompose(options[direction])}
                    </slot>
                </span>
            `;
        }
        return existing;
    }
    return html `
        <template
            role="button"
            aria-disabled="${x => (x.disabled ? true : void 0)}"
            tabindex="${x => (x.hiddenFromAT ? -1 : 0)}"
            @keyup="${(x, c) => x.keyupHandler(c.event)}"
        >
            ${x => setFlipperTemplateByDirection(x.direction, options)}
        </template>
    `;
}
