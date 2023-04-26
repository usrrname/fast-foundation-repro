import { __decorate } from "tslib";
import { htmlDirective, } from "@microsoft/fast-element";
import { cssDirective, FASTElement, Observable, SubscriberSet, } from "@microsoft/fast-element";
import { composedContains, composedParent } from "@microsoft/fast-element/utilities";
import { DesignTokenNode } from "./core/design-token-node.js";
import { PropertyTargetManager, RootStyleSheetTarget, } from "./custom-property-manager.js";
/**
 * @public
 */
export class DesignToken {
    /**
     * The default value of the token (alias of {@link DesignToken.default})
     */
    get $value() {
        return this.default;
    }
    /**
     * The default value of the token, or undefined if it has not been set.
     */
    get default() {
        return FASTDesignTokenNode.defaultNode.getTokenValue(this);
    }
    get subscribers() {
        if (this._subscribers) {
            return this._subscribers;
        }
        this._subscribers = new SubscriberSet(this);
        return this._subscribers;
    }
    constructor(configuration) {
        this.subscriberNotifier = {
            handleChange: (source, change) => {
                const record = {
                    target: change.target === FASTDesignTokenNode.defaultNode
                        ? "default"
                        : change.target.target,
                    token: this,
                };
                this.subscribers.notify(record);
            },
        };
        this.name = configuration.name;
        Observable.getNotifier(this).subscribe(this.subscriberNotifier);
    }
    static isCSSDesignTokenConfiguration(config) {
        return (typeof config.cssCustomPropertyName ===
            "string");
    }
    static create(config) {
        if (typeof config === "string") {
            return new CSSDesignToken({ name: config, cssCustomPropertyName: config });
        }
        else {
            return DesignToken.isCSSDesignTokenConfiguration(config)
                ? new CSSDesignToken(config)
                : new DesignToken(config);
        }
    }
    /**
     * Configures the strategy for resolving hierarchical relationships between FASTElement targets.
     */
    static withStrategy(strategy) {
        FASTDesignTokenNode.withStrategy(strategy);
    }
    /**
     * Registers a target for emitting default style values.
     * {@link CSSDesignToken | CSSDesignTokens} with default values assigned via
     * {@link DesignToken.withDefault} will emit CSS custom properties to all
     * registered targets.
     * @param target - The target to register, defaults to the document
     */
    static registerDefaultStyleTarget(target = document) {
        if (target instanceof FASTElement || target instanceof Document) {
            target = PropertyTargetManager.getOrCreate(target);
        }
        RootStyleSheetTarget.registerRoot(target);
    }
    /**
     * Unregister a target for default style emission.
     * @param target - The root to deregister, defaults to the document
     */
    static unregisterDefaultStyleTarget(target = document) {
        if (target instanceof FASTElement || target instanceof Document) {
            target = PropertyTargetManager.getOrCreate(target);
        }
        RootStyleSheetTarget.unregisterRoot(target);
    }
    /**
     * Retrieves the value of the token for a target element.
     */
    getValueFor(target) {
        return FASTDesignTokenNode.getOrCreate(target).getTokenValue(this);
    }
    /**
     * Sets the value of the token for a target element.
     */
    setValueFor(target, value) {
        FASTDesignTokenNode.getOrCreate(target).setTokenValue(this, this.normalizeValue(value));
    }
    /**
     * Deletes the value of the token for a target element.
     */
    deleteValueFor(target) {
        FASTDesignTokenNode.getOrCreate(target).deleteTokenValue(this);
        return this;
    }
    /**
     * Sets the default value of the token.
     */
    withDefault(value) {
        FASTDesignTokenNode.defaultNode.setTokenValue(this, this.normalizeValue(value));
        return this;
    }
    /**
     * Subscribes a subscriber to notifications for the token.
     */
    subscribe(subscriber) {
        this.subscribers.subscribe(subscriber);
    }
    /**
     * Unsubscribes a subscriber to notifications for the token.
     */
    unsubscribe(subscriber) {
        this.subscribers.unsubscribe(subscriber);
    }
    /**
     * Alias the token to the provided token.
     * @param token - the token to alias to
     */
    alias(token) {
        return ((resolve) => resolve(token));
    }
    normalizeValue(value) {
        if (value instanceof DesignToken) {
            value = this.alias(value);
        }
        return value;
    }
}
/**
 * @public
 */
