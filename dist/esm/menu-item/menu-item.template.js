import { elements, html, ref, slotted, when, } from "@microsoft/fast-element";
import { staticallyCompose } from "../utilities/template-helpers.js";
import { endSlotTemplate, startSlotTemplate } from "../patterns/index.js";
import { MenuItemRole } from "./menu-item.options.js";
/**
 * Generates a template for the {@link @microsoft/fast-foundation#(FASTMenuItem:class)} component using
 * the provided prefix.
 *
 * @public
 */
export function menuItemTemplate(options = {}) {
    return html `
    <template
        aria-haspopup="${x => (x.hasSubmenu ? "menu" : void 0)}"
        aria-checked="${x => (x.role !== MenuItemRole.menuitem ? x.checked : void 0)}"
        aria-disabled="${x => x.disabled}"
        aria-expanded="${x => x.expanded}"
        @keydown="${(x, c) => x.handleMenuItemKeyDown(c.event)}"
        @click="${(x, c) => x.handleMenuItemClick(c.event)}"
        @mouseover="${(x, c) => x.handleMouseOver(c.event)}"
        @mouseout="${(x, c) => x.handleMouseOut(c.event)}"
    >
            ${when(x => x.role === MenuItemRole.menuitemcheckbox, html `
                    <div part="input-container" class="input-container">
                        <span part="checkbox" class="checkbox">
                            <slot name="checkbox-indicator">
                                ${staticallyCompose(options.checkboxIndicator)}
                            </slot>
                        </span>
                    </div>
                `)}
            ${when(x => x.role === MenuItemRole.menuitemradio, html `
                    <div part="input-container" class="input-container">
                        <span part="radio" class="radio">
                            <slot name="radio-indicator">
                                ${staticallyCompose(options.radioIndicator)}
                            </slot>
                        </span>
                    </div>
                `)}
        </div>
        ${startSlotTemplate(options)}
        <span class="content" part="content">
            <slot></slot>
        </span>
        ${endSlotTemplate(options)}
        ${when(x => x.hasSubmenu, html `
                <div
                    part="expand-collapse-glyph-container"
                    class="expand-collapse-glyph-container"
                >
                    <span part="expand-collapse" class="expand-collapse">
                        <slot name="expand-collapse-indicator">
                            ${staticallyCompose(options.expandCollapseGlyph)}
                        </slot>
                    </span>
                </div>
            `)}
        <span
            ?hidden="${x => !x.expanded}"
            class="submenu-container"
            part="submenu-container"
            ${ref("submenuContainer")}
        >
            <slot name="submenu" ${slotted({
        property: "slottedSubmenu",
        filter: elements("[role='menu']"),
    })}></slot>
        </span>
    </template>
    `;
}
