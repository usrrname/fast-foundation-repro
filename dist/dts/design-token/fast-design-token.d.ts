import { CSSDirective, HTMLDirective } from "@microsoft/fast-element";
import { FASTElement, HostBehavior } from "@microsoft/fast-element";
import type { DesignTokenValue } from "./core/design-token-node.js";
import { PropertyTarget } from "./custom-property-manager.js";
/**
 * @public
 */
export interface DesignTokenChangeRecord<T extends DesignToken<any>> {
    /**
     * The element for which the value was changed
     */
    target: FASTElement | "default";
    /**
     * The token that was changed
     */
    token: T;
}
/**
 * A subscriber that should receive {@link DesignTokenChangeRecord | change records} when a token changes for a target
 * @public
 */
export interface DesignTokenSubscriber<T extends DesignToken<any>> {
    handleChange(token: T, record: DesignTokenChangeRecord<T>): void;
}
/**
 * Describes a {@link DesignToken} configuration
 * @public
 */
export interface DesignTokenConfiguration {
    /**
     * The name of the {@link DesignToken}.
     */
    name: string;
}
/**
 * @public
 */
export interface CSSDesignTokenConfiguration extends DesignTokenConfiguration {
    /**
     * The name of the CSS custom property to associate to the {@link CSSDesignToken}
     */
    cssCustomPropertyName: string;
}
/**
 * @public
 */
export declare class DesignToken<T> {
    /**
     * The name of the {@link DesignToken}
     */
    name: string;
    /**
     * The default value of the token (alias of {@link DesignToken.default})
     */
    get $value(): T;
    /**
     * The default value of the token, or undefined if it has not been set.
     */
    get default(): T | undefined;
    private _subscribers;
    private get subscribers();
    constructor(configuration: DesignTokenConfiguration);
    private static isCSSDesignTokenConfiguration;
    /**
     *
     * @param name - Factory function for creating a {@link DesignToken} or {@link CSSDesignToken}
     */
    static create<T>(name: string): CSSDesignToken<T>;
    static create<T>(config: DesignTokenConfiguration): DesignToken<T>;
    static create<T>(config: CSSDesignTokenConfiguration): CSSDesignToken<T>;
    /**
     * Configures the strategy for resolving hierarchical relationships between FASTElement targets.
     */
    static withStrategy(strategy: DesignTokenResolutionStrategy): void;
    /**
     * Registers a target for emitting default style values.
     * {@link CSSDesignToken | CSSDesignTokens} with default values assigned via
     * {@link DesignToken.withDefault} will emit CSS custom properties to all
     * registered targets.
     * @param target - The target to register, defaults to the document
     */
    static registerDefaultStyleTarget(target?: FASTElement | Document | PropertyTarget): void;
    /**
     * Unregister a target for default style emission.
     * @param target - The root to deregister, defaults to the document
     */
    static unregisterDefaultStyleTarget(target?: FASTElement | Document | PropertyTarget): void;
    /**
     * Retrieves the value of the token for a target element.
     */
    getValueFor(target: FASTElement): T;
    /**
     * Sets the value of the token for a target element.
     */
    setValueFor(target: FASTElement, value: DesignToken<T> | DesignTokenValue<T>): void;
    /**
     * Deletes the value of the token for a target element.
     */
    deleteValueFor(target: FASTElement): this;
    /**
     * Sets the default value of the token.
     */
    withDefault(value: DesignToken<T> | DesignTokenValue<T>): this;
    /**
     * Subscribes a subscriber to notifications for the token.
     */
    subscribe(subscriber: DesignTokenSubscriber<this>): void;
    /**
     * Unsubscribes a subscriber to notifications for the token.
     */
    unsubscribe(subscriber: DesignTokenSubscriber<this>): void;
    /**
     * Alias the token to the provided token.
     * @param token - the token to alias to
     */
    private alias;
    private normalizeValue;
    private subscriberNotifier;
}
/**
 * @public
 */
export declare class CSSDesignToken<T> extends DesignToken<T> implements CSSDirective, HTMLDirective {
    /**
     * The CSS Custom property name of the token.
     */
    readonly cssCustomProperty: string;
    private cssVar;
    /**
     * The DesignToken represented as a string that can be used in CSS.
     */
    createCSS(): string;
    /**
     * Creates HTML to be used within a template.
     */
    createHTML(): string;
    private cssReflector;
    constructor(configuration: CSSDesignTokenConfiguration);
    private resolveCSSValue;
}
export interface DesignTokenResolutionStrategy extends HostBehavior<FASTElement> {
    /**
     * Determines if a 'child' element is contained by a 'parent'.
     * @param child - The child element
     * @param parent - The parent element
     */
    contains(parent: FASTElement, child: FASTElement): boolean;
    /**
     * Finds the nearest FASTElement parent node
     * @param element - The element to find the parent of
     */
    parent(element: FASTElement): FASTElement | null;
}
