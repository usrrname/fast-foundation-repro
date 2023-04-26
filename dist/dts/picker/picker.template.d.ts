import { ElementViewTemplate } from "@microsoft/fast-element";
import { TemplateElementDependency } from "../patterns/tag-for.js";
import type { FASTPicker } from "./picker.js";
/**
 * Picker configuration options
 * @public
 */
export type PickerOptions = {
    anchoredRegion: TemplateElementDependency;
    pickerMenu: TemplateElementDependency;
    pickerMenuOption: TemplateElementDependency;
    pickerList: TemplateElementDependency;
    pickerListItem: TemplateElementDependency;
    progressRing: TemplateElementDependency;
};
/**
 * The template for the List Picker component.
 * @public
 */
export declare function pickerTemplate<T extends FASTPicker>(options: PickerOptions): ElementViewTemplate<T>;
