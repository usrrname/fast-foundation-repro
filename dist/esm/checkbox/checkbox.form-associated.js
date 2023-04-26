import { FASTElement } from "@microsoft/fast-element";
import { CheckableFormAssociated } from "../form-associated/form-associated.js";
class _Checkbox extends FASTElement {
}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Checkbox:class)} component.
 *
 * @beta
 */
export class FormAssociatedCheckbox extends CheckableFormAssociated(_Checkbox) {
    constructor() {
        super(...arguments);
        this.proxy = document.createElement("input");
    }
}
