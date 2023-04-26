import { __decorate } from "tslib";
import { attr, FASTElement, nullableNumberConverter, observable, } from "@microsoft/fast-element";
/**
 * A base class for progress components.
 * @public
 */
export class FASTBaseProgress extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * Indicates progress in %
         * @internal
         */
        this.percentComplete = 0;
    }
    valueChanged() {
        this.updatePercentComplete();
    }
    minChanged() {
        if (this.$fastController.isConnected) {
            this.updatePercentComplete();
        }
    }
    maxChanged() {
        if (this.$fastController.isConnected) {
            this.updatePercentComplete();
        }
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.updatePercentComplete();
    }
    updatePercentComplete() {
        const min = typeof this.min === "number" ? this.min : 0;
        const max = typeof this.max === "number" ? this.max : 100;
        const value = typeof this.value === "number" ? this.value : 0;
        const range = max - min;
        this.percentComplete =
            range === 0 ? 0 : Math.fround(((value - min) / range) * 100);
    }
}
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTBaseProgress.prototype, "value", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTBaseProgress.prototype, "min", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTBaseProgress.prototype, "max", void 0);
__decorate([
    observable
], FASTBaseProgress.prototype, "percentComplete", void 0);
