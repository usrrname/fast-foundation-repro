import { FASTElement } from "@microsoft/fast-element";
import { FormAssociated } from "../form-associated/form-associated.js";
declare class _TextArea extends FASTElement {
}
interface _TextArea extends FormAssociated {
}
declare const FormAssociatedTextArea_base: typeof _TextArea;
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(FASTTextArea:class)} component.
 *
 * @beta
 */
export declare class FormAssociatedTextArea extends FormAssociatedTextArea_base {
    proxy: HTMLTextAreaElement;
}
export {};
