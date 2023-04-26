import { ElementController } from "./element-controller.js";
/**
 * An ElementController capable of hydrating FAST elements from
 * Declarative Shadow DOM.
 *
 * @beta
 */
export declare class HydratableElementController<TElement extends HTMLElement = HTMLElement> extends ElementController<TElement> {
    private static hydrationObserver;
    private static hydrationObserverHandler;
    connect(): void;
    disconnect(): void;
    static install(): void;
}
