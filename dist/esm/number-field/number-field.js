import { __decorate } from "tslib";
import { attr, nullableNumberConverter, observable, Updates, } from "@microsoft/fast-element";
import { keyArrowDown, keyArrowUp } from "@microsoft/fast-web-utilities";
import { StartEnd } from "../patterns/start-end.js";
import { applyMixins } from "../utilities/apply-mixins.js";
import { DelegatesARIATextbox } from "../text-field/text-field.js";
import { FormAssociatedNumberField } from "./number-field.form-associated.js";
/**
 * A Number Field Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number | <input type="number" /> element }.
 *
 * @slot start - Content which can be provided before the number field input
 * @slot end - Content which can be provided after the number field input
 * @slot - The default slot for the label
 * @slot step-up-glyph - The glyph for the step up control
 * @slot step-down-glyph - The glyph for the step down control
 * @csspart label - The label
 * @csspart root - The element wrapping the control, including start and end slots
 * @csspart control - The element representing the input
 * @csspart controls - The step up and step down controls
 * @csspart step-up - The step up control
 * @csspart step-down - The step down control
 * @fires input - Fires a custom 'input' event when the value has changed
 * @fires change - Fires a custom 'change' event when the value has changed
 *
 * @public
 */
export class FASTNumberField extends FormAssociatedNumberField {
    constructor() {
        super(...arguments);
        /**
         * When true, spin buttons will not be rendered
         * @public
         * @remarks
         * HTML Attribute: autofocus
         */
        this.hideStep = false;
        /**
         * Amount to increment or decrement the value by
         * @public
         * @remarks
         * HTMLAttribute: step
         */
        this.step = 1;
        /**
         * Flag to indicate that the value change is from the user input
         * @internal
         */
        this.isUserInput = false;
    }
    /**
     * Ensures that the max is greater than the min and that the value
     *  is less than the max
     * @param previous - the previous max value
     * @param next - updated max value
     *
     * @internal
     */
    maxChanged(previous, next) {
        var _a;
        this.max = Math.max(next, (_a = this.min) !== null && _a !== void 0 ? _a : next);
        const min = Math.min(this.min, this.max);
        if (this.min !== undefined && this.min !== min) {
            this.min = min;
        }
        this.value = this.getValidValue(this.value);
    }
    /**
     * Ensures that the min is less than the max and that the value
     *  is greater than the min
     * @param previous - previous min value
     * @param next - updated min value
     *
     * @internal
     */
    minChanged(previous, next) {
        var _a;
        this.min = Math.min(next, (_a = this.max) !== null && _a !== void 0 ? _a : next);
        const max = Math.max(this.min, this.max);
        if (this.max !== undefined && this.max !== max) {
            this.max = max;
        }
        this.value = this.getValidValue(this.value);
    }
    /**
     * The value property, typed as a number.
     *
     * @public
     */
    get valueAsNumber() {
        return parseFloat(super.value);
    }
    set valueAsNumber(next) {
        this.value = next.toString();
    }
    /**
     * Validates that the value is a number between the min and max
     * @param previous - previous stored value
     * @param next - value being updated
     * @param updateControl - should the text field be updated with value, defaults to true
     * @internal
     */
    valueChanged(previous, next) {
        var _a;
        const value = this.getValidValue(next);
        if (next !== value) {
            this.value = value;
            return;
        }
        if (this.$fastController.isConnected && ((_a = this.control) === null || _a === void 0 ? void 0 : _a.value) !== value) {
            this.control.value = this.value;
        }
        super.valueChanged(previous, this.value);
        if (previous !== undefined && !this.isUserInput) {
            this.$emit("input");
            this.$emit("change");
        }
        this.isUserInput = false;
    }
    /** {@inheritDoc (FormAssociated:interface).validate} */
    validate() {
        super.validate(this.control);
    }
    /**
     * Sets the internal value to a valid number between the min and max properties
     * @param value - user input
     *
     * @internal
     */
    getValidValue(value) {
        var _a, _b;
        let validValue = parseFloat(parseFloat(value).toPrecision(12));
        if (isNaN(validValue)) {
            validValue = "";
        }
        else {
            validValue = Math.min(validValue, (_a = this.max) !== null && _a !== void 0 ? _a : validValue);
            validValue = Math.max(validValue, (_b = this.min) !== null && _b !== void 0 ? _b : validValue).toString();
        }
        return validValue;
    }
    /**
     * Increments the value using the step value
     *
     * @public
     */
    stepUp() {
        const value = parseFloat(this.value);
        const stepUpValue = !isNaN(value)
            ? value + this.step
            : this.min > 0
                ? this.min
                : this.max < 0
                    ? this.max
                    : !this.min
                        ? this.step
                        : 0;
        this.value = stepUpValue.toString();
    }
    /**
     * Decrements the value using the step value
     *
     * @public
     */
    stepDown() {
        const value = parseFloat(this.value);
        const stepDownValue = !isNaN(value)
            ? value - this.step
            : this.min > 0
                ? this.min
                : this.max < 0
                    ? this.max
                    : !this.min
                        ? 0 - this.step
                        : 0;
        this.value = stepDownValue.toString();
    }
    /**
     * Sets up the initial state of the number field
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.proxy.setAttribute("type", "number");
        this.validate();
        this.control.value = this.value;
        if (this.autofocus) {
            Updates.enqueue(() => {
                this.focus();
            });
        }
    }
    /**
     * Selects all the text in the number field
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
        this.control.value = this.control.value.replace(/[^0-9\-+e.]/g, "");
        this.isUserInput = true;
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
    /**
     * Handles the internal control's `keydown` event
     * @internal
     */
    handleKeyDown(e) {
        const key = e.key;
        switch (key) {
            case keyArrowUp:
                this.stepUp();
                return false;
            case keyArrowDown:
                this.stepDown();
                return false;
        }
        return true;
    }
    /**
     * Handles populating the input field with a validated value when
     *  leaving the input field.
     * @internal
     */
    handleBlur() {
        this.control.value = this.value;
    }
}
__decorate([
    attr({ attribute: "readonly", mode: "boolean" })
], FASTNumberField.prototype, "readOnly", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTNumberField.prototype, "autofocus", void 0);
__decorate([
    attr({ attribute: "hide-step", mode: "boolean" })
], FASTNumberField.prototype, "hideStep", void 0);
__decorate([
    attr
], FASTNumberField.prototype, "placeholder", void 0);
__decorate([
    attr
], FASTNumberField.prototype, "list", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTNumberField.prototype, "maxlength", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTNumberField.prototype, "minlength", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTNumberField.prototype, "size", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTNumberField.prototype, "step", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTNumberField.prototype, "max", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTNumberField.prototype, "min", void 0);
__decorate([
    observable
], FASTNumberField.prototype, "defaultSlottedNodes", void 0);
applyMixins(FASTNumberField, StartEnd, DelegatesARIATextbox);
