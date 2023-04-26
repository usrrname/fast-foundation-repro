import { html } from "@microsoft/fast-element";
import { staticallyCompose } from "../utilities/template-helpers.js";
/**
 * The template for {@link @microsoft/fast-foundation#FASTAvatar} component.
 * @public
 */
export function avatarTemplate(options = {}) {
    return html `
        <div class="backplate" part="backplate">
            <slot name="media">${staticallyCompose(options.media)}</slot>
            <slot></slot>
        </div>
        <slot name="badge"></slot>
    `;
}