let CSSDesignToken = class CSSDesignToken extends DesignToken {
    /**
     * The DesignToken represented as a string that can be used in CSS.
     */
    createCSS() {
        return this.cssVar;
    }
    /**
     * Creates HTML to be used within a template.
     */
    createHTML() {
        return this.cssVar;
    }
    constructor(configuration) {
        super(configuration);
        this.cssReflector = {
            handleChange: (source, record) => {
                const target = record.target === FASTDesignTokenNode.defaultNode
                    ? FASTDesignTokenNode.rootStyleSheetTarget
                    : record.target instanceof FASTDesignTokenNode
                        ? PropertyTargetManager.getOrCreate(record.target.target)
                        : null;
                if (target) {
                    if (record.type === 2 /* DesignTokenMutationType.delete */) {
                        target.removeProperty(this.cssCustomProperty);
                    }
                    else {
                        target.setProperty(this.cssCustomProperty, this.resolveCSSValue(record.target.getTokenValue(this)));
                    }
                }
            },
        };
        this.cssCustomProperty = `--${configuration.cssCustomPropertyName}`;
        this.cssVar = `var(${this.cssCustomProperty})`;
        Observable.getNotifier(this).subscribe(this.cssReflector);
    }
    resolveCSSValue(value) {
        return value && typeof value.createCSS === "function" ? value.createCSS() : value;
    }
};
CSSDesignToken = __decorate([
    cssDirective(),
    htmlDirective()
], CSSDesignToken);
export { CSSDesignToken };
const defaultDesignTokenResolutionStrategy = {
    contains: composedContains,
    parent(element) {
        let parent = composedParent(element);
        while (parent !== null) {
            if (parent instanceof FASTElement) {
                return parent;
            }
            parent = composedParent(parent);
        }
        return null;
    },
};
class FASTDesignTokenNode extends DesignTokenNode {
    static get strategy() {
        if (this._strategy === undefined) {
            FASTDesignTokenNode.withStrategy(defaultDesignTokenResolutionStrategy);
        }
        return this._strategy;
    }
    connectedCallback(controller) {
        let parent = FASTDesignTokenNode.findParent(controller.source);
        if (parent === null) {
            parent = FASTDesignTokenNode.defaultNode;
        }
        if (parent !== this.parent) {
            const reparent = [];
            for (const child of parent.children) {
                if (child instanceof FASTDesignTokenNode &&
                    FASTDesignTokenNode.strategy.contains(controller.source, child.target)) {
                    reparent.push(child);
                }
            }
            parent.appendChild(this);
            for (const child of reparent) {
                this.appendChild(child);
            }
        }
    }
    disconnectedCallback(controller) {
        FASTDesignTokenNode.cache.delete(this.target);
        this.dispose();
    }
    static getOrCreate(target) {
        let found = FASTDesignTokenNode.cache.get(target);
        if (found) {
            return found;
        }
        found = new FASTDesignTokenNode(target);
        FASTDesignTokenNode.cache.set(target, found);
        target.$fastController.addBehavior(FASTDesignTokenNode.strategy);
        target.$fastController.addBehavior(found);
        return found;
    }
    static withStrategy(strategy) {
        this._strategy = strategy;
    }
    static findParent(target) {
        let current = FASTDesignTokenNode.strategy.parent(target);
        while (current !== null) {
            const node = FASTDesignTokenNode.cache.get(current);
            if (node) {
                return node;
            }
            current = FASTDesignTokenNode.strategy.parent(current);
        }
        return null;
    }
    constructor(target) {
        super();
        this.target = target;
        // By default, nodes are not attached to the defaultNode for performance
        // reasons. However, that behavior can throw if retrieval for a node
        // happens before the bind() method is called. To guard against that,
        //  lazily attach to the defaultNode when get/set/delete methods are called.
        this.setTokenValue = this.lazyAttachToDefault(super.setTokenValue);
        this.getTokenValue = this.lazyAttachToDefault(super.getTokenValue);
        this.deleteTokenValue = this.lazyAttachToDefault(super.deleteTokenValue);
    }
    /**
     * Creates a function from a function that lazily attaches the node to the default node.
     */
    lazyAttachToDefault(fn) {
        const cb = ((...args) => {
            if (this.parent === null) {
                FASTDesignTokenNode.defaultNode.appendChild(this);
            }
            return fn.apply(this, args);
        });
        return cb;
    }
}
FASTDesignTokenNode.defaultNode = new DesignTokenNode();
FASTDesignTokenNode.rootStyleSheetTarget = new RootStyleSheetTarget();
FASTDesignTokenNode.cache = new WeakMap();
