import { FASTElement } from "@microsoft/fast-element";
import { CheckableFormAssociated } from "../form-associated/form-associated.js";
declare class _Switch extends FASTElement {
}
interface _Switch extends CheckableFormAssociated {
}
declare const FormAssociatedSwitch_base: typeof _Switch;
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(FASTSwitch:class)} component.
 *
 * @beta
 */
export declare class FormAssociatedSwitch extends FormAssociatedSwitch_base {
    proxy: HTMLInputElement;
}
export {};
