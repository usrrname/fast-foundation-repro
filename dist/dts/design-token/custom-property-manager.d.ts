import type { FASTElement } from "@microsoft/fast-element";
/**
 * A target that can have key/value pairs set and removed.
 * @public
 */
export interface PropertyTarget {
    setProperty(name: string, value: string): void;
    removeProperty(name: string): void;
}
/**
 * Controls emission for default values. This control is capable
 * of emitting to multiple {@link PropertyTarget | PropertyTargets},
 * and only emits if it has at least one root.
 *
 * @internal
 */
export declare class RootStyleSheetTarget implements PropertyTarget {
    private static roots;
    private static properties;
    setProperty(name: string, value: any): void;
    removeProperty(name: string): void;
    static registerRoot(root: PropertyTarget): void;
    static unregisterRoot(root: PropertyTarget): void;
}
/**
 * Manages creation and caching of PropertyTarget instances.
 *
 * @internal
 */
export declare const PropertyTargetManager: Readonly<{
    getOrCreate(source: FASTElement | Document): PropertyTarget;
}>;
