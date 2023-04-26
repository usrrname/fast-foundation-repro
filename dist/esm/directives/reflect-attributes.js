import { DOM, HTMLDirective, StatelessAttachedAttributeDirective, SubscriberSet, } from "@microsoft/fast-element";
const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        AttributeReflectionSubscriptionSet.getOrCreateFor(mutation.target).notify(mutation.attributeName);
    }
});
class AttributeReflectionSubscriptionSet {
    constructor(element) {
        this.element = element;
        this.watchedAttributes = new Set();
        this.subscribers = new SubscriberSet(this);
        AttributeReflectionSubscriptionSet.subscriberCache.set(element, this);
    }
    notify(attr) {
        this.subscribers.notify(attr);
    }
    subscribe(subscriber) {
        this.subscribers.subscribe(subscriber);
        if (!this.watchedAttributes.has(subscriber.attributes)) {
            this.watchedAttributes.add(subscriber.attributes);
            this.observe();
        }
    }
    unsubscribe(subscriber) {
        this.subscribers.unsubscribe(subscriber);
        if (this.watchedAttributes.has(subscriber.attributes)) {
            this.watchedAttributes.delete(subscriber.attributes);
            this.observe();
        }
    }
    observe() {
        const attributeFilter = [];
        for (const attributes of this.watchedAttributes.values()) {
            for (let i = 0; i < attributes.length; i++) {
                attributeFilter.push(attributes[i]);
            }
        }
        observer.observe(this.element, { attributeFilter });
    }
    static getOrCreateFor(source) {
        return (this.subscriberCache.get(source) ||
            new AttributeReflectionSubscriptionSet(source));
    }
}
AttributeReflectionSubscriptionSet.subscriberCache = new WeakMap();
class ReflectAttributesDirective extends StatelessAttachedAttributeDirective {
    constructor(attributes) {
        super(attributes);
        this.attributes = Object.freeze(attributes);
    }
    bind(controller) {
        const source = controller.source;
        const subscription = AttributeReflectionSubscriptionSet.getOrCreateFor(source);
        subscription[this.id] = controller.targets[this.targetNodeId];
        subscription.subscribe(this);
        // Reflect any existing attributes because MutationObserver will only
        // handle *changes* to attributes.
        if (source.hasAttributes()) {
            for (let i = 0; i < source.attributes.length; i++) {
                this.handleChange(subscription, source.attributes[i].name);
            }
        }
    }
    unbind(controller) {
        AttributeReflectionSubscriptionSet.getOrCreateFor(controller.source).unsubscribe(this);
    }
    handleChange(source, arg) {
        // In cases where two or more ReflectAttrBehavior instances are bound to the same element,
        // they will share a Subscriber implementation. In that case, this handle change can be invoked with
        // attributes an instances doesn't need to reflect. This guards against reflecting attrs
        // that shouldn't be reflected.
        if (this.attributes.includes(arg)) {
            const element = source.element;
            const target = source[this.id];
            DOM.setAttribute(target, arg, element.getAttribute(arg));
        }
    }
}
HTMLDirective.define(ReflectAttributesDirective);
/**
 * Reflects attributes from the host element to the target element of the directive.
 * @param attributes - The attributes to reflect
 *
 * @beta
 * @example
 * ```ts
 * const template = html`
 *     <button
 *         ${reflectAttributes("aria-label", "aria-describedby")}
 *     >
 *          hello world
 *     </button
 * `
 * ```
 */
export function reflectAttributes(...attributes) {
    return new ReflectAttributesDirective(attributes);
}
