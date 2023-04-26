import type { PropertyTarget } from "./custom-property-manager.js";
/**
 * A constructable style target that can be registered
 * for DesignToken default style emission.
 *
 * Useful for controlling where CSS is emitted to, or when needing
 * to collect styles for SSR processes.
 *
 * @public
 */
export declare class DesignTokenStyleTarget implements PropertyTarget {
    private properties;
    setProperty(name: string, value: string): void;
    removeProperty(name: string): void;
    /**
     * The CSS text for the style target.
     * The text does *not* contain [CSS selector text](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).
     */
    get cssText(): string;
    /**
     * The values set for the target as an array of key/value pairs.
     */
    get values(): Array<[string, string]>;
}
