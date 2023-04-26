import type { StaticallyComposableHTML } from "../utilities/template-helpers.js";
import { DelegatesARIALink, FASTAnchor } from "../anchor/anchor.js";
import { StartEnd } from "../patterns/start-end.js";
import type { StartEndOptions } from "../patterns/start-end.js";
/**
 * Breadcrumb Item configuration options
 * @public
 */
export type BreadcrumbItemOptions = StartEndOptions<FASTBreadcrumbItem> & {
    separator?: StaticallyComposableHTML<FASTBreadcrumbItem>;
};
/**
 * A Breadcrumb Item Custom HTML Element.
 *
 * @slot start - Content which can be provided before the breadcrumb content
 * @slot end - Content which can be provided after the breadcrumb content
 * @slot - The default slot for when no href is provided or for providing your own custom elements
 * @slot separator - The slot for providing a custom separator
 * @csspart listitem - The wrapping container for the item, represents a semantic listitem
 * @csspart separator - The wrapping element for the separator
 *
 * @public
 */
export declare class FASTBreadcrumbItem extends FASTAnchor {
    /**
     * @internal
     */
    separator: boolean;
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface FASTBreadcrumbItem extends StartEnd, DelegatesARIALink {
}
