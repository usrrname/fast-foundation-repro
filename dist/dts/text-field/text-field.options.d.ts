import type { ValuesOf } from "../utilities/index.js";
/**
 * Text field sub-types
 * @public
 */
export declare const TextFieldType: {
    /**
     * An email TextField
     */
    readonly email: "email";
    /**
     * A password TextField
     */
    readonly password: "password";
    /**
     * A telephone TextField
     */
    readonly tel: "tel";
    /**
     * A text TextField
     */
    readonly text: "text";
    /**
     * A URL TextField
     */
    readonly url: "url";
};
/**
 * Types for the text field sub-types
 * @public
 */
export type TextFieldType = ValuesOf<typeof TextFieldType>;
