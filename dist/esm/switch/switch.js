import { __decorate } from "tslib";
import { attr, observable } from "@microsoft/fast-element";
import { keyEnter, keySpace } from "@microsoft/fast-web-utilities";
import { FormAssociatedSwitch } from "./switch.form-associated.js";
/**
 * A Switch Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#switch | ARIA switch }.
 *
 * @slot - The deafult slot for the label
 * @slot checked-message - The message when in a checked state
 * @slot unchecked-message - The message when in an unchecked state
 * @csspart label - The label
 * @csspart switch - The element representing the switch, which wraps the indicator
 * @csspart status-message - The wrapper for the status messages
 * @csspart checked-message - The checked message
 * @csspart unchecked-message - The unchecked message
 * @fires change - Emits a custom change event when the checked state changes
 *
 * @public
 */
export class FASTSwitch extends FormAssociatedSwitch {
    readOnlyChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.readOnly = this.readOnly;
        }
    }
    constructor() {
        super();
        /**
         * The element's value to be included in form submission when checked.
         * Default to "on" to reach parity with input[type="checkbox"]
         *
         * @internal
         */
        this.initialValue = "on";
        /**
         * @internal
         */
        this.keypressHandler = (e) => {
            if (this.readOnly) {
                return;
            }
            switch (e.key) {
                case keyEnter:
                case keySpace:
                    this.checked = !this.checked;
                    break;
            }
        };
        /**
         * @internal
         */
        this.clickHandler = (e) => {
            if (!this.disabled && !this.readOnly) {
                this.checked = !this.checked;
            }
        };
        this.proxy.setAttribute("type", "checkbox");
    }
}
__decorate([
    attr({ attribute: "readonly", mode: "boolean" })
], FASTSwitch.prototype, "readOnly", void 0);
__decorate([
    observable
], FASTSwitch.prototype, "defaultSlottedNodes", void 0);
