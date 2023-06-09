import type { ValuesOf } from "../utilities/index.js";
/**
 * Menu items roles.
 * @public
 */
export declare const MenuItemRole: {
    /**
     * The menu item has a "menuitem" role
     */
    readonly menuitem: "menuitem";
    /**
     * The menu item has a "menuitemcheckbox" role
     */
    readonly menuitemcheckbox: "menuitemcheckbox";
    /**
     * The menu item has a "menuitemradio" role
     */
    readonly menuitemradio: "menuitemradio";
};
/**
 * The types for menu item roles
 * @public
 */
export type MenuItemRole = ValuesOf<typeof MenuItemRole>;
/**
 * @internal
 */
export declare const roleForMenuItem: {
    [value in keyof typeof MenuItemRole]: typeof MenuItemRole[value];
};
