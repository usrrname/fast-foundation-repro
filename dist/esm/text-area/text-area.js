import { __decorate } from "tslib";
import { attr, nullableNumberConverter, observable } from "@microsoft/fast-element";
import { DelegatesARIATextbox } from "../text-field/text-field.js";
import { applyMixins } from "../utilities/apply-mixins.js";
import { FormAssociatedTextArea } from "./text-area.form-associated.js";
import { TextAreaResize } from "./text-area.options.js";
export { TextAreaResize };
/**
 * A Text Area Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea | <textarea> element }.
 *
 * @slot - The default slot for the label
 * @csspart label - The label
 * @csspart root - The element wrapping the control
 * @csspart control - The textarea element
 * @fires change - Emits a custom 'change' event when the textarea emits a change event
 *
 * @public
 */
export class FASTTextArea extends FormAssociatedTextArea {
    constructor() {
        super(...arguments);
        /**
         * The resize mode of the element.
         * @public
         * @remarks
         * HTML Attribute: resize
         */
        this.resize = TextAreaResize.none;
        /**
         * Sizes the element horizontally by a number of character columns.
         *
         * @public
         * @remarks
         * HTML Attribute: cols
         */
        this.cols = 20;
        /**
         * @internal
         */
        this.handleTextInput = () => {
            this.value = this.control.value;
        };
    }
    readOnlyChanged() {
        if (this.proxy instanceof HTMLTextAreaElement) {
            this.proxy.readOnly = this.readOnly;
        }
    }
    autofocusChanged() {
        if (this.proxy instanceof HTMLTextAreaElement) {
            this.proxy.autofocus = this.autofocus;
        }
    }
    listChanged() {
        if (this.proxy instanceof HTMLTextAreaElement) {
            this.proxy.setAttribute("list", this.list);
        }
    }
    maxlengthChanged() {
        if (this.proxy instanceof HTMLTextAreaElement) {
            this.proxy.maxLength = this.maxlength;
        }
    }
    minlengthChanged() {
        if (this.proxy instanceof HTMLTextAreaElement) {
            this.proxy.minLength = this.minlength;
        }
    }
    spellcheckChanged() {
        if (this.proxy instanceof HTMLTextAreaElement) {
            this.proxy.spellcheck = this.spellcheck;
        }
    }
    /**
     * Selects all the text in the text area
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
    attr({ mode: "boolean" })
], FASTTextArea.prototype, "readOnly", void 0);
__decorate([
    attr
], FASTTextArea.prototype, "resize", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTTextArea.prototype, "autofocus", void 0);
__decorate([
    attr({ attribute: "form" })
], FASTTextArea.prototype, "formId", void 0);
__decorate([
    attr
], FASTTextArea.prototype, "list", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTTextArea.prototype, "maxlength", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTTextArea.prototype, "minlength", void 0);
__decorate([
    attr
], FASTTextArea.prototype, "name", void 0);
__decorate([
    attr
], FASTTextArea.prototype, "placeholder", void 0);
__decorate([
    attr({ converter: nullableNumberConverter, mode: "fromView" })
], FASTTextArea.prototype, "cols", void 0);
__decorate([
    attr({ converter: nullableNumberConverter, mode: "fromView" })
], FASTTextArea.prototype, "rows", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTTextArea.prototype, "spellcheck", void 0);
__decorate([
    observable
], FASTTextArea.prototype, "defaultSlottedNodes", void 0);
applyMixins(FASTTextArea, DelegatesARIATextbox);
