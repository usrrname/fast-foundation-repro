import { FormAssociated } from "../form-associated/form-associated.js";
import { FASTListbox } from "../listbox/listbox.js";
declare class _Combobox extends FASTListbox {
}
interface _Combobox extends FormAssociated {
}
declare const FormAssociatedCombobox_base: typeof _Combobox;
/**
 * A form-associated base class for the {@link (Combobox:class)} component.
 *
 * @beta
 */
export declare class FormAssociatedCombobox extends FormAssociatedCombobox_base {
    proxy: HTMLInputElement;
}
export {};
