/**
 * filters out any whitespace-only nodes, to be used inside a template.
 *
 * @param value - The Node that is being inspected
 * @param index - The index of the node within the array
 * @param array - The Node array that is being filtered
 * @returns true if the node is not a whitespace-only node, false otherwise
 *
 * @public
 */
export const whitespaceFilter = value => { var _a; return value.nodeType !== Node.TEXT_NODE || !!((_a = value.nodeValue) === null || _a === void 0 ? void 0 : _a.trim().length); };
