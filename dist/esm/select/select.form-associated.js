import { FASTListboxElement } from "../listbox/listbox.element.js";
import { FormAssociated } from "../form-associated/form-associated.js";
class _Select extends FASTListboxElement {
}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Select:class)} component.
 *
 * @beta
 */
export class FormAssociatedSelect extends FormAssociated(_Select) {
    constructor() {
        super(...arguments);
        this.proxy = document.createElement("select");
    }
}
