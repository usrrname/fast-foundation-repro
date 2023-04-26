import { html, slotted } from "@microsoft/fast-element";
/**
 * The template for the List Picker component.
 * @public
 */
export function pickerMenuTemplate() {
    return html `
        <template role="list" slot="menu-region">
            <div class="options-display" part="options-display">
                <div class="header-region" part="header-region">
                    <slot name="header-region" ${slotted("headerElements")}></slot>
                </div>

                <slot ${slotted("menuElements")}></slot>
                <div class="footer-region" part="footer-region">
                    <slot name="footer-region" ${slotted("footerElements")}></slot>
                </div>
                <div
                    role="alert"
                    aria-live="polite"
                    part="suggestions-available-alert"
                    class="suggestions-available-alert"
                >
                    ${x => x.suggestionsAvailableText}
                </div>
            </div>
        </template>
    `;
}
