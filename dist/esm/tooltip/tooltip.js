import { __awaiter, __decorate } from "tslib";
import { autoUpdate, computePosition, flip, shift } from "@floating-ui/dom";
import { attr, css, FASTElement, nullableBooleanConverter, observable, Updates, } from "@microsoft/fast-element";
import { keyEscape, uniqueId } from "@microsoft/fast-web-utilities";
import { TooltipPlacement } from "./tooltip.options.js";
/**
 * A Tooltip Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.2/#tooltip | ARIA tooltip }.
 *
 * @slot - The default slot for the tooltip content
 * @fires dismiss - Fires a custom 'dismiss' event when the tooltip is visible and escape key is pressed
 *
 * @public
 */
export class FASTTooltip extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * The visibility of the tooltip.
         *
         * @internal
         */
        this._visible = false;
        /**
         * Indicates if the tooltip visibility is controlled by the `visible` attribute.
         *
         * When `true`, the tooltip visibility is controlled by the `visible` attribute.
         * When `false`, the tooltip visibility is controlled by the `mouseover` and `focusin` events on the anchor element.
         *
         * @internal
         */
        this.controlledVisibility = false;
        /**
         * Hides the tooltip when the anchor element loses focus.
         *
         * @internal
         */
        this.focusoutAnchorHandler = () => {
            if (!this.controlledVisibility && this._visible) {
                this.hideTooltip();
            }
        };
        /**
         * Shows the tooltip when the anchor element gains focus.
         *
         * @internal
         */
        this.focusinAnchorHandler = () => {
            if (!this.controlledVisibility && !this._visible) {
                this.showTooltip();
            }
        };
        /**
         * Hides the tooltip when the `Escape` key is pressed.
         *
         * @param e - the keyboard event
         *
         * @internal
         */
        this.keydownDocumentHandler = (e) => {
            if (!e.defaultPrevented && this.visible) {
                switch (e.key) {
                    case keyEscape: {
                        this.dismiss();
                        break;
                    }
                }
            }
        };
        /**
         * Shows the tooltip when the mouse is over the anchor element.
         *
         * @internal
         */
        this.mouseoverAnchorHandler = () => {
            var _a;
            if (!((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.isSameNode(this.anchorElement))) {
                this.showTooltip();
            }
        };
        /**
         * Hides the tooltip when the mouse leaves the anchor element.
         *
         * @internal
         */
        this.mouseoutAnchorHandler = (e) => {
            var _a;
            if (!((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.isSameNode(this.anchorElement)) &&
                !this.isSameNode(e.relatedTarget)) {
                this.hideTooltip();
            }
        };
        /**
         * The placement of the tooltip relative to the anchor element.
         *
         * @public
         * @remarks
         * HTML Attribute: `placement`
         */
        this.placement = TooltipPlacement.bottom;
    }
    /**
     * Removes listeners from the previous anchor element and updates the anchor element reference.
     *
     * @param prev - the previous anchor string
     * @param next - the current anchor string
     *
     * @internal
     */
    anchorChanged(prev, next) {
        if (this.$fastController.isConnected) {
            this.removeListeners();
            this.removeAnchorAriaDescribedBy(this.id);
            this.anchorElement = this.getAnchorElement(next);
            this.addAnchorAriaDescribedBy();
            if (!this.controlledVisibility) {
                this.addListeners();
            }
        }
    }
    /**
     * Switches between controlled and uncontrolled visibility.
     *
     * @param prev - the previous forced visibility state
     * @param next - the current forced visibility state
     * @internal
     */
    controlledVisibilityChanged(prev, next) {
        if (!next) {
            this.addListeners();
            this.hideTooltip();
            return;
        }
        this.removeListeners();
    }
    idChanged(prev, next) {
        this.removeAnchorAriaDescribedBy(prev);
        Updates.enqueue(() => {
            this.addAnchorAriaDescribedBy();
        });
    }
    /**
     * Updates the styles for the tooltip position.
     *
     * @param prev - the previous placement styles
     * @param next - the current placement styles
     *
     * @internal
     */
    positionStylesChanged(prev, next) {
        this.$fastController.removeStyles(prev);
        this.$fastController.addStyles(next);
    }
    showChanged(prev, next) {
        this.visible = next;
    }
    /**
     * Returns the current visibility of the tooltip.
     * @public
     */
    get visible() {
        return this._visible;
    }
    /**
     * Sets the forced visibility state and shows or hides the tooltip.
     *
     * @internal
     */
    set visible(value) {
        this.controlledVisibility = typeof value === "boolean";
        if (this.controlledVisibility) {
            this.show = value;
        }
        if (value) {
            this.showTooltip();
            return;
        }
        this.hideTooltip();
    }
    /**
     * Adds the `id` of the tooltip to the `aria-describedby` attribute of the anchor element.
     *
     * @internal
     */
    addAnchorAriaDescribedBy() {
        var _a;
        if (!this.id) {
            this.id = uniqueId("tooltip-");
            return;
        }
        if (!this.anchorElement) {
            return;
        }
        const anchorElementDescribedBy = (_a = this.anchorElement
            .getAttribute("aria-describedby")) === null || _a === void 0 ? void 0 : _a.concat(" ", this.id).trim();
        if (anchorElementDescribedBy) {
            this.anchorElement.setAttribute("aria-describedby", anchorElementDescribedBy);
        }
    }
    /**
     * Adds event listeners to the anchor element, the tooltip element, and the document.
     *
     * @internal
     */
    addListeners() {
        if (!this.anchorElement) {
            return;
        }
        this.anchorElement.addEventListener("focusin", this.focusinAnchorHandler);
        this.anchorElement.addEventListener("focusout", this.focusoutAnchorHandler);
        this.anchorElement.addEventListener("mouseout", this.mouseoutAnchorHandler);
        this.anchorElement.addEventListener("mouseover", this.mouseoverAnchorHandler);
        this.addEventListener("mouseout", this.mouseoutAnchorHandler);
        this.addEventListener("mouseover", this.mouseoverAnchorHandler);
        document.addEventListener("keydown", this.keydownDocumentHandler);
    }
    connectedCallback() {
        super.connectedCallback();
        this.anchorChanged(undefined, this.anchor);
    }
    /**
     * Hides the tooltip and emits a custom `dismiss` event.
     *
     * @internal
     */
    dismiss() {
        this.hideTooltip();
        this.$emit("dismiss");
    }
    /**
     * Hides the tooltip.
     *
     * @internal
     */
    hideTooltip() {
        var _a;
        this._visible = false;
        (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    /**
     * Gets the anchor element by id.
     *
     * @param id - the id of the anchor element
     *
     * @internal
     */
    getAnchorElement(id = "") {
        const rootNode = this.getRootNode();
        if (rootNode instanceof ShadowRoot) {
            return rootNode.getElementById(id);
        }
        return document.getElementById(id);
    }
    /**
     * Removes the `id` of the tooltip from the `aria-describedby` attribute of the anchor element.
     *
     * @param id - the id of the tooltip
     *
     * @internal
     */
    removeAnchorAriaDescribedBy(id) {
        var _a;
        if (this.anchorElement) {
            const anchorElementDescribedBy = (_a = this.anchorElement
                .getAttribute("aria-describedby")) === null || _a === void 0 ? void 0 : _a.split(" ");
            this.anchorElement.setAttribute("aria-describedby", (anchorElementDescribedBy !== null && anchorElementDescribedBy !== void 0 ? anchorElementDescribedBy : []).filter(i => i !== id).join(" "));
            if (this.anchorElement.getAttribute("aria-describedby") === "") {
                this.anchorElement.removeAttribute("aria-describedby");
            }
        }
    }
    /**
     * Removes event listeners from the anchor element, the tooltip element, and the document.
     *
     * @internal
     */
    removeListeners() {
        if (!this.anchorElement) {
            return;
        }
        this.anchorElement.removeEventListener("focusin", this.focusinAnchorHandler);
        this.anchorElement.removeEventListener("focusout", this.focusoutAnchorHandler);
        this.anchorElement.removeEventListener("mouseout", this.mouseoutAnchorHandler);
        this.anchorElement.removeEventListener("mouseover", this.mouseoverAnchorHandler);
        this.removeEventListener("mouseout", this.mouseoutAnchorHandler);
        this.removeEventListener("mouseover", this.mouseoverAnchorHandler);
        document.removeEventListener("keydown", this.keydownDocumentHandler);
    }
    /**
     * Sets the tooltip position.
     *
     * @public
     */
    setPositioning() {
        var _a;
        (_a = this.cleanup) === null || _a === void 0 ? void 0 : _a.call(this);
        if (!this.anchorElement) {
            this.hideTooltip();
            return;
        }
        const anchorElement = this.anchorElement;
        this.cleanup = autoUpdate(anchorElement, this, () => __awaiter(this, void 0, void 0, function* () {
            const middleware = [shift()];
            if (!this.placement) {
                middleware.unshift(flip());
            }
            const { x, y } = yield computePosition(anchorElement, this, {
                placement: this.placement,
                strategy: "fixed",
                middleware,
            });
            this.positionStyles = css `
                :host {
                    position: fixed;
                    left: ${x.toString()}px;
                    top: ${y.toString()}px;
                }
            `;
        }));
    }
    /**
     * Shows the tooltip.
     *
     * @internal
     */
    showTooltip() {
        this._visible = true;
        Updates.enqueue(() => this.setPositioning());
    }
}
__decorate([
    observable
], FASTTooltip.prototype, "_visible", void 0);
__decorate([
    attr({ attribute: "anchor" })
], FASTTooltip.prototype, "anchor", void 0);
__decorate([
    observable
], FASTTooltip.prototype, "controlledVisibility", void 0);
__decorate([
    attr
], FASTTooltip.prototype, "id", void 0);
__decorate([
    attr
], FASTTooltip.prototype, "placement", void 0);
__decorate([
    observable
], FASTTooltip.prototype, "positionStyles", void 0);
__decorate([
    attr({
        attribute: "show",
        converter: nullableBooleanConverter,
        mode: "fromView",
    })
], FASTTooltip.prototype, "show", void 0);
