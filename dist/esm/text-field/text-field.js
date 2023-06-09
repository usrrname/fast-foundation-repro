import { __decorate } from "tslib";
import { attr, nullableNumberConverter, observable, Updates, } from "@microsoft/fast-element";
import { ARIAGlobalStatesAndProperties, StartEnd } from "../patterns/index.js";
import { applyMixins } from "../utilities/apply-mixins.js";
import { FormAssociatedTextField } from "./text-field.form-associated.js";
import { TextFieldType } from "./text-field.options.js";
export { TextFieldType };
/**
 * A Text Field Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text | <input type="text" /> element }.
 *
 * @slot start - Content which can be provided before the number field input
 * @slot end - Content which can be provided after the number field input
 * @slot - The default slot for the label
 * @csspart label - The label
 * @csspart root - The element wrapping the control, including start and end slots
 * @csspart control - The text field element
 * @fires change - Fires a custom 'change' event when the value has changed
 *
 * @public
 */
export class FASTTextField extends FormAssociatedTextField {
    constructor() {
        super(...arguments);
        /**
         * Allows setting a type or mode of text.
         * @public
         * @remarks
         * HTML Attribute: type
         */
        this.type = TextFieldType.text;
    }
    readOnlyChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.readOnly = this.readOnly;
            this.validate();
        }
    }
    autofocusChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.autofocus = this.autofocus;
            this.validate();
        }
    }
    placeholderChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.placeholder = this.placeholder;
        }
    }
    typeChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.type = this.type;
            this.validate();
        }
    }
    listChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.setAttribute("list", this.list);
            this.validate();
        }
    }
    maxlengthChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.maxLength = this.maxlength;
            this.validate();
        }
    }
    minlengthChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.minLength = this.minlength;
            this.validate();
        }
    }
    patternChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.pattern = this.pattern;
            this.validate();
        }
    }
    sizeChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.size = this.size;
        }
    }
    spellcheckChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.spellcheck = this.spellcheck;
        }
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.proxy.setAttribute("type", this.type);
        this.validate();
        if (this.autofocus) {
            Updates.enqueue(() => {
                this.focus();
            });
        }
    }
    /**
     * Selects all the text in the text field
     *
     * @public
     */
    select() {
        this.control.select();
        /**
         * The select event does not permeate the shadow DOM boundary.
         * This fn effectively proxies the select event,
         * emitting a `select` event whenever the internal
         * control emits a `select` event
         */
        this.$emit("select");
    }
    /**
     * Handles the internal control's `input` event
     * @internal
     */
    handleTextInput() {
        this.value = this.control.value;
    }
    /**
     * Change event handler for inner control.
     * @remarks
     * "Change" events are not `composable` so they will not
     * permeate the shadow DOM boundary. This fn effectively proxies
     * the change event, emitting a `change` event whenever the internal
     * control emits a `change` event
     * @internal
     */
    handleChange() {
        this.$emit("change");
    }
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate() {
        super.validate(this.control);
    }
}
__decorate([
    attr({ attribute: "readonly", mode: "boolean" })
], FASTTextField.prototype, "readOnly", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTTextField.prototype, "autofocus", void 0);
__decorate([
    attr
], FASTTextField.prototype, "placeholder", void 0);
__decorate([
    attr
], FASTTextField.prototype, "type", void 0);
__decorate([
    attr
], FASTTextField.prototype, "list", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTTextField.prototype, "maxlength", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTTextField.prototype, "minlength", void 0);
__decorate([
    attr
], FASTTextField.prototype, "pattern", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTTextField.prototype, "size", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTTextField.prototype, "spellcheck", void 0);
__decorate([
    observable
], FASTTextField.prototype, "defaultSlottedNodes", void 0);
/**
 * Includes ARIA states and properties relating to the ARIA textbox role
 *
 * @public
 */
export class DelegatesARIATextbox {
}
applyMixins(DelegatesARIATextbox, ARIAGlobalStatesAndProperties);
applyMixins(FASTTextField, StartEnd, DelegatesARIATextbox);
