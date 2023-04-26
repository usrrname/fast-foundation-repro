import { FASTElement } from "@microsoft/fast-element";
import type { AnchoredRegionPositionLabel, AutoUpdateMode, AxisPositioningMode, AxisScalingMode, HorizontalPosition, VerticalPosition } from "./anchored-region.options.js";
/**
 * An anchored region Custom HTML Element.
 *
 * @slot - The default slot for the content
 * @fires loaded - Fires a custom 'loaded' event when the region is loaded and visible
 * @fires positionchange - Fires a custom 'positionchange' event when the position has changed
 *
 * @public
 */
export declare class FASTAnchoredRegion extends FASTElement {
    /**
     * The HTML ID of the anchor element this region is positioned relative to
     *
     * @public
     * @remarks
     * HTML Attribute: anchor
     */
    anchor: string;
    protected anchorChanged(): void;
    /**
     * The HTML ID of the viewport element this region is positioned relative to
     *
     * @public
     * @remarks
     * HTML Attribute: anchor
     */
    viewport: string;
    protected viewportChanged(): void;
    /**
     * Sets what logic the component uses to determine horizontal placement.
     * 'locktodefault' forces the default position
     * 'dynamic' decides placement based on available space
     * 'uncontrolled' does not control placement on the horizontal axis
     *
     * @public
     * @remarks
     * HTML Attribute: horizontal-positioning-mode
     */
    horizontalPositioningMode: AxisPositioningMode;
    protected horizontalPositioningModeChanged(): void;
    /**
     * The default horizontal position of the region relative to the anchor element
     *
     * @public
     * @remarks
     * HTML Attribute: horizontal-default-position
     */
    horizontalDefaultPosition: HorizontalPosition;
    protected horizontalDefaultPositionChanged(): void;
    /**
     * Whether the region remains in the viewport (ie. detaches from the anchor) on the horizontal axis
     *
     * @public
     * @remarks
     * HTML Attribute: horizontal-viewport-lock
     */
    horizontalViewportLock: boolean;
    protected horizontalViewportLockChanged(): void;
    /**
     * Whether the region overlaps the anchor on the horizontal axis
     *
     * @public
     * @remarks
     * HTML Attribute: horizontal-inset
     */
    horizontalInset: boolean;
    protected horizontalInsetChanged(): void;
    /**
     * How narrow the space allocated to the default position has to be before the widest area
     * is selected for layout
     *
     * @public
     * @remarks
     * HTML Attribute: horizontal-threshold
     */
    horizontalThreshold: number;
    protected horizontalThresholdChanged(): void;
    /**
     * Defines how the width of the region is calculated
     *
     * @public
     * @remarks
     * HTML Attribute: horizontal-scaling
     */
    horizontalScaling: AxisScalingMode;
    protected horizontalScalingChanged(): void;
    /**
     * Sets what logic the component uses to determine vertical placement.
     * 'locktodefault' forces the default position
     * 'dynamic' decides placement based on available space
     * 'uncontrolled' does not control placement on the vertical axis
     *
     * @public
     * @remarks
     * HTML Attribute: vertical-positioning-mode
     */
    verticalPositioningMode: AxisPositioningMode;
    protected verticalPositioningModeChanged(): void;
    /**
     * The default vertical position of the region relative to the anchor element
     *
     * @public
     * @remarks
     * HTML Attribute: vertical-default-position
     */
    verticalDefaultPosition: VerticalPosition;
    protected verticalDefaultPositionChanged(): void;
    /**
     * Whether the region remains in the viewport (ie. detaches from the anchor) on the vertical axis
     *
     * @public
     * @remarks
     * HTML Attribute: vertical-viewport-lock
     */
    verticalViewportLock: boolean;
    protected verticalViewportLockChanged(): void;
    /**
     * Whether the region overlaps the anchor on the vertical axis
     *
     * @public
     * @remarks
     * HTML Attribute: vertical-inset
     */
    verticalInset: boolean;
    protected verticalInsetChanged(): void;
    /**
     * How short the space allocated to the default position has to be before the tallest area
     * is selected for layout
     *
     * @public
     * @remarks
     * HTML Attribute: vertical-threshold
     */
    verticalThreshold: number;
    protected verticalThresholdChanged(): void;
    /**
     * Defines how the height of the region is calculated
     *
     * @public
     * @remarks
     * HTML Attribute: vertical-scaling
     */
    verticalScaling: AxisScalingMode;
    protected verticalScalingChanged(): void;
    /**
     * Whether the region is positioned using css "position: fixed".
     * Otherwise the region uses "position: absolute".
     * Fixed placement allows the region to break out of parent containers,
     *
     * @public
     * @remarks
     * HTML Attribute: fixed-placement
     */
    fixedPlacement: boolean;
    protected fixedPlacementChanged(): void;
    /**
     * Defines what triggers the anchored region to revaluate positioning
     *
     * @public
     * @remarks
     * HTML Attribute: auto-update-mode
     */
    autoUpdateMode: AutoUpdateMode;
    protected autoUpdateModeChanged(prevMode: AutoUpdateMode, newMode: AutoUpdateMode): void;
    /**
     * The HTML element being used as the anchor
     *
     * @public
     */
    anchorElement: HTMLElement | null;
    protected anchorElementChanged(): void;
    /**
     * The HTML element being used as the viewport
     *
     * @public
     */
    viewportElement: HTMLElement | null;
    protected viewportElementChanged(): void;
    /**
     * indicates that an initial positioning pass on layout has completed
     *
     * @internal
     */
    initialLayoutComplete: boolean;
    /**
     * indicates the current horizontal position of the region
     */
    verticalPosition: AnchoredRegionPositionLabel | undefined;
    /**
     * indicates the current vertical position of the region
     */
    horizontalPosition: AnchoredRegionPositionLabel | undefined;
    /**
     * values to be applied to the component's transform on render
     */
    private translateX;
    private translateY;
    /**
     * the span to be applied to the region on each axis
     */
    private regionWidth;
    private regionHeight;
    private resizeDetector;
    private viewportRect;
    private anchorRect;
    private regionRect;
    /**
     * base offsets between the positioner's base position and the anchor's
     */
    private baseHorizontalOffset;
    private baseVerticalOffset;
    private pendingPositioningUpdate;
    private pendingReset;
    private currentDirection;
    private regionVisible;
    private forceUpdate;
    private updateThreshold;
    private static intersectionService;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * @internal
     */
    adoptedCallback(): void;
    /**
     * update position
     */
    update: () => void;
    /**
     * destroys the instance's resize observer
     */
    private disconnectResizeDetector;
    /**
     * initializes the instance's resize observer
     */
    private initializeResizeDetector;
    /**
     * react to attribute changes that don't require a reset
     */
    private updateForAttributeChange;
    /**
     * fully initializes the component
     */
    private initialize;
    /**
     * Request a reset if there are currently no open requests
     */
    private requestReset;
    /**
     * sets the starting configuration for component internal values
     */
    private setInitialState;
    /**
     * starts observers
     */
    private startObservers;
    /**
     * get position updates
     */
    private requestPositionUpdates;
    /**
     * stops observers
     */
    private stopObservers;
    /**
     * Gets the viewport element by id, or defaults to document root
     */
    private getViewport;
    /**
     *  Gets the anchor element by id
     */
    private getAnchor;
    /**
     *  Handle intersections
     */
    private handleIntersection;
    /**
     *  iterate through intersection entries and apply data
     */
    private applyIntersectionEntries;
    /**
     *  Update the offset values
     */
    private updateRegionOffset;
    /**
     *  compare rects to see if there is enough change to justify a DOM update
     */
    private isRectDifferent;
    /**
     *  Handle resize events
     */
    private handleResize;
    /**
     * resets the component
     */
    private reset;
    /**
     *  Recalculate layout related state values
     */
    private updateLayout;
    /**
     *  Updates the style string applied to the region element as well as the css classes attached
     *  to the root element
     */
    private updateRegionStyle;
    /**
     *  Updates the css classes that reflect the current position of the element
     */
    private updatePositionClasses;
    /**
     * Get horizontal positioning state based on desired position
     */
    private setHorizontalPosition;
    /**
     * Set vertical positioning state based on desired position
     */
    private setVerticalPosition;
    /**
     *  Get available positions based on positioning mode
     */
    private getPositioningOptions;
    /**
     *  Get the space available for a particular relative position
     */
    private getAvailableSpace;
    /**
     * Get region dimensions
     */
    private getNextRegionDimension;
    /**
     * starts event listeners that can trigger auto updating
     */
    private startAutoUpdateEventListeners;
    /**
     * stops event listeners that can trigger auto updating
     */
    private stopAutoUpdateEventListeners;
}
