import { __decorate } from "tslib";
import { attr, FASTElement, nullableNumberConverter } from "@microsoft/fast-element";
import { uniqueId } from "@microsoft/fast-web-utilities";
import { StartEnd } from "../patterns/index.js";
import { applyMixins } from "../utilities/apply-mixins.js";
/**
 * An individual item in an {@link @microsoft/fast-foundation#(FASTAccordion:class) }.
 *
 * @slot start - Content which can be provided between the heading and the icon
 * @slot end - Content which can be provided between the start slot and icon
 * @slot heading - Content which serves as the accordion item heading and text of the expand button
 * @slot - The default slot for accordion item content
 * @slot expanded-icon - The expanded icon
 * @slot collapsed-icon - The collapsed icon
 * @fires change - Fires a custom 'change' event when the button is invoked
 * @csspart heading - Wraps the button
 * @csspart button - The button which serves to invoke the item
 * @csspart heading-content - Wraps the slot for the heading content within the button
 * @csspart icon - The icon container
 * @csspart region - The wrapper for the accordion item content
 *
 * @public
 */
export class FASTAccordionItem extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * Configures the {@link https://www.w3.org/TR/wai-aria-1.1/#aria-level | level} of the
         * heading element.
         *
         * @defaultValue 2
         * @public
         * @remarks
         * HTML attribute: heading-level
         */
        this.headinglevel = 2;
        /**
         * Expands or collapses the item.
         *
         * @public
         * @remarks
         * HTML attribute: expanded
         */
        this.expanded = false;
        /**
         * Disables an accordion item
         *
         * @public
         * @remarks
         * HTML attribute: disabled
         */
        this.disabled = false;
        /**
         * The item ID
         *
         * @public
         * @remarks
         * HTML Attribute: id
         */
        this.id = uniqueId("accordion-");
        /**
         * @internal
         */
        this.clickHandler = (e) => {
            if (this.disabled) {
                return;
            }
            this.$emit("click", e);
        };
    }
}
__decorate([
    attr({
        attribute: "heading-level",
        mode: "fromView",
        converter: nullableNumberConverter,
    })
], FASTAccordionItem.prototype, "headinglevel", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTAccordionItem.prototype, "expanded", void 0);
__decorate([
    attr({ mode: "boolean" })
], FASTAccordionItem.prototype, "disabled", void 0);
__decorate([
    attr
], FASTAccordionItem.prototype, "id", void 0);
applyMixins(FASTAccordionItem, StartEnd);
