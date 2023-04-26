import { FASTElement } from "@microsoft/fast-element";
import { FormAssociated } from "../form-associated/form-associated.js";
declare class _Search extends FASTElement {
}
interface _Search extends FormAssociated {
}
declare const FormAssociatedSearch_base: typeof _Search;
/**
 * A form-associated base class for the {@link @microsoft/fast-foundation#(FASTSearch:class)} component.
 *
 * @beta
 */
export declare class FormAssociatedSearch extends FormAssociatedSearch_base {
    proxy: HTMLInputElement;
}
export {};
