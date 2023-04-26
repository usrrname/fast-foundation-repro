const parentLocatorEventName = "$$designToken__locate__parent$$";
const containsEventName = "$$designToken__contains$$";
function parentLocatorHandler(event) {
    if (event.target !== this) {
        event.detail.parent = this;
        event.stopImmediatePropagation();
    }
}
function containsHandler(event) {
    if (event.detail !== this) {
        event.detail.contains = true;
        event.stopImmediatePropagation();
    }
}
/**
 * A DesignToken resolution strategy that uses custom events to resolve
 * node hierarchies.
 *
 * @public
 */
export const DesignTokenEventResolutionStrategy = {
    addedCallback(controller) {
        controller.source.addEventListener(parentLocatorEventName, parentLocatorHandler);
    },
    removedCallback(controller) {
        controller.source.removeEventListener(parentLocatorEventName, parentLocatorHandler);
    },
    contains(parent, child) {
        parent.addEventListener(containsEventName, containsHandler);
        const event = new CustomEvent(containsEventName, {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: { contains: false },
        });
        child.dispatchEvent(event);
        parent.removeEventListener(containsEventName, containsHandler);
        return event.detail.contains;
    },
    parent(element) {
        const event = new CustomEvent(parentLocatorEventName, {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: { parent: null },
        });
        element.dispatchEvent(event);
        return event.detail.parent;
    },
};
