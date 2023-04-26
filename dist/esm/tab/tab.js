import { __decorate } from "tslib";
import { attr, FASTElement } from "@microsoft/fast-element";
import { StartEnd } from "../patterns/start-end.js";
import { applyMixins } from "../utilities/apply-mixins.js";
/**
 * A Tab Component to be used with {@link @microsoft/fast-foundation#(FASTTabs:class)}
 *
 * @slot start - Content which can be provided before the tab content
 * @slot end - Content which can be provided after the tab content
 * @slot - The default slot for the tab content
 *
 * @public
 */
export class FASTTab extends FASTElement {
}
__decorate([
    attr({ mode: "boolean" })
], FASTTab.prototype, "disabled", void 0);
applyMixins(FASTTab, StartEnd);
