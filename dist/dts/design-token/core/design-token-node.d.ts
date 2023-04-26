import type { DesignToken } from "./design-token.js";
/**
 * A function that resolves the value of a DesignToken.
 * @public
 */
export type DesignTokenResolver = <T>(token: DesignToken<T>) => T;
/**
 * A {@link DesignToken} value that is derived. These values can depend on other {@link DesignToken}s
 * or arbitrary observable properties.
 * @public
 */
export type DerivedDesignTokenValue<T> = (resolve: DesignTokenResolver) => T;
/**
 * A design token value with no observable dependencies
 * @public
 */
export type StaticDesignTokenValue<T> = T extends (...args: any[]) => any ? DerivedDesignTokenValue<T> : T;
/**
 * The type that a {@link DesignToken} can be set to.
 * @public
 */
export type DesignTokenValue<T> = StaticDesignTokenValue<T> | DerivedDesignTokenValue<T>;
/**
 * @public
 */
export interface DesignTokenChangeRecord<T> {
    readonly target: DesignTokenNode;
    readonly type: DesignTokenMutationType;
    readonly token: DesignToken<T>;
}
/**
 * @internal
 */
export declare class DesignTokenChangeRecordImpl<T> implements DesignTokenChangeRecord<T> {
    readonly target: DesignTokenNode;
    readonly type: DesignTokenMutationType;
    readonly token: DesignToken<T>;
    readonly value?: DesignTokenValue<T>;
    constructor(target: DesignTokenNode, type: DesignTokenMutationType, token: DesignToken<T>, value?: DesignTokenValue<T>);
    notify(): void;
}
/**
 * @public
 */
export declare const enum DesignTokenMutationType {
    add = 0,
    change = 1,
    delete = 2
}
/**
 * @public
 */
export declare class DesignTokenNode {
    private _parent;
    private _children;
    private _values;
    private _derived;
    private dependencyGraph;
    private static _notifications;
    /**
     * Determines if a value is a {@link DerivedDesignTokenValue}
     * @param value - The value to test
     */
    private static isDerivedTokenValue;
    /**
     * Determines if a token has a derived value for a node.
     */
    private static isDerivedFor;
    /**
     * Collects token/value pairs for all derived token / values set on upstream nodes.
     */
    private static collectDerivedContext;
    /**
     * Resolves the local value for a token if it is assigned, otherwise returns undefined.
     */
    private static getLocalTokenValue;
    private static getOrCreateDependencyGraph;
    /**
     * Emit all queued notifications
     */
    private static notify;
    private static queueNotification;
    /**
     * Retrieves all tokens assigned directly to a node.
     * @param node - the node to retrieve assigned tokens for
     * @returns
     */
    static getAssignedTokensForNode(node: DesignTokenNode): DesignToken<any>[];
    /**
     * Retrieves all tokens assigned to the node and ancestor nodes.
     * @param node - the node to compose assigned tokens for
     */
    static composeAssignedTokensForNode(node: DesignTokenNode): DesignToken<any>[];
    /**
     * Tests if a token is assigned directly to a node
     * @param node - The node to test
     * @param token  - The token to test
     * @returns
     */
    static isAssigned<T>(node: DesignTokenNode, token: DesignToken<T>): boolean;
    /**
     * The parent node
     */
    get parent(): DesignTokenNode | null;
    get children(): DesignTokenNode[];
    /**
     * Appends a child to the node, notifying for any tokens set for the node's context.
     */
    appendChild(child: DesignTokenNode): void;
    /**
     * Appends a child to the node, notifying for any tokens set for the node's context.
     */
    removeChild(child: DesignTokenNode): void;
    /**
     * Dispose of the node, removing parent/child relationships and
     * unsubscribing all observable binding subscribers. Does not emit
     * notifications.
     */
    dispose(): void;
    /**
     * Sets a token to a value
     */
    setTokenValue<T>(token: DesignToken<T>, value: DesignTokenValue<T>): void;
    /**
     * Returns the resolve value for a token
     */
    getTokenValue<T>(token: DesignToken<T>): T;
    /**
     * Deletes the token value for a node
     */
    deleteTokenValue<T>(token: DesignToken<T>): void;
    /**
     * Notifies that a token has been mutated
     */
    private dispatch;
    /**
     * Generate change-records for local dependencies of a change record
     */
    private collectLocalChangeRecords;
    /**
     *
     * Notify children of changes to the node
     */
    private notifyChildren;
    private tearDownDerivedTokenValue;
    private setupDerivedTokenValue;
}
