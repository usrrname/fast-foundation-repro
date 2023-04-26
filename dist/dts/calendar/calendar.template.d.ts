import { ElementViewTemplate } from "@microsoft/fast-element";
import type { ViewTemplate } from "@microsoft/fast-element";
import type { CalendarDateInfo, CalendarOptions, FASTCalendar, WeekdayText } from "./calendar.js";
/**
 * A basic Calendar title template that includes the month and year
 * @returns - A calendar title template
 * @public
 */
export declare function calendarTitleTemplate<T extends FASTCalendar>(): ViewTemplate<T>;
/**
 * Calendar weekday label template
 * @returns - The weekday labels template
 * @public
 */
export declare function calendarWeekdayTemplate(options: CalendarOptions): ViewTemplate<WeekdayText>;
/**
 * A calendar day template
 * @param context - Element definition context for getting the cell tag for calendar-cell
 * @param todayString - A string representation for todays date
 * @returns - A calendar cell template for a given date
 * @public
 */
export declare function calendarCellTemplate(options: CalendarOptions, todayString: string): ViewTemplate<CalendarDateInfo>;
/**
 *
 * @param context - Element definition context for getting the cell tag for calendar-cell
 * @param todayString - A string representation for todays date
 * @returns - A template for a week of days
 * @public
 */
export declare function calendarRowTemplate(options: CalendarOptions, todayString: string): ViewTemplate;
/**
 * Interactive template using DataGrid
 * @param context - The templates context
 * @param todayString - string representation of todays date
 * @returns - interactive calendar template
 *
 * @internal
 */
export declare function interactiveCalendarGridTemplate<T extends FASTCalendar>(options: CalendarOptions, todayString: string): ViewTemplate<T>;
/**
 * Non-interactive calendar template used for a readonly calendar
 * @param todayString - string representation of todays date
 * @returns - non-interactive calendar template
 *
 * @internal
 */
export declare function noninteractiveCalendarTemplate<T extends FASTCalendar>(options: CalendarOptions, todayString: string): ViewTemplate<T>;
/**
 * The template for the {@link @microsoft/fast-foundation#(FASTCalendar:class)} component.
 *
 * @param context - Element definition context for getting the cell tag for calendar-cell
 * @param definition - Foundation element definition
 * @returns - a template for a calendar month
 * @public
 */
export declare function calendarTemplate<T extends FASTCalendar>(options: CalendarOptions): ElementViewTemplate<T>;
