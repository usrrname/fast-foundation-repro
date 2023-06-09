import { __decorate } from "tslib";
import { attr, nullableNumberConverter, observable } from "@microsoft/fast-element";
import { Direction, keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp, keyEnd, keyHome, limit, Orientation, } from "@microsoft/fast-web-utilities";
import { getDirection } from "../utilities/direction.js";
import { convertPixelToPercent } from "./slider-utilities.js";
import { FormAssociatedSlider } from "./slider.form-associated.js";
import { SliderMode } from "./slider.options.js";
/**
 * A Slider Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#slider | ARIA slider }.
 *
 * @slot track - The track of the slider
 * @slot track-start - The track-start visual indicator
 * @slot thumb - The slider thumb
 * @slot - The default slot for labels
 * @csspart positioning-region - The region used to position the elements of the slider
 * @csspart track-container - The region containing the track elements
 * @csspart track-start - The element wrapping the track start slot
 * @csspart thumb-container - The thumb container element which is programatically positioned
 * @fires change - Fires a custom 'change' event when the slider value changes
 *
 * @public
 */
export class FASTSlider extends FormAssociatedSlider {
    constructor() {
        super(...arguments);
        /**
         * @internal
         */
        this.direction = Direction.ltr;
        /**
         * @internal
         */
        this.isDragging = false;
        /**
         * @internal
         */
        this.trackWidth = 0;
        /**
         * @internal
         */
        this.trackMinWidth = 0;
        /**
         * @internal
         */
        this.trackHeight = 0;
        /**
         * @internal
         */
        this.trackLeft = 0;
        /**
         * @internal
         */
        this.trackMinHeight = 0;
        /**
         * Custom function that generates a string for the component's "aria-valuetext" attribute based on the current value.
         *
         * @public
         */
        this.valueTextFormatter = () => null;
        /**
         * The minimum allowed value.
         *
         * @defaultValue - 0
         * @public
         * @remarks
         * HTML Attribute: min
         */
        this.min = 0; // Map to proxy element.
        /**
         * The maximum allowed value.
         *
         * @defaultValue - 10
         * @public
         * @remarks
         * HTML Attribute: max
         */
        this.max = 10; // Map to proxy element.
        /**
         * Value to increment or decrement via arrow keys, mouse click or drag.
         *
         * @public
         * @remarks
         * HTML Attribute: step
         */
        this.step = 1; // Map to proxy element.
        /**
         * The orientation of the slider.
         *
         * @public
         * @remarks
         * HTML Attribute: orientation
         */
        this.orientation = Orientation.horizontal;
        /**
         * The selection mode.
         *
         * @public
         * @remarks
         * HTML Attribute: mode
         */
        this.mode = SliderMode.singleValue;
        this.keypressHandler = (e) => {
            if (this.readOnly || this.disabled) {
                return;
            }
            if (e.key === keyHome) {
                e.preventDefault();
                this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
                    ? (this.value = `${this.min}`)
                    : (this.value = `${this.max}`);
            }
            else if (e.key === keyEnd) {
                e.preventDefault();
                this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
                    ? (this.value = `${this.max}`)
                    : (this.value = `${this.min}`);
            }
            else if (!e.shiftKey) {
                switch (e.key) {
                    case keyArrowRight:
                    case keyArrowUp:
                        e.preventDefault();
                        this.increment();
                        break;
                    case keyArrowLeft:
                    case keyArrowDown:
                        e.preventDefault();
                        this.decrement();
                        break;
                }
            }
        };
        this.setupTrackConstraints = () => {
            const clientRect = this.track.getBoundingClientRect();
            this.trackWidth = this.track.clientWidth;
            this.trackMinWidth = this.track.clientLeft;
            this.trackHeight = clientRect.top;
            this.trackMinHeight = clientRect.bottom;
            this.trackLeft = this.getBoundingClientRect().left;
            if (this.trackWidth === 0) {
                this.trackWidth = 1;
            }
        };
        this.setupListeners = (remove = false) => {
            const eventAction = `${remove ? "remove" : "add"}EventListener`;
            this[eventAction]("keydown", this.keypressHandler);
            this[eventAction]("mousedown", this.handleMouseDown);
            this.thumb[eventAction]("mousedown", this.handleThumbMouseDown, {
                passive: true,
            });
            this.thumb[eventAction]("touchstart", this.handleThumbMouseDown, {
                passive: true,
            });
            // removes handlers attached by mousedown handlers
            if (remove) {
                this.handleMouseDown(null);
                this.handleThumbMouseDown(null);
            }
        };
        /**
         * @internal
         */
        this.initialValue = "";
        /**
         *  Handle mouse moves during a thumb drag operation
         *  If the event handler is null it removes the events
         */
        this.handleThumbMouseDown = (event) => {
            const eventAction = `${event !== null ? "add" : "remove"}EventListener`;
            window[eventAction]("mouseup", this.handleWindowMouseUp);
            window[eventAction]("mousemove", this.handleMouseMove, { passive: true });
            window[eventAction]("touchmove", this.handleMouseMove, { passive: true });
            window[eventAction]("touchend", this.handleWindowMouseUp);
            this.isDragging = event !== null;
        };
        /**
         *  Handle mouse moves during a thumb drag operation
         */
        this.handleMouseMove = (e) => {
            if (this.readOnly || this.disabled || e.defaultPrevented) {
                return;
            }
            // update the value based on current position
            const sourceEvent = window.TouchEvent && e instanceof TouchEvent
                ? e.touches[0]
                : e;
            const eventValue = this.orientation === Orientation.horizontal
                ? sourceEvent.pageX - document.documentElement.scrollLeft - this.trackLeft
                : sourceEvent.pageY - document.documentElement.scrollTop;
            this.value = `${this.calculateNewValue(eventValue)}`;
        };
        /**
         * Handle a window mouse up during a drag operation
         */
        this.handleWindowMouseUp = (event) => {
            this.stopDragging();
        };
        this.stopDragging = () => {
            this.isDragging = false;
            this.handleMouseDown(null);
            this.handleThumbMouseDown(null);
        };
        /**
         *
         * @param e - MouseEvent or null. If there is no event handler it will remove the events
         */
        this.handleMouseDown = (e) => {
            const eventAction = `${e !== null ? "add" : "remove"}EventListener`;
            if (e === null || (!this.disabled && !this.readOnly)) {
                window[eventAction]("mouseup", this.handleWindowMouseUp);
                window.document[eventAction]("mouseleave", this.handleWindowMouseUp);
                window[eventAction]("mousemove", this.handleMouseMove);
                if (e) {
                    this.setupTrackConstraints();
                    const controlValue = this.orientation === Orientation.horizontal
                        ? e.pageX - document.documentElement.scrollLeft - this.trackLeft
                        : e.pageY - document.documentElement.scrollTop;
                    this.value = `${this.calculateNewValue(controlValue)}`;
                }
            }
        };
    }
    readOnlyChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.readOnly = this.readOnly;
        }
    }
    /**
     * The value property, typed as a number.
     *
     * @public
     */
    get valueAsNumber() {
        return parseFloat(super.value);
    }
    set valueAsNumber(next) {
        this.value = next.toString();
    }
    /**
     * @internal
     */
    valueChanged(previous, next) {
        if (this.$fastController.isConnected) {
            const nextAsNumber = parseFloat(next);
            const value = limit(this.min, this.max, this.convertToConstrainedValue(nextAsNumber)).toString();
            if (value !== next) {
                this.value = value;
                return;
            }
            super.valueChanged(previous, next);
            this.setThumbPositionForOrientation(this.direction);
            this.$emit("change");
        }
    }
    minChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.min = `${this.min}`;
        }
        this.validate();
    }
    maxChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.max = `${this.max}`;
        }
        this.validate();
    }
    stepChanged() {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.step = `${this.step}`;
        }
        this.updateStepMultiplier();
        this.validate();
    }
    orientationChanged() {
        if (this.$fastController.isConnected) {
            this.setThumbPositionForOrientation(this.direction);
        }
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.proxy.setAttribute("type", "range");
        this.direction = getDirection(this);
        this.updateStepMultiplier();
        this.setupTrackConstraints();
        this.setupListeners();
        this.setupDefaultValue();
        this.setThumbPositionForOrientation(this.direction);
    }
    /**
     * @internal
     */
    disconnectedCallback() {
        this.setupListeners(true);
    }
    /**
     * Increment the value by the step
     *
     * @public
     */
    increment() {
        const newVal = this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
            ? Number(this.value) + Number(this.step)
            : Number(this.value) + Number(this.step);
        const incrementedVal = this.convertToConstrainedValue(newVal);
        const incrementedValString = incrementedVal < Number(this.max) ? `${incrementedVal}` : `${this.max}`;
        this.value = incrementedValString;
    }
    /**
     * Decrement the value by the step
     *
     * @public
     */
    decrement() {
        const newVal = this.direction !== Direction.rtl && this.orientation !== Orientation.vertical
            ? Number(this.value) - Number(this.step)
            : Number(this.value) - Number(this.step);
        const decrementedVal = this.convertToConstrainedValue(newVal);
        const decrementedValString = decrementedVal > Number(this.min) ? `${decrementedVal}` : `${this.min}`;
        this.value = decrementedValString;
    }
    /**
     * Places the thumb based on the current value
     *
     * @public
     * @param direction - writing mode
     */
    setThumbPositionForOrientation(direction) {
        const newPct = convertPixelToPercent(Number(this.value), Number(this.min), Number(this.max), direction);
        const percentage = (1 - newPct) * 100;
        if (this.orientation === Orientation.horizontal) {
            this.position = this.isDragging
                ? `right: ${percentage}%; transition: none;`
                : `right: ${percentage}%; transition: all 0.2s ease;`;
        }
        else {
            this.position = this.isDragging
                ? `top: ${percentage}%; transition: none;`
                : `top: ${percentage}%; transition: all 0.2s ease;`;
        }
    }
    /**
     * Update the step multiplier used to ensure rounding errors from steps that
     * are not whole numbers
     */
    updateStepMultiplier() {
        const stepString = this.step + "";
        const decimalPlacesOfStep = !!(this.step % 1)
            ? stepString.length - stepString.indexOf(".") - 1
            : 0;
        this.stepMultiplier = Math.pow(10, decimalPlacesOfStep);
    }
    get midpoint() {
        return `${this.convertToConstrainedValue((this.max + this.min) / 2)}`;
    }
    setupDefaultValue() {
        if (typeof this.value === "string") {
            if (this.value.length === 0) {
                this.initialValue = this.midpoint;
            }
            else {
                const value = parseFloat(this.value);
                if (!Number.isNaN(value) && (value < this.min || value > this.max)) {
                    this.value = this.midpoint;
                }
            }
        }
    }
    /**
     * Calculate the new value based on the given raw pixel value.
     *
     * @param rawValue - the value to be converted to a constrained value
     * @returns the constrained value
     *
     * @internal
     */
    calculateNewValue(rawValue) {
        this.setupTrackConstraints();
        // update the value based on current position
        const newPosition = convertPixelToPercent(rawValue, this.orientation === Orientation.horizontal
            ? this.trackMinWidth
            : this.trackMinHeight, this.orientation === Orientation.horizontal
            ? this.trackWidth
            : this.trackHeight, this.direction);
        const newValue = (this.max - this.min) * newPosition + this.min;
        return this.convertToConstrainedValue(newValue);
    }
    convertToConstrainedValue(value) {
        if (isNaN(value)) {
            value = this.min;
        }
        /**
         * The following logic intends to overcome the issue with math in JavaScript with regards to floating point numbers.
         * This is needed as the `step` may be an integer but could also be a float. To accomplish this the step  is assumed to be a float
         * and is converted to an integer by determining the number of decimal places it represent, multiplying it until it is an
         * integer and then dividing it to get back to the correct number.
         */
        let constrainedValue = value - this.min;
        const roundedConstrainedValue = Math.round(constrainedValue / this.step);
        const remainderValue = constrainedValue -
            (roundedConstrainedValue * (this.stepMultiplier * this.step)) /
                this.stepMultiplier;
        constrainedValue =
            remainderValue >= Number(this.step) / 2
                ? constrainedValue - remainderValue + Number(this.step)
                : constrainedValue - remainderValue;
        return constrainedValue + this.min;
    }
}
__decorate([
    attr({ attribute: "readonly", mode: "boolean" })
], FASTSlider.prototype, "readOnly", void 0);
__decorate([
    observable
], FASTSlider.prototype, "direction", void 0);
__decorate([
    observable
], FASTSlider.prototype, "isDragging", void 0);
__decorate([
    observable
], FASTSlider.prototype, "position", void 0);
__decorate([
    observable
], FASTSlider.prototype, "trackWidth", void 0);
__decorate([
    observable
], FASTSlider.prototype, "trackMinWidth", void 0);
__decorate([
    observable
], FASTSlider.prototype, "trackHeight", void 0);
__decorate([
    observable
], FASTSlider.prototype, "trackLeft", void 0);
__decorate([
    observable
], FASTSlider.prototype, "trackMinHeight", void 0);
__decorate([
    observable
], FASTSlider.prototype, "valueTextFormatter", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTSlider.prototype, "min", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTSlider.prototype, "max", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTSlider.prototype, "step", void 0);
__decorate([
    attr
], FASTSlider.prototype, "orientation", void 0);
__decorate([
    attr
], FASTSlider.prototype, "mode", void 0);
