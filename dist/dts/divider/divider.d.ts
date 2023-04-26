import { FASTElement } from "@microsoft/fast-element";
import { DividerOrientation, DividerRole } from "./divider.options.js";
/**
 * A Divider Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#separator | ARIA separator } or {@link https://www.w3.org/TR/wai-aria-1.1/#presentation | ARIA presentation}.
 *
 * @public
 */
export declare class FASTDivider extends FASTElement {
    /**
     * The role of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: role
     */
    role: DividerRole;
    /**
     * The orientation of the divider.
     *
     * @public
     * @remarks
     * HTML Attribute: orientation
     */
    orientation: DividerOrientation;
}