import { elements, html, slotted } from "@microsoft/fast-element";
/**
 * The template for the {@link @microsoft/fast-foundation#FASTBreadcrumb} component.
 * @public
 */
export function breadcrumbTemplate() {
    return html `
        <template role="navigation">
            <div role="list" class="list" part="list">
                <slot
                    ${slotted({ property: "slottedBreadcrumbItems", filter: elements() })}
                ></slot>
            </div>
        </template>
    `;
}
