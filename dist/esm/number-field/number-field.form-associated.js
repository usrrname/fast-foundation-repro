import { FASTElement } from "@microsoft/fast-element";
import { FormAssociated } from "../form-associated/form-associated.js";
class _NumberField extends FASTElement {
}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(NumberField:class)} component.
 *
 * @beta
 */
export class FormAssociatedNumberField extends FormAssociated(_NumberField) {
    constructor() {
        super(...arguments);
        this.proxy = document.createElement("input");
    }
}
