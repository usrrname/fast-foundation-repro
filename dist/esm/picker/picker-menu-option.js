import { __decorate } from "tslib";
import { attr, FASTElement, html, observable, } from "@microsoft/fast-element";
const defaultContentsTemplate = html `
    <template>
        ${x => x.value}
    </template>
`;
/**
 * A picker list item Custom HTML Element.
 *
 * @beta
 */
export class FASTPickerMenuOption extends FASTElement {
    contentsTemplateChanged() {
        if (this.$fastController.isConnected) {
            this.updateView();
        }
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.updateView();
    }
    /**
     * @internal
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.disconnectView();
    }
    handleClick(e) {
        if (e.defaultPrevented) {
            return false;
        }
        this.handleInvoked();
        return false;
    }
    handleInvoked() {
        this.$emit("pickeroptioninvoked");
    }
    updateView() {
        var _a, _b;
        this.disconnectView();
        this.customView =
            (_b = (_a = this.contentsTemplate) === null || _a === void 0 ? void 0 : _a.render(this, this)) !== null && _b !== void 0 ? _b : defaultContentsTemplate.render(this, this);
    }
    disconnectView() {
        var _a;
        (_a = this.customView) === null || _a === void 0 ? void 0 : _a.dispose();
        this.customView = undefined;
    }
}
__decorate([
    attr({ attribute: "value" })
], FASTPickerMenuOption.prototype, "value", void 0);
__decorate([
    observable
], FASTPickerMenuOption.prototype, "contentsTemplate", void 0);
