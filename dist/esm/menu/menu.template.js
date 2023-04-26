import { html, slotted } from "@microsoft/fast-element";
/**
 * The template for the {@link @microsoft/fast-foundation#FASTMenu} component.
 * @public
 */
export function menuTemplate() {
    return html `
        <template
            slot="${x => (x.slot ? x.slot : x.isNestedMenu() ? "submenu" : void 0)}"
            role="menu"
            @keydown="${(x, c) => x.handleMenuKeyDown(c.event)}"
            @focusout="${(x, c) => x.handleFocusOut(c.event)}"
        >
            <slot ${slotted("items")}></slot>
        </template>
    `;
}
