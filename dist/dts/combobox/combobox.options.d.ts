import type { ValuesOf } from "../utilities/index.js";
/**
 * Autocomplete values for combobox.
 * @public
 */
export declare const ComboboxAutocomplete: {
    readonly inline: "inline";
    readonly list: "list";
    readonly both: "both";
    readonly none: "none";
};
/**
 * Autocomplete type for combobox.
 * @public
 */
export type ComboboxAutocomplete = ValuesOf<typeof ComboboxAutocomplete>;
