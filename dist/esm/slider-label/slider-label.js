import { __decorate } from "tslib";
import { attr, FASTElement, Observable, observable, } from "@microsoft/fast-element";
import { Direction } from "@microsoft/fast-web-utilities";
import { SliderOrientation } from "../slider/slider.options.js";
import { convertPixelToPercent } from "../slider/slider-utilities.js";
const defaultConfig = {
    min: 0,
    max: 0,
    direction: Direction.ltr,
    orientation: SliderOrientation.horizontal,
    disabled: false,
};
/**
 * A label element intended to be used with the {@link @microsoft/fast-foundation#(FASTSlider:class)} component.
 *
 * @slot - The default slot for the label content
 * @csspart root - The element wrapping the label mark and text
 *
 * @public
 */
export class FASTSliderLabel extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * Hides the tick mark.
         *
         * @public
         * @remarks
         * HTML Attribute: hide-mark
         */
        this.hideMark = false;
        /**
         * The orientation state of the label. This is generally controlled by the parent {@link @microsoft/fast-foundation#(FASTSlider:class)}.
         *
         * @public
         * @deprecated - will be removed in coming ALPHA version
         * @remarks
         * HTML Attribute: orientation
         */
        this.orientation = SliderOrientation.horizontal;
        /**
         * @internal
         */
        this.sliderDirection = Direction.ltr;
        this.getSliderConfiguration = () => {
            if (!this.isSliderConfig(this.parentNode)) {
                this.sliderDirection = defaultConfig.direction || Direction.ltr;
                this.orientation = defaultConfig.orientation || SliderOrientation.horizontal;
                this.sliderMaxPosition = defaultConfig.max;
                this.sliderMinPosition = defaultConfig.min;
            }
            else {
                const parentSlider = this
                    .parentNode;
                const { min, max, direction, orientation, disabled } = parentSlider;
                if (disabled !== undefined) {
                    this.disabled = disabled;
                }
                this.sliderDirection = direction || Direction.ltr;
                this.orientation = orientation || SliderOrientation.horizontal;
                this.sliderMaxPosition = max;
                this.sliderMinPosition = min;
            }
        };
        this.positionAsStyle = () => {
            const direction = this.sliderDirection
                ? this.sliderDirection
                : Direction.ltr;
            const pct = convertPixelToPercent(Number(this.position), Number(this.sliderMinPosition), Number(this.sliderMaxPosition));
            let rightNum = Math.round((1 - pct) * 100);
            let leftNum = Math.round(pct * 100);
            if (Number.isNaN(leftNum) && Number.isNaN(rightNum)) {
                rightNum = 50;
                leftNum = 50;
            }
            if (this.orientation === SliderOrientation.horizontal) {
                return direction === Direction.rtl
                    ? `right: ${leftNum}%; left: ${rightNum}%;`
                    : `left: ${leftNum}%; right: ${rightNum}%;`;
            }
            else {
                return `top: ${rightNum}%; bottom: ${leftNum}%;`;
            }
        };
    }
    positionChanged() {
        this.positionStyle = this.positionAsStyle();
    }
    /**
     * @internal
     */
    orientationChanged() {
        void 0;
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.getSliderConfiguration();
        this.positionStyle = this.positionAsStyle();
        this.notifier = Observable.getNotifier(this.parentNode);
        this.notifier.subscribe(this, "orientation");
        this.notifier.subscribe(this, "direction");
        this.notifier.subscribe(this, "max");
        this.notifier.subscribe(this, "min");
    }
    /**
     * @internal
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.notifier.unsubscribe(this, "orientation");
        this.notifier.unsubscribe(this, "direction");
        this.notifier.unsubscribe(this, "max");
        this.notifier.unsubscribe(this, "min");
    }
    /**
     * @internal
     */
    handleChange(source, propertyName) {
        switch (propertyName) {
            case "direction":
                this.sliderDirection = source.direction;
                break;
            case "orientation":
                this.orientation = source.orientation;
                break;
            case "max":
                this.sliderMaxPosition = source.max;
                break;
            case "min":
                this.sliderMinPosition = source.min;
                break;
            default:
                break;
        }
        this.positionStyle = this.positionAsStyle();
    }
    isSliderConfig(node) {
        return node.max !== undefined && node.min !== undefined;
    }
}
__decorate([
    observable
], FASTSliderLabel.prototype, "positionStyle", void 0);
__decorate([
    attr
], FASTSliderLabel.prototype, "position", void 0);
__decorate([
    attr({ attribute: "hide-mark", mode: "boolean" })
], FASTSliderLabel.prototype, "hideMark", void 0);
__decorate([
    attr({ attribute: "disabled", mode: "boolean" })
], FASTSliderLabel.prototype, "disabled", void 0);
__decorate([
    attr
], FASTSliderLabel.prototype, "orientation", void 0);
__decorate([
    observable
], FASTSliderLabel.prototype, "sliderMinPosition", void 0);
__decorate([
    observable
], FASTSliderLabel.prototype, "sliderMaxPosition", void 0);
__decorate([
    observable
], FASTSliderLabel.prototype, "sliderDirection", void 0);
