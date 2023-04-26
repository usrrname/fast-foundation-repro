import { FASTListboxElement } from "../listbox/listbox.element.js";
import { FormAssociated } from "../form-associated/form-associated.js";
declare class _Select extends FASTListboxElement {
}
interface _Select extends FormAssociated {
}
declare const FormAssociatedSelect_base: typeof _Select;
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(Select:class)} component.
 *
 * @beta
 */
export declare class FormAssociatedSelect extends FormAssociatedSelect_base {
    proxy: HTMLSelectElement;
}
export {};
