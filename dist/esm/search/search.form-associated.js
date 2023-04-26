import { FASTElement } from "@microsoft/fast-element";
import { FormAssociated } from "../form-associated/form-associated.js";
class _Search extends FASTElement {
}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(FASTSearch:class)} component.
 *
 * @beta
 */
export class FormAssociatedSearch extends FormAssociated(_Search) {
    constructor() {
        super(...arguments);
        this.proxy = document.createElement("input");
    }
}
