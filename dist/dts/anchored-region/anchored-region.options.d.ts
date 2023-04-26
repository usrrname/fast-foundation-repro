import type { ValuesOf } from "../utilities/index.js";
/**
 * Values to define the base behavior of an anchored region on a particular axis
 * @public
 */
export declare const AxisPositioningMode: {
    readonly uncontrolled: "uncontrolled";
    readonly locktodefault: "locktodefault";
    readonly dynamic: "dynamic";
};
/**
 * Type to define the base behavior of an anchored region on a particular axis
 * @public
 */
export type AxisPositioningMode = ValuesOf<typeof AxisPositioningMode>;
/**
 * Values to define the scaling behavior of an anchored region on a particular axis
 * @public
 */
export declare const AxisScalingMode: {
    readonly anchor: "anchor";
    readonly content: "content";
    readonly fill: "fill";
};
/**
 * Type to define the scaling behavior of an anchored region on a particular axis
 *
 * @public
 */
export type AxisScalingMode = ValuesOf<typeof AxisScalingMode>;
/**
 * Values for the horizontal positioning options for an anchored region
 * @public
 */
export declare const HorizontalPosition: {
    readonly start: "start";
    readonly end: "end";
    readonly left: "left";
    readonly right: "right";
    readonly center: "center";
    readonly unset: "unset";
};
/**
 * Type for the horizontal positioning options for an anchored region
 *
 * @public
 */
export type HorizontalPosition = ValuesOf<typeof HorizontalPosition>;
/**
 * Values for the vertical positioning options for an anchored region
 * @public
 */
export declare const VerticalPosition: {
    readonly top: "top";
    readonly bottom: "bottom";
    readonly center: "center";
    readonly unset: "unset";
};
/**
 * Type for the vertical positioning options for an anchored region
 *
 * @public
 */
export type VerticalPosition = ValuesOf<typeof VerticalPosition>;
/**
 * Defines if the component updates its position automatically. Calling update() always provokes an update.
 * anchor - the component only updates its position when the anchor resizes (default)
 * auto - the component updates its position when:
 * - update() is called
 * - the anchor resizes
 * - the window resizes
 * - the viewport resizes
 * - any scroll event in the document
 *
 * @public
 */
export declare const AutoUpdateMode: {
    readonly anchor: "anchor";
    readonly auto: "auto";
};
/**
 * Type for the auto update mode values
 * @public
 */
export type AutoUpdateMode = ValuesOf<typeof AutoUpdateMode>;
/**
 * Values to describe the possible positions of the region relative to its anchor.
 * Depending on the axis start = left/top, end = right/bottom
 * @public
 */
export declare const AnchoredRegionPositionLabel: {
    readonly start: "start";
    readonly insetStart: "insetStart";
    readonly insetEnd: "insetEnd";
    readonly end: "end";
    readonly center: "center";
};
/**
 * Describes the possible positions of the region relative
 * to its anchor. Depending on the axis start = left/top, end = right/bottom
 *
 * @public
 */
export type AnchoredRegionPositionLabel = ValuesOf<typeof AnchoredRegionPositionLabel>;
/**
 * @internal
 */
export interface Dimension {
    height: number;
    width: number;
}
