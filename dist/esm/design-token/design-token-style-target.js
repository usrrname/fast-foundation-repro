/**
 * A constructable style target that can be registered
 * for DesignToken default style emission.
 *
 * Useful for controlling where CSS is emitted to, or when needing
 * to collect styles for SSR processes.
 *
 * @public
 */
export class DesignTokenStyleTarget {
    constructor() {
        this.properties = new Map();
    }
    setProperty(name, value) {
        this.properties.set(name, value);
    }
    removeProperty(name) {
        this.properties.delete(name);
    }
    /**
     * The CSS text for the style target.
     * The text does *not* contain [CSS selector text](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).
     */
    get cssText() {
        let css = "";
        for (const [key, value] of this.properties) {
            css += `${key}: ${value};`;
        }
        return css;
    }
    /**
     * The values set for the target as an array of key/value pairs.
     */
    get values() {
        return Array.from(this.properties);
    }
}
