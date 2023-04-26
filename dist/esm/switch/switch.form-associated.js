import { FASTElement } from "@microsoft/fast-element";
import { CheckableFormAssociated } from "../form-associated/form-associated.js";
class _Switch extends FASTElement {
}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(FASTSwitch:class)} component.
 *
 * @beta
 */
export class FormAssociatedSwitch extends CheckableFormAssociated(_Switch) {
    constructor() {
        super(...arguments);
        this.proxy = document.createElement("input");
    }
}
