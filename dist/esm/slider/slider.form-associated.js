import { FASTElement } from "@microsoft/fast-element";
import { FormAssociated } from "../form-associated/form-associated.js";
class _Slider extends FASTElement {
}
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Slider:class)} component.
 *
 * @beta
 */
export class FormAssociatedSlider extends FormAssociated(_Slider) {
    constructor() {
        super(...arguments);
        this.proxy = document.createElement("input");
    }
}
