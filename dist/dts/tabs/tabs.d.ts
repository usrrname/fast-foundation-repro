import { FASTElement } from "@microsoft/fast-element";
import { StartEnd } from "../patterns/start-end.js";
import { TabsOrientation } from "./tabs.options.js";
/**
 * A Tabs Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#tablist | ARIA tablist }.
 *
 * @slot start - Content which can be provided before the tablist element
 * @slot end - Content which can be provided after the tablist element
 * @slot tab - The slot for tabs
 * @slot tabpanel - The slot for tabpanels
 * @csspart tablist - The element wrapping for the tabs
 * @csspart activeIndicator - The visual indicator
 * @fires change - Fires a custom 'change' event when a tab is clicked or during keyboard navigation
 *
 * @public
 */
export declare class FASTTabs extends FASTElement {
    /**
     * The orientation
     * @public
     * @remarks
     * HTML Attribute: orientation
     */
    orientation: TabsOrientation;
    /**
     * @internal
     */
    orientationChanged(): void;
    /**
     * The id of the active tab
     *
     * @public
     * @remarks
     * HTML Attribute: activeid
     */
    activeid: string;
    /**
     * @internal
     */
    activeidChanged(oldValue: string, newValue: string): void;
    /**
     * @internal
     */
    tabs: HTMLElement[];
    /**
     * @internal
     */
    tabsChanged(): void;
    /**
     * @internal
     */
    tabpanels: HTMLElement[];
    /**
     * @internal
     */
    tabpanelsChanged(): void;
    /**
     * Whether or not to show the active indicator
     * @public
     * @remarks
     * HTML Attribute: activeindicator
     */
    hideActiveIndicator: boolean;
    /**
     * @internal
     */
    activeIndicatorRef: HTMLElement;
    /**
     * @internal
     */
    showActiveIndicator: boolean;
    /**
     * A reference to the active tab
     * @public
     */
    activetab: HTMLElement;
    private prevActiveTabIndex;
    private activeTabIndex;
    private ticking;
    private tabIds;
    private tabpanelIds;
    private change;
    private isDisabledElement;
    private isFocusableElement;
    private getActiveIndex;
    private setTabs;
    private setTabPanels;
    private getTabIds;
    private getTabPanelIds;
    private setComponent;
    private handleTabClick;
    private isHorizontal;
    private handleTabKeyDown;
    private handleActiveIndicatorPosition;
    private animateActiveIndicator;
    /**
     * The adjust method for FASTTabs
     * @public
     * @remarks
     * This method allows the active index to be adjusted by numerical increments
     */
    adjust(adjustment: number): void;
    private adjustForward;
    private adjustBackward;
    private moveToTabByIndex;
    private focusTab;
    /**
     * @internal
     */
    connectedCallback(): void;
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface FASTTabs extends StartEnd {
}
