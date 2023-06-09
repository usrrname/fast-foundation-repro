import { FASTElement } from "@microsoft/fast-element";
import { StartEnd } from "../patterns/start-end.js";
import type { HorizontalScrollView } from "./horizontal-scroll.options.js";
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
export declare class FASTHorizontalScroll extends FASTElement {
    /**
     * Reference to DOM element that scrolls the content
     * @public
     */
    scrollContainer: HTMLDivElement;
    /**
     * Reference to DOM element that holds the slotted content
     * @public
     */
    content: HTMLDivElement;
    /**
     * Reference to flipper to scroll to previous content
     * @public
     */
    previousFlipperContainer: HTMLDivElement;
    /**
     * Reference to flipper to scroll to the next content
     * @public
     */
    nextFlipperContainer: HTMLDivElement;
    /**
     * @internal
     */
    private framesPerSecond;
    /**
     * The calculated duration for a frame.
     *
     * @internal
     */
    private get frameTime();
    /**
     * The timeout identifier for the scroll event throttling.
     *
     * @internal
     */
    private resizeTimeout?;
    /**
     * The timeout identifier for the scroll event throttling.
     *
     * @internal
     */
    private scrollTimeout?;
    /**
     * Flag indicating that the items are being updated
     *
     * @internal
     */
    private updatingItems;
    /**
     * Speed of scroll in pixels per second
     * @public
     */
    speed: number;
    /**
     * The CSS time value for the scroll transition duration. Overrides the `speed` attribute.
     *
     * @remarks
     * When `duration` is set, the `speed` attribute has no effect.
     *
     * @public
     */
    duration: string;
    /**
     * Attribute used for easing, defaults to ease-in-out
     * @public
     */
    easing: ScrollEasing | string;
    /**
     * Attribute to hide flippers from assistive technology
     * @public
     */
    flippersHiddenFromAT: boolean;
    /**
     * Scrolling state
     * @internal
     */
    private scrolling;
    /**
     * Firing scrollstart and scrollend events
     * @internal
     */
    scrollingChanged(prev: unknown, next: boolean): void;
    /**
     * Detects if the component has been resized
     * @internal
     */
    private resizeDetector;
    /**
     * Width of the parent container
     * @internal
     */
    private width;
    /**
     * Scroll stop positions between elements
     * @internal
     */
    private scrollStops;
    /**
     * The default slotted items placed in the scrolling container.
     *
     * @public
     */
    scrollItems: HTMLElement[];
    /**
     * In RTL mode
     * @internal
     */
    private get isRtl();
    /**
     * View: default | mobile
     * @public
     */
    view: HorizontalScrollView;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Updates scroll stops and flippers when scroll items change
     * @param previous - current scroll items
     * @param next - new updated scroll items
     * @public
     */
    scrollItemsChanged(previous: HTMLElement[], next: HTMLElement[]): void;
    /**
     * destroys the instance's resize observer
     * @internal
     */
    private disconnectResizeDetector;
    /**
     * initializes the instance's resize observer
     * @internal
     */
    private initializeResizeDetector;
    /**
     * Looks for slots and uses child nodes instead
     * @internal
     */
    private updateScrollStops;
    /**
     * Finds all of the scroll stops between elements
     * @internal
     */
    private setStops;
    /**
     * Checks to see if the stops are returning values
     *  otherwise it will try to reinitialize them
     *
     * @returns boolean indicating that current scrollStops are valid non-zero values
     * @internal
     */
    private validateStops;
    /**
     *
     */
    private fixScrollMisalign;
    /**
     * Sets the controls view if enabled
     * @internal
     */
    private setFlippers;
    /**
     * Function that can scroll an item into view.
     * @param item - An item index, a scroll item or a child of one of the scroll items
     * @param padding - Padding of the viewport where the active item shouldn't be
     * @param rightPadding - Optional right padding. Uses the padding if not defined
     *
     * @public
     */
    scrollInView(item: HTMLElement | number, padding?: number, rightPadding?: number): void;
    /**
     * Lets the user arrow left and right through the horizontal scroll
     * @param e - Keyboard event
     * @public
     */
    keyupHandler(e: Event & KeyboardEvent): void;
    /**
     * Scrolls items to the left
     * @public
     */
    scrollToPrevious(): void;
    /**
     * Scrolls items to the right
     * @public
     */
    scrollToNext(): void;
    /**
     * Handles scrolling with easing
     * @param position - starting position
     * @param newPosition - position to scroll to
     * @public
     */
    scrollToPosition(newPosition: number, position?: number): void;
    /**
     * Monitors resize event on the horizontal-scroll element
     * @public
     */
    resized(): void;
    /**
     * Monitors scrolled event on the content container
     * @public
     */
    scrolled(): void;
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface FASTHorizontalScroll extends StartEnd {
}
