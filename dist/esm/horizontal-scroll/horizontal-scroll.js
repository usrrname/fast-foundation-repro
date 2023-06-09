import { __decorate } from "tslib";
import { attr, booleanConverter, FASTElement, nullableNumberConverter, observable, Updates, } from "@microsoft/fast-element";
import { applyMixins } from "../utilities/apply-mixins.js";
import { StartEnd } from "../patterns/start-end.js";
import { ScrollEasing } from "./horizontal-scroll.options.js";
/**
 * A HorizontalScroll Custom HTML Element
 *
 * @slot start - Content which can be provided before the scroll area
 * @slot end - Content which can be provided after the scroll area
 * @csspart scroll-area - Wraps the entire scrollable region
 * @csspart scroll-view - The visible scroll area
 * @csspart content-container - The container for the content
 * @csspart scroll-prev - The previous flipper container
 * @csspart scroll-action-previous - The element wrapping the previous flipper
 * @csspart scroll-next - The next flipper container
 * @csspart scroll-action-next - The element wrapping the next flipper
 * @fires scrollstart - Fires a custom 'scrollstart' event when scrolling
 * @fires scrollend - Fires a custom 'scrollend' event when scrolling stops
 *
 * @public
 */
export class FASTHorizontalScroll extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * @internal
         */
        this.framesPerSecond = 60;
        /**
         * Flag indicating that the items are being updated
         *
         * @internal
         */
        this.updatingItems = false;
        /**
         * Speed of scroll in pixels per second
         * @public
         */
        this.speed = 600;
        /**
         * Attribute used for easing, defaults to ease-in-out
         * @public
         */
        this.easing = ScrollEasing.easeInOut;
        /**
         * Attribute to hide flippers from assistive technology
         * @public
         */
        this.flippersHiddenFromAT = false;
        /**
         * Scrolling state
         * @internal
         */
        this.scrolling = false;
        /**
         * Detects if the component has been resized
         * @internal
         */
        this.resizeDetector = null;
    }
    /**
     * The calculated duration for a frame.
     *
     * @internal
     */
    get frameTime() {
        return 1000 / this.framesPerSecond;
    }
    /**
     * Firing scrollstart and scrollend events
     * @internal
     */
    scrollingChanged(prev, next) {
        if (this.scrollContainer) {
            const event = this.scrolling == true ? "scrollstart" : "scrollend";
            this.$emit(event, this.scrollContainer.scrollLeft);
        }
    }
    /**
     * In RTL mode
     * @internal
     */
    get isRtl() {
        return (this.scrollItems.length > 1 &&
            this.scrollItems[0].offsetLeft > this.scrollItems[1].offsetLeft);
    }
    connectedCallback() {
        super.connectedCallback();
        this.initializeResizeDetector();
    }
    disconnectedCallback() {
        this.disconnectResizeDetector();
        super.disconnectedCallback();
    }
    /**
     * Updates scroll stops and flippers when scroll items change
     * @param previous - current scroll items
     * @param next - new updated scroll items
     * @public
     */
    scrollItemsChanged(previous, next) {
        if (next && !this.updatingItems) {
            Updates.enqueue(() => this.setStops());
        }
    }
    /**
     * destroys the instance's resize observer
     * @internal
     */
    disconnectResizeDetector() {
        if (this.resizeDetector) {
            this.resizeDetector.disconnect();
            this.resizeDetector = null;
        }
    }
    /**
     * initializes the instance's resize observer
     * @internal
     */
    initializeResizeDetector() {
        this.disconnectResizeDetector();
        this.resizeDetector = new window.ResizeObserver(this.resized.bind(this));
        this.resizeDetector.observe(this);
    }
    /**
     * Looks for slots and uses child nodes instead
     * @internal
     */
    updateScrollStops() {
        this.updatingItems = true;
        const updatedItems = this.scrollItems.reduce((scrollItems, scrollItem) => {
            if (scrollItem instanceof HTMLSlotElement) {
                return scrollItems.concat(scrollItem.assignedElements());
            }
            scrollItems.push(scrollItem);
            return scrollItems;
        }, []);
        this.scrollItems = updatedItems;
        this.updatingItems = false;
    }
    /**
     * Finds all of the scroll stops between elements
     * @internal
     */
    setStops() {
        this.updateScrollStops();
        const { scrollContainer: container } = this;
        const { scrollLeft } = container;
        const { width: containerWidth, left: containerLeft, } = container.getBoundingClientRect();
        this.width = containerWidth;
        let lastStop = 0;
        let stops = this.scrollItems
            .map((item, index) => {
            const { left, width } = item.getBoundingClientRect();
            const leftPosition = Math.round(left + scrollLeft - containerLeft);
            const right = Math.round(leftPosition + width);
            if (this.isRtl) {
                return -right;
            }
            lastStop = right;
            return index === 0 ? 0 : leftPosition;
        })
            .concat(lastStop);
        /* Fixes a FireFox bug where it doesn't scroll to the start */
        stops = this.fixScrollMisalign(stops);
        /* Sort to zero */
        stops.sort((a, b) => Math.abs(a) - Math.abs(b));
        this.scrollStops = stops;
        this.setFlippers();
    }
    /**
     * Checks to see if the stops are returning values
     *  otherwise it will try to reinitialize them
     *
     * @returns boolean indicating that current scrollStops are valid non-zero values
     * @internal
     */
    validateStops(reinit = true) {
        const hasStops = () => !!this.scrollStops.find((stop) => stop > 0);
        if (!hasStops() && reinit) {
            this.setStops();
        }
        return hasStops();
    }
    /**
     *
     */
    fixScrollMisalign(stops) {
        if (this.isRtl && stops.some(stop => stop > 0)) {
            stops.sort((a, b) => b - a);
            const offset = stops[0];
            stops = stops.map(stop => stop - offset);
        }
        return stops;
    }
    /**
     * Sets the controls view if enabled
     * @internal
     */
    setFlippers() {
        var _a, _b;
        const position = this.scrollContainer.scrollLeft;
        (_a = this.previousFlipperContainer) === null || _a === void 0 ? void 0 : _a.classList.toggle("disabled", position === 0);
        if (this.scrollStops) {
            const lastStop = Math.abs(this.scrollStops[this.scrollStops.length - 1]);
            (_b = this.nextFlipperContainer) === null || _b === void 0 ? void 0 : _b.classList.toggle("disabled", this.validateStops(false) && Math.abs(position) + this.width >= lastStop);
        }
    }
    /**
     * Function that can scroll an item into view.
     * @param item - An item index, a scroll item or a child of one of the scroll items
     * @param padding - Padding of the viewport where the active item shouldn't be
     * @param rightPadding - Optional right padding. Uses the padding if not defined
     *
     * @public
     */
    scrollInView(item, padding = 0, rightPadding) {
        var _a;
        if (typeof item !== "number" && item) {
            item = this.scrollItems.findIndex(scrollItem => scrollItem === item || scrollItem.contains(item));
        }
        if (item !== undefined) {
            rightPadding = rightPadding !== null && rightPadding !== void 0 ? rightPadding : padding;
            const { scrollContainer: container, scrollStops, scrollItems: items } = this;
            const { scrollLeft } = this.scrollContainer;
            const { width: containerWidth } = container.getBoundingClientRect();
            const itemStart = scrollStops[item];
            const { width } = items[item].getBoundingClientRect();
            const itemEnd = itemStart + width;
            const isBefore = scrollLeft + padding > itemStart;
            if (isBefore || scrollLeft + containerWidth - rightPadding < itemEnd) {
                const stops = [...scrollStops].sort((a, b) => (isBefore ? b - a : a - b));
                const scrollTo = (_a = stops.find(position => isBefore
                    ? position + padding < itemStart
                    : position + containerWidth - (rightPadding !== null && rightPadding !== void 0 ? rightPadding : 0) > itemEnd)) !== null && _a !== void 0 ? _a : 0;
                this.scrollToPosition(scrollTo);
            }
        }
    }
    /**
     * Lets the user arrow left and right through the horizontal scroll
     * @param e - Keyboard event
     * @public
     */
    keyupHandler(e) {
        const key = e.key;
        switch (key) {
            case "ArrowLeft":
                this.scrollToPrevious();
                break;
            case "ArrowRight":
                this.scrollToNext();
                break;
        }
    }
    /**
     * Scrolls items to the left
     * @public
     */
    scrollToPrevious() {
        this.validateStops();
        const scrollPosition = this.scrollContainer.scrollLeft;
        const current = this.scrollStops.findIndex((stop, index) => stop >= scrollPosition &&
            (this.isRtl ||
                index === this.scrollStops.length - 1 ||
                this.scrollStops[index + 1] > scrollPosition));
        const right = Math.abs(this.scrollStops[current + 1]);
        let nextIndex = this.scrollStops.findIndex(stop => Math.abs(stop) + this.width > right);
        if (nextIndex >= current || nextIndex === -1) {
            nextIndex = current > 0 ? current - 1 : 0;
        }
        this.scrollToPosition(this.scrollStops[nextIndex], scrollPosition);
    }
    /**
     * Scrolls items to the right
     * @public
     */
    scrollToNext() {
        this.validateStops();
        const scrollPosition = this.scrollContainer.scrollLeft;
        const current = this.scrollStops.findIndex(stop => Math.abs(stop) >= Math.abs(scrollPosition));
        const outOfView = this.scrollStops.findIndex(stop => Math.abs(scrollPosition) + this.width <= Math.abs(stop));
        let nextIndex = current;
        if (outOfView > current + 2) {
            nextIndex = outOfView - 2;
        }
        else if (current < this.scrollStops.length - 2) {
            nextIndex = current + 1;
        }
        this.scrollToPosition(this.scrollStops[nextIndex], scrollPosition);
    }
    /**
     * Handles scrolling with easing
     * @param position - starting position
     * @param newPosition - position to scroll to
     * @public
     */
    scrollToPosition(newPosition, position = this.scrollContainer.scrollLeft) {
        var _a;
        if (this.scrolling) {
            return;
        }
        this.scrolling = true;
        const seconds = (_a = this.duration) !== null && _a !== void 0 ? _a : `${Math.abs(newPosition - position) / this.speed}s`;
        this.content.style.setProperty("transition-duration", seconds);
        const computedDuration = parseFloat(getComputedStyle(this.content).getPropertyValue("transition-duration"));
        const transitionendHandler = (e) => {
            if (e && e.target !== e.currentTarget) {
                return;
            }
            this.content.style.setProperty("transition-duration", "0s");
            this.content.style.removeProperty("transform");
            this.scrollContainer.style.setProperty("scroll-behavior", "auto");
            this.scrollContainer.scrollLeft = newPosition;
            this.setFlippers();
            this.content.removeEventListener("transitionend", transitionendHandler);
            this.scrolling = false;
        };
        if (computedDuration === 0) {
            transitionendHandler();
            return;
        }
        this.content.addEventListener("transitionend", transitionendHandler);
        const maxScrollValue = this.scrollContainer.scrollWidth - this.scrollContainer.clientWidth;
        let transitionStop = this.scrollContainer.scrollLeft - Math.min(newPosition, maxScrollValue);
        if (this.isRtl) {
            transitionStop =
                this.scrollContainer.scrollLeft +
                    Math.min(Math.abs(newPosition), maxScrollValue);
        }
        this.content.style.setProperty("transition-property", "transform");
        this.content.style.setProperty("transition-timing-function", this.easing);
        this.content.style.setProperty("transform", `translateX(${transitionStop}px)`);
    }
    /**
     * Monitors resize event on the horizontal-scroll element
     * @public
     */
    resized() {
        if (this.resizeTimeout) {
            this.resizeTimeout = clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout(() => {
            this.width = this.scrollContainer.offsetWidth;
            this.setFlippers();
        }, this.frameTime);
    }
    /**
     * Monitors scrolled event on the content container
     * @public
     */
    scrolled() {
        if (this.scrollTimeout) {
            this.scrollTimeout = clearTimeout(this.scrollTimeout);
        }
        this.scrollTimeout = setTimeout(() => {
            this.setFlippers();
        }, this.frameTime);
    }
}
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTHorizontalScroll.prototype, "speed", void 0);
__decorate([
    attr
], FASTHorizontalScroll.prototype, "duration", void 0);
__decorate([
    attr
], FASTHorizontalScroll.prototype, "easing", void 0);
__decorate([
    attr({ attribute: "flippers-hidden-from-at", converter: booleanConverter })
], FASTHorizontalScroll.prototype, "flippersHiddenFromAT", void 0);
__decorate([
    observable
], FASTHorizontalScroll.prototype, "scrolling", void 0);
__decorate([
    observable
], FASTHorizontalScroll.prototype, "scrollItems", void 0);
__decorate([
    attr({ attribute: "view" })
], FASTHorizontalScroll.prototype, "view", void 0);
applyMixins(FASTHorizontalScroll, StartEnd);
