import { ViewTemplate } from "@microsoft/fast-element";
import { AnchoredRegionConfig, FASTAnchoredRegion } from "../anchored-region/index.js";
import type { FASTPickerList } from "./picker-list.js";
import type { FASTPickerMenu } from "./picker-menu.js";
import { FormAssociatedPicker } from "./picker.form-associated.js";
import { MenuPlacement } from "./picker.options.js";
/**
 * A Picker Custom HTML Element.  This is an early "alpha" version of the component.
 * Developers should expect the api to evolve, breaking changes are possible.
 *
 * @beta
 */
export declare class FASTPicker extends FormAssociatedPicker {
    /**
     * Currently selected items. Comma delineated string ie. "apples,oranges".
     *
     * @remarks
     * HTML Attribute: selection
     */
    selection: string;
    protected selectionChanged(): void;
    /**
     * Currently available options. Comma delineated string ie. "apples,oranges".
     *
     * @remarks
     * HTML Attribute: options
     */
    options: string;
    protected optionsChanged(): void;
    /**
     * Whether the component should remove an option from the list when it is in the selection
     *
     * @remarks
     * HTML Attribute: filter-selected
     */
    filterSelected: boolean;
    /**
     * Whether the component should remove options based on the current query
     *
     * @remarks
     * HTML Attribute: filter-query
     */
    filterQuery: boolean;
    /**
     * The maximum number of items that can be selected.
     *
     * @remarks
     * HTML Attribute: max-selected
     */
    maxSelected: number | undefined;
    /**
     * The text to present to assistive technolgies when no suggestions are available.
     *
     * @remarks
     * HTML Attribute: no-suggestions-text
     */
    noSuggestionsText: string;
    /**
     *  The text to present to assistive technolgies when suggestions are available.
     *
     * @remarks
     * HTML Attribute: suggestions-available-text
     */
    suggestionsAvailableText: string;
    /**
     * The text to present to assistive technologies when suggestions are loading.
     *
     * @remarks
     * HTML Attribute: loading-text
     */
    loadingText: string;
    /**
     * Applied to the aria-label attribute of the input element
     *
     * @remarks
     * HTML Attribute: label
     */
    label: string;
    /**
     * Applied to the aria-labelledby attribute of the input element
     *
     * @remarks
     * HTML Attribute: labelledby
     */
    labelledBy: string;
    /**
     * Applied to the placeholder attribute of the input element
     *
     * @remarks
     * HTML Attribute: placholder
     */
    placeholder: string;
    /**
     * Controls menu placement
     *
     * @remarks
     * HTML Attribute: menu-placement
     */
    menuPlacement: MenuPlacement;
    protected menuPlacementChanged(): void;
    /**
     * Whether to display a loading state if the menu is opened.
     *
     */
    showLoading: boolean;
    protected showLoadingChanged(): void;
    /**
     * Template used to generate selected items.
     * This is used in a repeat directive.
     *
     */
    listItemTemplate: ViewTemplate;
    protected listItemTemplateChanged(): void;
    /**
     * Default template to use for selected items (usually specified in the component template).
     * This is used in a repeat directive.
     *
     */
    defaultListItemTemplate?: ViewTemplate;
    protected defaultListItemTemplateChanged(): void;
    /**
     * The item template currently in use.
     *
     * @internal
     */
    activeListItemTemplate?: ViewTemplate;
    /**
     * Template to use for available options.
     * This is used in a repeat directive.
     *
     */
    menuOptionTemplate: ViewTemplate;
    protected menuOptionTemplateChanged(): void;
    /**
     * Default template to use for available options (usually specified in the template).
     * This is used in a repeat directive.
     *
     */
    defaultMenuOptionTemplate?: ViewTemplate;
    protected defaultMenuOptionTemplateChanged(): void;
    /**
     * The option template currently in use.
     *
     * @internal
     */
    activeMenuOptionTemplate?: ViewTemplate;
    /**
     *  Template to use for the contents of a selected list item
     *
     */
    listItemContentsTemplate: ViewTemplate;
    /**
     *  Template to use for the contents of menu options
     *
     */
    menuOptionContentsTemplate: ViewTemplate;
    /**
     *  Current list of options in array form
     *
     */
    optionsList: string[];
    private optionsListChanged;
    /**
     * The text value currently in the input field
     *
     */
    query: string;
    protected queryChanged(): void;
    /**
     *  Current list of filtered options in array form
     *
     * @internal
     */
    filteredOptionsList: string[];
    protected filteredOptionsListChanged(): void;
    /**
     *  Indicates if the flyout menu is open or not
     *
     * @internal
     */
    flyoutOpen: boolean;
    protected flyoutOpenChanged(): void;
    /**
     *  The id of the menu element
     *
     * @internal
     */
    menuId: string;
    /**
     *  The tag for the selected list element (ie. "fast-picker-list" vs. "fluent-picker-list")
     *
     * @internal
     */
    selectedListTag: string;
    /**
     * The tag for the menu element (ie. "fast-picker-menu" vs. "fluent-picker-menu")
     *
     * @internal
     */
    menuTag: string;
    /**
     *  Index of currently active menu option
     *
     * @internal
     */
    menuFocusIndex: number;
    /**
     *  Id of currently active menu option.
     *
     * @internal
     */
    menuFocusOptionId: string | undefined;
    /**
     *  Internal flag to indicate no options available display should be shown.
     *
     * @internal
     */
    showNoOptions: boolean;
    private showNoOptionsChanged;
    /**
     *  The anchored region config to apply.
     *
     * @internal
     */
    menuConfig: AnchoredRegionConfig;
    /**
     *  Reference to the placeholder element for the repeat directive
     *
     */
    itemsPlaceholderElement: Node;
    /**
     * reference to the input element
     *
     * @internal
     */
    inputElement: HTMLInputElement;
    /**
     * reference to the selected list element
     *
     * @internal
     */
    listElement: FASTPickerList;
    /**
     * reference to the menu element
     *
     * @internal
     */
    menuElement: FASTPickerMenu;
    /**
     * reference to the anchored region element
     *
     * @internal
     */
    region: FASTAnchoredRegion;
    /**
     *
     *
     * @internal
     */
    selectedItems: string[];
    private optionsPlaceholder;
    private inputElementView;
    private behaviorOrchestrator;
    /**
     * @internal
     */
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Move focus to the input element
     * @public
     */
    focus(): void;
    /**
     * Initialize the component.  This is delayed a frame to ensure children are connected as well.
     */
    private initialize;
    /**
     * Toggles the menu flyout
     */
    private toggleFlyout;
    /**
     * Handle input event from input element
     */
    private handleTextInput;
    /**
     * Handle click event from input element
     */
    private handleInputClick;
    /**
     * Handle the menu options updated event from the child menu
     */
    private handleMenuOptionsUpdated;
    /**
     * Handle key down events.
     */
    handleKeyDown(e: KeyboardEvent): boolean;
    /**
     * Handle focus in events.
     */
    handleFocusIn(e: FocusEvent): boolean;
    /**
     * Handle focus out events.
     */
    handleFocusOut(e: FocusEvent): boolean;
    /**
     * The list of selected items has changed
     */
    handleSelectionChange(): void;
    /**
     * Anchored region is loaded, menu and options exist in the DOM.
     */
    handleRegionLoaded(e: Event): void;
    /**
     * Sets properties on the anchored region once it is instanciated.
     */
    private setRegionProps;
    /**
     * Checks if the maximum number of items has been chosen and updates the ui.
     */
    private checkMaxItems;
    /**
     * A list item has been invoked.
     */
    handleItemInvoke(e: Event): boolean;
    /**
     * A menu option has been invoked.
     */
    handleOptionInvoke(e: Event): boolean;
    /**
     * Increments the focused list item by the specified amount
     */
    private incrementFocusedItem;
    /**
     * Disables the menu. Note that the menu can be open, just doens't have any valid options on display.
     */
    private disableMenu;
    /**
     * Sets the currently focused menu option by index
     */
    private setFocusedOption;
    /**
     * Updates the template used for the list item repeat behavior
     */
    private updateListItemTemplate;
    /**
     * Updates the template used for the menu option repeat behavior
     */
    private updateOptionTemplate;
    /**
     * Updates the filtered options array
     */
    private updateFilteredOptions;
    /**
     * Updates the menu configuration
     */
    private updateMenuConfig;
    /**
     * matches menu placement values with the associated menu config
     */
    private configLookup;
}
