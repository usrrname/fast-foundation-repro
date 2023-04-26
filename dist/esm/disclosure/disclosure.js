import { __decorate } from "tslib";
import { attr, FASTElement } from "@microsoft/fast-element";
import { StartEnd } from "../patterns/start-end.js";
import { applyMixins } from "../utilities/apply-mixins.js";
/**
 * A Disclosure Custom HTML Element.
 * Based largely on the {@link https://w3c.github.io/aria-practices/#disclosure | disclosure element }.
 *
 * @slot start - Content which can be provided before the summary content
 * @slot end - Content which can be provided after the summary content
 * @slot title - The summary content
 * @slot - The default slot for the disclosure content
 * @fires toggle - fires a toggle event when the summary is toggled
 *
 * @public
 */
export class FASTDisclosure extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * Determines if the element should show the extra content or not.
         *
         * @public
         */
        this.expanded = false;
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.setup();
    }
    /**
     * @internal
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.details.removeEventListener("toggle", this.onToggle);
    }
    /**
     * Show extra content.
     */
    show() {
        this.details.open = true;
    }
    /**
     * Hide extra content.
     */
    hide() {
        this.details.open = false;
    }
    /**
     * Toggle the current(expanded/collapsed) state.
     */
    toggle() {
        this.details.open = !this.details.open;
    }
    /**
     * Register listener and set default disclosure mode
     */
    setup() {
        this.onToggle = this.onToggle.bind(this);
        this.details.addEventListener("toggle", this.onToggle);
        if (this.expanded) {
            this.show();
        }
    }
    /**
     * Update the aria attr and fire `toggle` event
     */
    onToggle() {
        this.expanded = this.details.open;
        this.$emit("toggle");
    }
}
__decorate([
    attr({ mode: "boolean" })
], FASTDisclosure.prototype, "expanded", void 0);
__decorate([
    attr
], FASTDisclosure.prototype, "summary", void 0);
applyMixins(FASTDisclosure, StartEnd);
