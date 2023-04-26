import { FASTElement } from "@microsoft/fast-element";
import { FormAssociated } from "../form-associated/form-associated.js";
declare class _Picker extends FASTElement {
}
interface _Picker extends FormAssociated {
}
declare const FormAssociatedPicker_base: typeof _Picker;
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(FASTPicker:class)} component.
 *
 * @beta
 */
export declare class FormAssociatedPicker extends FormAssociatedPicker_base {
    proxy: HTMLInputElement;
}
export {};
