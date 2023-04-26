import { html, ref, when } from "@microsoft/fast-element";
/**
 * The template for the {@link @microsoft/fast-foundation#FASTDialog} component.
 * @public
 */
export function dialogTemplate() {
    return html `
        <div class="positioning-region" part="positioning-region">
            ${when(x => x.modal, html `
                    <div
                        class="overlay"
                        part="overlay"
                        role="presentation"
                        @click="${x => x.dismiss()}"
                    ></div>
                `)}
            <div
                role="dialog"
                tabindex="-1"
                class="control"
                part="control"
                aria-modal="${x => (x.modal ? x.modal : void 0)}"
                aria-describedby="${x => x.ariaDescribedby}"
                aria-labelledby="${x => x.ariaLabelledby}"
                aria-label="${x => x.ariaLabel}"
                ${ref("dialog")}
            >
                <slot></slot>
            </div>
        </div>
    `;
}
