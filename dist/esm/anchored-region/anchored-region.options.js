/**
 * Values to define the base behavior of an anchored region on a particular axis
 * @public
 */
export const AxisPositioningMode = {
    uncontrolled: "uncontrolled",
    locktodefault: "locktodefault",
    dynamic: "dynamic",
};
/**
 * Values to define the scaling behavior of an anchored region on a particular axis
 * @public
 */
export const AxisScalingMode = {
    anchor: "anchor",
    content: "content",
    fill: "fill",
};
/**
 * Values for the horizontal positioning options for an anchored region
 * @public
 */
export const HorizontalPosition = {
    start: "start",
    end: "end",
    left: "left",
    right: "right",
    center: "center",
    unset: "unset",
};
/**
 * Values for the vertical positioning options for an anchored region
 * @public
 */
export const VerticalPosition = {
    top: "top",
    bottom: "bottom",
    center: "center",
    unset: "unset",
};
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
export const AutoUpdateMode = {
    anchor: "anchor",
    auto: "auto",
};
/**
 * Values to describe the possible positions of the region relative to its anchor.
 * Depending on the axis start = left/top, end = right/bottom
 * @public
 */
export const AnchoredRegionPositionLabel = {
    start: "start",
    insetStart: "insetStart",
    insetEnd: "insetEnd",
    end: "end",
    center: "center",
};
