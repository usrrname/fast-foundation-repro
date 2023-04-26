import { FASTElement } from "@microsoft/fast-element";
import type { StaticallyComposableHTML } from "../utilities/template-helpers.js";
import { StartEnd, TemplateElementDependency } from "../patterns/index.js";
import type { StartEndOptions } from "../patterns/start-end.js";
import { DayFormat, MonthFormat, WeekdayFormat, YearFormat } from "./calendar.options.js";
import { DateFormatter } from "./date-formatter.js";
/**
 * Information about a month
 * @public
 */
export type MonthInfo = {
    month: number;
    year: number;
    length: number;
    start: number;
};
/**
 * Calendar information needed for rendering
 * including the next and previous months
 * @public
 */
export type CalendarInfo = MonthInfo & {
    previous: MonthInfo;
    next: MonthInfo;
};
/**
 * Caldendar date info
 * used to represent a date
 * @public
 */
export type CalendarDateInfo = {
    day: number;
    month: number;
    year: number;
    disabled?: boolean;
    selected?: boolean;
};
/**
 * Calendar weekday text.
 * @public
 */
export type WeekdayText = {
    text: string;
    abbr?: string;
};
/**
 * Calendar configuration options
 * @public
 */
export type CalendarOptions = StartEndOptions<FASTCalendar> & {
    dataGridCell: TemplateElementDependency;
    dataGridRow: TemplateElementDependency;
    dataGrid: TemplateElementDependency;
    title?: StaticallyComposableHTML<FASTCalendar>;
};
/**
 * Calendar component
 *
 * @slot start - Content which can be provided before the calendar content
 * @slot end - Content which can be provided after the calendar content
 * @slot - The default slot for calendar content
 * @fires dateselected - Fires a custom 'dateselected' event when Enter is invoked via keyboard on a date
 *
 * @public
 */
export declare class FASTCalendar extends FASTElement {
    /**
     * date formatter utitlity for getting localized strings
     * @public
     */
    dateFormatter: DateFormatter;
    /**
     * Readonly attribute for turning off data-grid
     * @public
     */
    readonly: boolean;
    /**
     * String repesentation of the full locale including market, calendar type and numbering system
     * @public
     */
    locale: string;
    protected localeChanged(): void;
    /**
     * Weekday that the calendar should start on, defaults to Sunday
     * @public
     */
    firstDay: number;
    /**
     * Month to display
     * @public
     */
    month: number;
    /**
     * Year of the month to display
     * @public
     */
    year: number;
    /**
     * Format style for the day
     * @public
     */
    dayFormat: DayFormat;
    protected dayFormatChanged(): void;
    /**
     * Format style for the week day labels
     * @public
     */
    weekdayFormat: WeekdayFormat;
    protected weekdayFormatChanged(): void;
    /**
     * Format style for the month label
     * @public
     */
    monthFormat: MonthFormat;
    protected monthFormatChanged(): void;
    /**
     * Format style for the year used in the title
     * @public
     */
    yearFormat: YearFormat;
    protected yearFormatChanged(): void;
    /**
     * Minimum number of weeks to show for the month
     * This can be used to normalize the calendar view
     *  when changing or across multiple calendars
     * @public
     */
    minWeeks: number;
    /**
     * A list of dates that should be shown as disabled
     * @public
     */
    disabledDates: string;
    /**
     * A list of dates that should be shown as highlighted
     * @public
     */
    selectedDates: string;
    /**
     * The number of miliseconds in a day
     * @internal
     */
    private oneDayInMs;
    /**
     * Gets data needed to render about a calendar month as well as the previous and next months
     * @param year - year of the calendar
     * @param month - month of the calendar
     * @returns - an object with data about the current and 2 surrounding months
     * @public
     */
    getMonthInfo(month?: number, year?: number): CalendarInfo;
    /**
     * A list of calendar days
     * @param info - an object containing the information needed to render a calendar month
     * @param minWeeks - minimum number of weeks to show
     * @returns a list of days in a calendar month
     * @public
     */
    getDays(info?: CalendarInfo, minWeeks?: number): CalendarDateInfo[][];
    /**
     * A helper function that checks if a date exists in a list of dates
     * @param date - A date objec that includes the day, month and year
     * @param datesString - a comma separated list of dates
     * @returns - Returns true if it found the date in the list of dates
     * @public
     */
    dateInString(date: Date | string, datesString: string): boolean;
    /**
     * Creates a class string for the day container
     * @param date - date of the calendar cell
     * @returns - string of class names
     * @public
     */
    getDayClassNames(date: CalendarDateInfo, todayString?: string): string;
    /**
     * Returns a list of weekday labels
     * @returns An array of weekday text and full text if abbreviated
     * @public
     */
    getWeekdayText(): WeekdayText[];
    /**
     * Emits the "date-select" event with the day, month and year.
     * @param date - Date cell
     * @public
     */
    handleDateSelect(event: Event, day: CalendarDateInfo): void;
    /**
     * Handles keyboard events on a cell
     * @param event - Keyboard event
     * @param date - Date of the cell selected
     */
    handleKeydown(event: KeyboardEvent, date: CalendarDateInfo): boolean;
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface FASTCalendar extends StartEnd {
}
