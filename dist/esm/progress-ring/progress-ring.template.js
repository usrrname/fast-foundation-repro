import { html, when } from "@microsoft/fast-element";
import { staticallyCompose } from "../utilities/template-helpers.js";
const progressSegments = 44;
/**
 * The template for the {@link @microsoft/fast-foundation#FASTProgressRing} component.
 * @public
 */
export function progressRingTemplate(options = {}) {
    return html `
        <template
            role="progressbar"
            aria-valuenow="${x => x.value}"
            aria-valuemin="${x => x.min}"
            aria-valuemax="${x => x.max}"
        >
            ${when(x => typeof x.value === "number", html `
                    <svg
                        class="progress"
                        part="progress"
                        viewBox="0 0 16 16"
                        slot="determinate"
                    >
                        <circle
                            class="background"
                            part="background"
                            cx="8px"
                            cy="8px"
                            r="7px"
                        ></circle>
                        <circle
                            class="determinate"
                            part="determinate"
                            style="stroke-dasharray: ${x => (progressSegments * x.percentComplete) /
        100}px ${progressSegments}px"
                            cx="8px"
                            cy="8px"
                            r="7px"
                        ></circle>
                    </svg>
                `)}
            ${when(x => typeof x.value !== "number", html `
                    <slot name="indeterminate">
                        ${staticallyCompose(options.indeterminateIndicator)}
                    </slot>
                `)}
        </template>
    `;
}
