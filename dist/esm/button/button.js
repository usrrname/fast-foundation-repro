import { __decorate } from "tslib";
import { attr, observable } from "@microsoft/fast-element";
import { ARIAGlobalStatesAndProperties, StartEnd } from "../patterns/index.js";
import { applyMixins } from "../utilities/apply-mixins.js";
import { FormAssociatedButton } from "./button.form-associated.js";
import { ButtonType } from "./button.options.js";
/**
 * A Button Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element }.
 *
 * @slot start - Content which can be provided before the button content
 * @slot end - Content which can be provided after the button content
 * @slot - The default slot for button content
 * @csspart control - The button element
 * @csspart content - The element wrapping button content
 *
 * @public
 */
export class FASTButton extends FormAssociatedButton {
    constructor() {
        super(...arguments);
        /**
         * Submits the parent form
         */
        this.handleSubmission = () => {
            if (!this.form) {
                return;
            }
            const attached = this.proxy.isConnected;
            if (!attached) {
                this.attachProxy();
            }
            // Browser support for requestSubmit is not comprehensive
            // so click the proxy if it isn't supported
            typeof this.form.requestSubmit === "function"
                ? this.form.requestSubmit(this.proxy)
                : this.proxy.click();
            if (!attached) {
                this.detachProxy();
            }
        };
        /**
         * Resets the parent form
         */
        this.handleFormReset = () => {
            var _a;
            (_a = this.form) === null || _a === void 0 ? void 0 : _a.reset();
        };
    }
    formactionChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formAction = this.formaction;
        }
    }
    formenctypeChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formEnctype = this.formenctype;
        }
    }
    formmethodChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formMethod = this.formmethod;
        }
    }
    formnovalidateChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formNoValidate = this.formnovalidate;
        }
    }
    formtargetChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formTarget = this.formtarget;
        }
    }
    typeChanged(previous, next) {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.type = this.type;
        }
        next === ButtonType.submit &&
            this.addEventListener("click", this.handleSubmission);
        previous === ButtonType.submit &&
            this.removeEventListener("click", this.handleSubmission);
        next === ButtonType.reset && this.addEventListener("click", this.handleFormReset);
        previous === ButtonType.reset &&
            this.removeEventListener("click", this.handleFormReset);
    }
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate() {
        super.validate(this.control);
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.proxy.setAttribute("type", this.type);
    }
}
__decorate([
    attr({ mode: "boolean" })
], FASTButton.prototype, "autofocus", void 0);
__decorate([
    attr({ attribute: "form" })
], FASTButton.prototype, "formId", void 0);
__decorate([
    attr
], FASTButton.prototype, "formaction", void 0);
__decorate([
    attr
], FASTButton.prototype, "formenctype", void 0);
__decorate([
    attr
], FASTButton.prototype, "formmethod", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTButton.prototype, "formnovalidate", void 0);
__decorate([
    attr
], FASTButton.prototype, "formtarget", void 0);
__decorate([
    attr
], FASTButton.prototype, "type", void 0);
__decorate([
    observable
], FASTButton.prototype, "defaultSlottedContent", void 0);
/**
 * Includes ARIA states and properties relating to the ARIA button role
 *
 * @public
 */
export class DelegatesARIAButton {
}
__decorate([
    attr({ attribute: "aria-expanded" })
], DelegatesARIAButton.prototype, "ariaExpanded", void 0);
__decorate([
    attr({ attribute: "aria-pressed" })
], DelegatesARIAButton.prototype, "ariaPressed", void 0);
applyMixins(DelegatesARIAButton, ARIAGlobalStatesAndProperties);
applyMixins(FASTButton, StartEnd, DelegatesARIAButton);
