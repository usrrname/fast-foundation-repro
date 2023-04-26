import { FASTElement } from "@microsoft/fast-element";
import { CheckableFormAssociated } from "../form-associated/form-associated.js";
declare class _Radio extends FASTElement {
}
interface _Radio extends CheckableFormAssociated {
}
declare const FormAssociatedRadio_base: typeof _Radio;
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(FASTRadio:class)} component.
 *
 * @beta
 */
export declare class FormAssociatedRadio extends FormAssociatedRadio_base {
    proxy: HTMLInputElement;
}
export {};
