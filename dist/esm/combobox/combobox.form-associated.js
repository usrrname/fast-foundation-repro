import { FormAssociated } from "../form-associated/form-associated.js";
import { FASTListbox } from "../listbox/listbox.js";
class _Combobox extends FASTListbox {
}
/**
 * A form-associated base class for the {@link (Combobox:class)} component.
 *
 * @beta
 */
export class FormAssociatedCombobox extends FormAssociated(_Combobox) {
    constructor() {
        super(...arguments);
        this.proxy = document.createElement("input");
    }
}
