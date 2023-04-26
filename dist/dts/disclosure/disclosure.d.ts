import { FASTElement } from "@microsoft/fast-element";
import { StartEnd } from "../patterns/start-end.js";
import type { StartEndOptions } from "../patterns/start-end.js";
/**
 * Disclosure configuration options
 * @public
 */
export type DisclosureOptions = StartEndOptions<FASTDisclosure>;
/**
 * A Disclosure Custom HTML Element.
 * Based largely on the {@link https://w3c.github.io/aria-practices/#disclosure | disclosure element }.
 *
 * @slot start - Content which can be provided before the summary content
 * @slot end - Content which can be provided after the summary content
 * @slot title - The summary content
 * @slot - The default slot for the disclosure content
 * @fires toggle - fires a toggle event when the summary is toggled
 *
 * @public
 */
export declare class FASTDisclosure extends FASTElement {
    /**
     * Determines if the element should show the extra content or not.
     *
     * @public
     */
    expanded: boolean;
    /**
     * Invoker title
     *
     * @public
     */
    summary: string;
    /**
     * @internal
     */
    details: HTMLDetailsElement;
    /**
     * @internal
     */
    connectedCallback(): void;
    /**
     * @internal
     */
    disconnectedCallback(): void;
    /**
     * Show extra content.
     */
    show(): void;
    /**
     * Hide extra content.
     */
    hide(): void;
    /**
     * Toggle the current(expanded/collapsed) state.
     */
    toggle(): void;
    /**
     * Register listener and set default disclosure mode
     */
    protected setup(): void;
    /**
     * Update the aria attr and fire `toggle` event
     */
    protected onToggle(): void;
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface FASTDisclosure extends StartEnd {
}
