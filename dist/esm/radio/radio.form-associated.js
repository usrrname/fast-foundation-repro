import { FASTElement } from "@microsoft/fast-element";
import { CheckableFormAssociated } from "../form-associated/form-associated.js";
class _Radio extends FASTElement {
}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(FASTRadio:class)} component.
 *
 * @beta
 */
export class FormAssociatedRadio extends CheckableFormAssociated(_Radio) {
    constructor() {
        super(...arguments);
        this.proxy = document.createElement("input");
    }
}
