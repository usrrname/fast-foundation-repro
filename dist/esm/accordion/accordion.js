import { __decorate } from "tslib";
import { Observable } from "@microsoft/fast-element";
import { attr, FASTElement, observable } from "@microsoft/fast-element";
import { keyArrowDown, keyArrowUp, keyEnd, keyHome, wrapInBounds, } from "@microsoft/fast-web-utilities";
import { FASTAccordionItem } from "../accordion-item/accordion-item.js";
import { AccordionExpandMode } from "./accordion.options.js";
/**
 * An Accordion Custom HTML Element
 * Implements {@link https://www.w3.org/TR/wai-aria-practices-1.1/#accordion | ARIA Accordion}.
 *
 * @fires change - Fires a custom 'change' event when the active item changes
 * @csspart item - The slot for the accordion items
 * @public
 *
 * @remarks
 * Designed to be used with {@link @microsoft/fast-foundation#accordionTemplate} and {@link @microsoft/fast-foundation#(FASTAccordionItem:class)}.
 */
export class FASTAccordion extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * Controls the expand mode of the Accordion, either allowing
         * single or multiple item expansion.
         * @public
         *
         * @remarks
         * HTML attribute: expand-mode
         */
        this.expandmode = AccordionExpandMode.multi;
        this.activeItemIndex = 0;
        this.change = () => {
            this.$emit("change", this.activeid);
        };
        this.setItems = () => {
            if (this.slottedAccordionItems.length === 0) {
                return;
            }
            const children = Array.from(this.children);
            this.removeItemListeners(children);
            children.forEach((child) => Observable.getNotifier(child).subscribe(this, "disabled"));
            this.accordionItems = children.filter(child => !child.hasAttribute("disabled"));
            this.accordionIds = this.getItemIds();
            this.accordionItems.forEach((item, index) => {
                if (item instanceof FASTAccordionItem) {
                    item.addEventListener("click", this.activeItemChange);
                    Observable.getNotifier(item).subscribe(this, "expanded");
                }
                const itemId = this.accordionIds[index];
                item.setAttribute("id", typeof itemId !== "string" ? `accordion-${index + 1}` : itemId);
                this.activeid = this.accordionIds[this.activeItemIndex];
                item.addEventListener("keydown", this.handleItemKeyDown);
                item.addEventListener("focus", this.handleItemFocus);
            });
            if (this.isSingleExpandMode()) {
                const expandedItem = this.findExpandedItem();
                this.setSingleExpandMode(expandedItem);
            }
        };
        this.removeItemListeners = (oldValue) => {
            oldValue.forEach((item, index) => {
                Observable.getNotifier(item).unsubscribe(this, "disabled");
                Observable.getNotifier(item).unsubscribe(this, "expanded");
                item.removeEventListener("click", this.activeItemChange);
                item.removeEventListener("keydown", this.handleItemKeyDown);
                item.removeEventListener("focus", this.handleItemFocus);
            });
        };
        this.activeItemChange = (event) => {
            if (event.defaultPrevented || event.target !== event.currentTarget) {
                return;
            }
            event.preventDefault();
            this.handleExpandedChange(event.target);
        };
        this.handleExpandedChange = (item) => {
            if (item instanceof FASTAccordionItem) {
                this.activeid = item.getAttribute("id");
                if (!this.isSingleExpandMode()) {
                    item.expanded = !item.expanded;
                    // setSingleExpandMode sets activeItemIndex on its own
                    this.activeItemIndex = this.accordionItems.indexOf(item);
                }
                else {
                    this.setSingleExpandMode(item);
                }
                this.change();
            }
        };
        this.handleItemKeyDown = (event) => {
            // only handle the keydown if the event target is the accordion item
            // prevents arrow keys from moving focus to accordion headers when focus is on accordion item panel content
            if (event.target !== event.currentTarget) {
                return;
            }
            this.accordionIds = this.getItemIds();
            switch (event.key) {
                case keyArrowUp:
                    event.preventDefault();
                    this.adjust(-1);
                    break;
                case keyArrowDown:
                    event.preventDefault();
                    this.adjust(1);
                    break;
                case keyHome:
                    this.activeItemIndex = 0;
                    this.focusItem();
                    break;
                case keyEnd:
                    this.activeItemIndex = this.accordionItems.length - 1;
                    this.focusItem();
                    break;
            }
        };
        this.handleItemFocus = (event) => {
            // update the active item index if the focus moves to an accordion item via a different method other than the up and down arrow key actions
            // only do so if the focus is actually on the accordion item and not on any of its children
            if (event.target === event.currentTarget) {
                const focusedItem = event.target;
                const focusedIndex = (this.activeItemIndex = Array.from(this.accordionItems).indexOf(focusedItem));
                if (this.activeItemIndex !== focusedIndex && focusedIndex !== -1) {
                    this.activeItemIndex = focusedIndex;
                    this.activeid = this.accordionIds[this.activeItemIndex];
                }
            }
        };
    }
    expandmodeChanged(prev, next) {
        if (!this.$fastController.isConnected) {
            return;
        }
        const expandedItem = this.findExpandedItem();
        if (!expandedItem) {
            return;
        }
        if (next !== AccordionExpandMode.single) {
            expandedItem === null || expandedItem === void 0 ? void 0 : expandedItem.expandbutton.removeAttribute("aria-disabled");
        }
        else {
            this.setSingleExpandMode(expandedItem);
        }
    }
    /**
     * @internal
     */
    slottedAccordionItemsChanged(oldValue, newValue) {
        if (this.$fastController.isConnected) {
            this.setItems();
        }
    }
    /**
     * @internal
     */
    handleChange(source, propertyName) {
        if (propertyName === "disabled") {
            this.setItems();
        }
        else if (propertyName === "expanded") {
            // we only need to manage single expanded instances
            // such as scenarios where a child is programatically expanded
            if (source.expanded && this.isSingleExpandMode()) {
                this.setSingleExpandMode(source);
            }
        }
    }
    findExpandedItem() {
        var _a;
        if (this.accordionItems.length === 0) {
            return null;
        }
        return ((_a = this.accordionItems.find((item) => item instanceof FASTAccordionItem && item.expanded)) !== null && _a !== void 0 ? _a : this.accordionItems[0]);
    }
    setSingleExpandMode(expandedItem) {
        if (this.accordionItems.length === 0) {
            return;
        }
        const currentItems = Array.from(this.accordionItems);
        this.activeItemIndex = currentItems.indexOf(expandedItem);
        currentItems.forEach((item, index) => {
            if (this.activeItemIndex === index) {
                item.expanded = true;
                item.expandbutton.setAttribute("aria-disabled", "true");
            }
            else {
                item.expanded = false;
                if (!item.hasAttribute("disabled")) {
                    item.expandbutton.removeAttribute("aria-disabled");
                }
            }
        });
    }
    getItemIds() {
        return this.slottedAccordionItems.map((accordionItem) => {
            return accordionItem.id;
        });
    }
    isSingleExpandMode() {
        return this.expandmode === AccordionExpandMode.single;
    }
    adjust(adjustment) {
        this.activeItemIndex = wrapInBounds(0, this.accordionItems.length - 1, this.activeItemIndex + adjustment);
        this.focusItem();
    }
    focusItem() {
        const element = this.accordionItems[this.activeItemIndex];
        if (element instanceof FASTAccordionItem) {
            element.expandbutton.focus();
        }
    }
}
__decorate([
    attr({ attribute: "expand-mode" })
], FASTAccordion.prototype, "expandmode", void 0);
__decorate([
    observable
], FASTAccordion.prototype, "slottedAccordionItems", void 0);
