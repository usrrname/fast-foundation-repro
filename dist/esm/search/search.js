import { __decorate } from "tslib";
import { attr, nullableNumberConverter, observable, Updates, } from "@microsoft/fast-element";
import { ARIAGlobalStatesAndProperties, StartEnd } from "../patterns/index.js";
import { applyMixins } from "../utilities/apply-mixins.js";
import { FormAssociatedSearch } from "./search.form-associated.js";
/**
 * A Search Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search | <input type="search" /> element }.
 *
 * @slot start - Content which can be provided before the search input
 * @slot end - Content which can be provided after the search clear button
 * @slot - The default slot for the label
 * @slot clear-button - The clear button
 * @slot clear-glyph - The clear glyph
 * @csspart label - The label
 * @csspart root - The element wrapping the control, including start and end slots
 * @csspart control - The element representing the input
 * @csspart clear-button - The button to clear the input
 *
 * @public
 */
export class FASTSearch extends FormAssociatedSearch {
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
        this.validate();
        if (this.autofocus) {
            Updates.enqueue(() => {
                this.focus();
            });
        }
    }
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate() {
        super.validate(this.control);
    }
    /**
     * Handles the internal control's `input` event
     * @internal
     */
    handleTextInput() {
        this.value = this.control.value;
    }
    /**
     * Handles the control's clear value event
     * @public
     */
    handleClearInput() {
        this.value = "";
        this.control.focus();
        this.handleChange();
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
}
__decorate([
    attr({ attribute: "readonly", mode: "boolean" })
], FASTSearch.prototype, "readOnly", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTSearch.prototype, "autofocus", void 0);
__decorate([
    attr
], FASTSearch.prototype, "placeholder", void 0);
__decorate([
    attr
], FASTSearch.prototype, "list", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTSearch.prototype, "maxlength", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTSearch.prototype, "minlength", void 0);
__decorate([
    attr
], FASTSearch.prototype, "pattern", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTSearch.prototype, "size", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTSearch.prototype, "spellcheck", void 0);
__decorate([
    observable
], FASTSearch.prototype, "defaultSlottedNodes", void 0);
/**
 * Includes ARIA states and properties relating to the ARIA textbox role
 *
 * @public
 */
export class DelegatesARIASearch {
}
applyMixins(DelegatesARIASearch, ARIAGlobalStatesAndProperties);
applyMixins(FASTSearch, StartEnd, DelegatesARIASearch);
