import { html, ref } from "@microsoft/fast-element";
import { staticallyCompose, } from "../utilities/template-helpers.js";
/**
 * A mixin class implementing start and end slots.
 * These are generally used to decorate text elements with icons or other visual indicators.
 * @public
 */
export class StartEnd {
}
/**
 * The template for the end slot.
 * For use with {@link StartEnd}
 *
 * @public
 */
export function endSlotTemplate(options) {
    return html `
        <slot name="end" ${ref("end")}>${staticallyCompose(options.end)}</slot>
    `.inline();
}
/**
 * The template for the start slots.
 * For use with {@link StartEnd}
 *
 * @public
 */
export function startSlotTemplate(options) {
    return html `
        <slot name="start" ${ref("start")}>${staticallyCompose(options.start)}</slot>
    `.inline();
}
