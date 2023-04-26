import type { ValuesOf } from "../utilities/index.js";
/**
 * Button type values.
 *
 * @public
 */
export declare const ButtonType: {
    readonly submit: "submit";
    readonly reset: "reset";
    readonly button: "button";
};
/**
 * Type for button type values.
 *
 * @public
 */
export type ButtonType = ValuesOf<typeof ButtonType>;
