import { UnobservableMutationObserver } from "../utilities.js";
import { ElementController } from "./element-controller.js";
const deferHydrationAttribute = "defer-hydration";
/**
 * An ElementController capable of hydrating FAST elements from
 * Declarative Shadow DOM.
 *
 * @beta
 */
export class HydratableElementController extends ElementController {
    static hydrationObserverHandler(records) {
        for (const record of records) {
            HydratableElementController.hydrationObserver.unobserve(record.target);
            record.target.$fastController.connect();
        }
    }
    connect() {
        if (this.source.hasAttribute(deferHydrationAttribute)) {
            HydratableElementController.hydrationObserver.observe(this.source, {
                attributeFilter: [deferHydrationAttribute],
            });
        }
        else {
            super.connect();
        }
    }
    disconnect() {
        super.disconnect();
        HydratableElementController.hydrationObserver.unobserve(this.source);
    }
    static install() {
        ElementController.setStrategy(HydratableElementController);
    }
}
HydratableElementController.hydrationObserver = new UnobservableMutationObserver(HydratableElementController.hydrationObserverHandler);
