import { elements, html, slotted } from "@microsoft/fast-element";
/**
 * Creates a template for the {@link @microsoft/fast-foundation#FASTAccordion} component.
 * @public
 */
export function accordionTemplate() {
    return html `
        <template>
            <slot
                ${slotted({ property: "slottedAccordionItems", filter: elements() })}
            ></slot>
        </template>
    `;
}
