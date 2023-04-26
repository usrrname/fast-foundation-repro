import { ElementViewTemplate } from "@microsoft/fast-element";
import type { FASTMenuItem, MenuItemOptions } from "./menu-item.js";
/**
 * Generates a template for the {@link @microsoft/fast-foundation#(FASTMenuItem:class)} component using
 * the provided prefix.
 *
 * @public
 */
export declare function menuItemTemplate<T extends FASTMenuItem>(options?: MenuItemOptions): ElementViewTemplate<T>;
