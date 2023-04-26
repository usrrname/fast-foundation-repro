import { FASTElement } from "@microsoft/fast-element";
import { FormAssociated } from "../form-associated/form-associated.js";
declare class _Button extends FASTElement {
}
interface _Button extends FormAssociated {
}
declare const FormAssociatedButton_base: typeof _Button;
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(FASTButton:class)} component.
 *
 * @beta
 */
export declare class FormAssociatedButton extends FormAssociatedButton_base {
    proxy: HTMLInputElement;
}
export {};
