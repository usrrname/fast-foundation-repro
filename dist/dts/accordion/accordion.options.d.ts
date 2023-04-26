import type { ValuesOf } from "../utilities/index.js";
/**
 * Expand mode for {@link FASTAccordion}
 * @public
 */
export declare const AccordionExpandMode: {
    /**
     * Designates only a single {@link @microsoft/fast-foundation#(FASTAccordionItem:class) } can be open a time.
     */
    readonly single: "single";
    /**
     * Designates multiple {@link @microsoft/fast-foundation#(FASTAccordionItem:class) | FASTAccordionItemItems} can be open simultaneously.
     */
    readonly multi: "multi";
};
/**
 * Type for the {@link FASTAccordion} Expand Mode
 * @public
 */
export type AccordionExpandMode = ValuesOf<typeof AccordionExpandMode>;
