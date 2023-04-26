import { __awaiter, __decorate } from "tslib";
import { autoUpdate, computePosition, flip, shift, size } from "@floating-ui/dom";
import { attr, FASTElement, observable, Updates } from "@microsoft/fast-element";
import { keyArrowLeft, keyArrowRight, keyEnter, keyEscape, keySpace, } from "@microsoft/fast-web-utilities";
import { StartEnd } from "../patterns/start-end.js";
import { applyMixins } from "../utilities/apply-mixins.js";
import { MenuItemRole, roleForMenuItem } from "./menu-item.options.js";
export { MenuItemRole, roleForMenuItem };
/**
 * A Switch Custom HTML Element.
 * Implements {@link https://www.w3.org/TR/wai-aria-1.1/#menuitem | ARIA menuitem }, {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemcheckbox | ARIA menuitemcheckbox}, or {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemradio | ARIA menuitemradio }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot radio-indicator - The radio indicator
 * @slot start - Content which can be provided before the menu item content
 * @slot end - Content which can be provided after the menu item content
 * @slot - The default slot for menu item content
 * @slot expand-collapse-indicator - The expand/collapse indicator
 * @slot submenu - Used to nest menu's within menu items
 * @csspart input-container - The element representing the visual checked or radio indicator
 * @csspart checkbox - The element wrapping the `menuitemcheckbox` indicator
 * @csspart radio - The element wrapping the `menuitemradio` indicator
 * @csspart content - The element wrapping the menu item content
 * @csspart expand-collapse-glyph-container - The element wrapping the expand collapse element
 * @csspart expand-collapse - The expand/collapse element
 * @csspart submenu-region - The container for the submenu, used for positioning
 * @fires expanded-change - Fires a custom 'expanded-change' event when the expanded state changes
 * @fires change - Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked
 *
 * @public
 */
export class FASTMenuItem extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * The role of the element.
         *
         * @public
         * @remarks
         * HTML Attribute: role
         */
        this.role = MenuItemRole.menuitem;
        /**
         * The checked value of the element.
         *
         * @public
         * @remarks
         * HTML Attribute: checked
         */
        this.checked = false;
        this.focusSubmenuOnLoad = false;
        /**
         * @internal
         */
        this.handleMenuItemKeyDown = (e) => {
            if (e.defaultPrevented) {
                return false;
            }
            switch (e.key) {
                case keyEnter:
                case keySpace:
                    this.invoke();
                    return false;
                case keyArrowRight:
                    //open/focus on submenu
                    this.expanded && this.submenu
                        ? this.submenu.focus()
                        : this.expandAndFocus();
                    return false;
                case keyEscape:
                    // close submenu
                    if (this.expanded) {
                        this.closeSubMenu();
                        return false;
                    }
                    break;
                case keyArrowLeft:
                    //close submenu
                    if (this.expanded) {
                        this.closeSubMenu();
                        return false;
                    }
            }
            return true;
        };
        /**
         * @internal
         */
        this.handleMenuItemClick = (e) => {
            if (e.defaultPrevented || this.disabled) {
                return false;
            }
            this.invoke();
            return false;
        };
        /**
         * @internal
         */
        this.submenuLoaded = () => {
            if (!this.focusSubmenuOnLoad) {
                return;
            }
            this.focusSubmenuOnLoad = false;
            if (this.submenu) {
                this.submenu.focus();
                this.setAttribute("tabindex", "-1");
            }
        };
        /**
         * @internal
         */
        this.handleMouseOver = (e) => {
            if (this.disabled || !this.hasSubmenu || this.expanded) {
                return false;
            }
            this.expanded = true;
            return false;
        };
        /**
         * @internal
         */
        this.handleMouseOut = (e) => {
            if (!this.expanded || this.contains(document.activeElement)) {
                return false;
            }
            this.expanded = false;
            return false;
        };
        /**
         * @internal
         */
        this.closeSubMenu = () => {
            // close submenu
            this.expanded = false;
            this.focus();
        };
        /**
         * @internal
         */
        this.expandAndFocus = () => {
            if (!this.hasSubmenu) {
                return;
            }
            this.focusSubmenuOnLoad = true;
            this.expanded = true;
        };
        /**
         * @internal
         */
        this.invoke = () => {
            if (this.disabled) {
                return;
            }
            switch (this.role) {
                case MenuItemRole.menuitemcheckbox:
                    this.checked = !this.checked;
                    break;
                case MenuItemRole.menuitem:
                    if (this.hasSubmenu) {
                        this.expandAndFocus();
                        break;
                    }
                    this.$emit("change");
                    break;
                case MenuItemRole.menuitemradio:
                    if (!this.checked) {
                        this.checked = true;
                    }
                    break;
            }
        };
    }
    expandedChanged(prev, next) {
        if (this.$fastController.isConnected) {
            if (next && this.submenu) {
                this.updateSubmenu();
            }
            this.$emit("expanded-change", this, { bubbles: false });
        }
    }
    checkedChanged(oldValue, newValue) {
        if (this.$fastController.isConnected) {
            this.$emit("change");
        }
    }
    /**
     * @internal
     */
    get hasSubmenu() {
        return !!this.submenu;
    }
    /**
     * Sets the submenu and updates its position.
     *
     * @internal
     */
    slottedSubmenuChanged(prev, next) {
        if (next.length) {
            this.submenu = next[0];
            this.updateSubmenu();
        }
    }
    /**
     * @internal
     */
    disconnectedCallback() {
        var _a;
        (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
        super.disconnectedCallback();
    }
    /**
     * Calculate and apply submenu positioning.
     *
     * @public
     */
    updateSubmenu() {
        var _a;
        (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
        if (!this.submenu || !this.expanded) {
            return;
        }
        Updates.enqueue(() => {
            this.cleanup = autoUpdate(this, this.submenuContainer, () => __awaiter(this, void 0, void 0, function* () {
                const fallbackPlacements = ["left-start", "right-start"];
                const { x, y } = yield computePosition(this, this.submenuContainer, {
                    middleware: [
                        shift(),
                        size({
                            apply: ({ availableWidth, rects }) => {
                                if (availableWidth < rects.floating.width) {
                                    fallbackPlacements.push("bottom-end", "top-end");
                                }
                            },
                        }),
                        flip({ fallbackPlacements }),
                    ],
                    placement: "right-start",
                    strategy: "fixed",
                });
                Object.assign(this.submenuContainer.style, {
                    left: `${x}px`,
                    position: "fixed",
                    top: `${y}px`,
                });
                this.submenuLoaded();
            }));
        });
    }
}
__decorate([
    attr({ mode: "boolean" })
], FASTMenuItem.prototype, "disabled", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTMenuItem.prototype, "expanded", void 0);
__decorate([
    attr
], FASTMenuItem.prototype, "role", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTMenuItem.prototype, "checked", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTMenuItem.prototype, "hidden", void 0);
__decorate([
    observable
], FASTMenuItem.prototype, "slottedSubmenu", void 0);
__decorate([
    observable
], FASTMenuItem.prototype, "submenu", void 0);
applyMixins(FASTMenuItem, StartEnd);
