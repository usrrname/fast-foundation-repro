import { __decorate } from "tslib";
import { observable } from "@microsoft/fast-element";
import { keySpace } from "@microsoft/fast-web-utilities";
import { FormAssociatedCheckbox } from "./checkbox.form-associated.js";
/**
 * A Checkbox Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#checkbox | ARIA checkbox }.
 *
 * @slot checked-indicator - The checked indicator
 * @slot indeterminate-indicator - The indeterminate indicator
 * @slot - The default slot for the label
 * @csspart control - The element representing the visual checkbox control
 * @csspart label - The label
 * @fires change - Emits a custom change event when the checked state changes
 *
 * @public
 */
export class FASTCheckbox extends FormAssociatedCheckbox {
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
         * The indeterminate state of the control
         */
        this.indeterminate = false;
        /**
         * @internal
         */
        this.keypressHandler = (e) => {
            if (this.disabled) {
                return;
            }
            switch (e.key) {
                case keySpace:
                    this.toggleChecked();
                    break;
            }
        };
        /**
         * @internal
         */
        this.clickHandler = (e) => {
            if (!this.disabled) {
                this.toggleChecked();
            }
        };
        this.proxy.setAttribute("type", "checkbox");
    }
    toggleChecked() {
        if (this.indeterminate) {
            this.indeterminate = false;
        }
        this.checked = !this.checked;
    }
}
__decorate([
    observable
], FASTCheckbox.prototype, "defaultSlottedNodes", void 0);
__decorate([
    observable
], FASTCheckbox.prototype, "indeterminate", void 0);
