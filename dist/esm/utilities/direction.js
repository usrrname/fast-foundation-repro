import { Direction } from "@microsoft/fast-web-utilities";
/**
 * Determines the current localization direction of an element.
 *
 * @param rootNode - the HTMLElement to begin the query from, usually "this" when used in a component controller
 * @returns the localization direction of the element
 *
 * @public
 */
export const getDirection = (rootNode) => {
    var _a;
    return ((_a = rootNode.closest("[dir]")) === null || _a === void 0 ? void 0 : _a.dir) === "rtl"
        ? Direction.rtl
        : Direction.ltr;
};
