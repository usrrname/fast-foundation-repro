import { __decorate } from "tslib";
import { attr, FASTElement, nullableNumberConverter } from "@microsoft/fast-element";
import { keyEnter } from "@microsoft/fast-web-utilities";
import { applyMixins } from "../utilities/apply-mixins.js";
import { StartEnd } from "../patterns/index.js";
import { DayFormat, MonthFormat, WeekdayFormat, YearFormat } from "./calendar.options.js";
import { DateFormatter } from "./date-formatter.js";
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
export class FASTCalendar extends FASTElement {
    constructor() {
        super(...arguments);
        /**
         * date formatter utitlity for getting localized strings
         * @public
         */
        this.dateFormatter = new DateFormatter();
        /**
         * Readonly attribute for turning off data-grid
         * @public
         */
        this.readonly = false;
        /**
         * String repesentation of the full locale including market, calendar type and numbering system
         * @public
         */
        this.locale = "en-US";
        /**
         * Weekday that the calendar should start on, defaults to Sunday
         * @public
         */
        this.firstDay = 0;
        /**
         * Month to display
         * @public
         */
        this.month = new Date().getMonth() + 1;
        /**
         * Year of the month to display
         * @public
         */
        this.year = new Date().getFullYear();
        /**
         * Format style for the day
         * @public
         */
        this.dayFormat = DayFormat.numeric;
        /**
         * Format style for the week day labels
         * @public
         */
        this.weekdayFormat = WeekdayFormat.short;
        /**
         * Format style for the month label
         * @public
         */
        this.monthFormat = MonthFormat.long;
        /**
         * Format style for the year used in the title
         * @public
         */
        this.yearFormat = YearFormat.numeric;
        /**
         * Minimum number of weeks to show for the month
         * This can be used to normalize the calendar view
         *  when changing or across multiple calendars
         * @public
         */
        this.minWeeks = 0;
        /**
         * A list of dates that should be shown as disabled
         * @public
         */
        this.disabledDates = "";
        /**
         * A list of dates that should be shown as highlighted
         * @public
         */
        this.selectedDates = "";
        /**
         * The number of miliseconds in a day
         * @internal
         */
        this.oneDayInMs = 86400000;
    }
    localeChanged() {
        this.dateFormatter.locale = this.locale;
    }
    dayFormatChanged() {
        this.dateFormatter.dayFormat = this.dayFormat;
    }
    weekdayFormatChanged() {
        this.dateFormatter.weekdayFormat = this.weekdayFormat;
    }
    monthFormatChanged() {
        this.dateFormatter.monthFormat = this.monthFormat;
    }
    yearFormatChanged() {
        this.dateFormatter.yearFormat = this.yearFormat;
    }
    /**
     * Gets data needed to render about a calendar month as well as the previous and next months
     * @param year - year of the calendar
     * @param month - month of the calendar
     * @returns - an object with data about the current and 2 surrounding months
     * @public
     */
    getMonthInfo(month = this.month, year = this.year) {
        const getFirstDay = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        const getLength = (date) => {
            const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
            return new Date(nextMonth.getTime() - this.oneDayInMs).getDate();
        };
        const thisMonth = new Date(year, month - 1);
        const nextMonth = new Date(year, month);
        const previousMonth = new Date(year, month - 2);
        return {
            length: getLength(thisMonth),
            month,
            start: getFirstDay(thisMonth),
            year,
            previous: {
                length: getLength(previousMonth),
                month: previousMonth.getMonth() + 1,
                start: getFirstDay(previousMonth),
                year: previousMonth.getFullYear(),
            },
            next: {
                length: getLength(nextMonth),
                month: nextMonth.getMonth() + 1,
                start: getFirstDay(nextMonth),
                year: nextMonth.getFullYear(),
            },
        };
    }
    /**
     * A list of calendar days
     * @param info - an object containing the information needed to render a calendar month
     * @param minWeeks - minimum number of weeks to show
     * @returns a list of days in a calendar month
     * @public
     */
    getDays(info = this.getMonthInfo(), minWeeks = this.minWeeks) {
        minWeeks = minWeeks > 10 ? 10 : minWeeks;
        const { length, previous, next } = info;
        let start = info.start - Math.min(Math.max(0, this.firstDay), 6);
        start = start < 0 ? 7 + start : start;
        const days = [];
        let dayCount = 1 - start;
        while (dayCount < length + 1 ||
            days.length < minWeeks ||
            days[days.length - 1].length % 7 !== 0) {
            const { month, year } = dayCount < 1 ? previous : dayCount > length ? next : info;
            const day = dayCount < 1
                ? previous.length + dayCount
                : dayCount > length
                    ? dayCount - length
                    : dayCount;
            const dateString = `${month}-${day}-${year}`;
            const disabled = this.dateInString(dateString, this.disabledDates);
            const selected = this.dateInString(dateString, this.selectedDates);
            const date = {
                day,
                month,
                year,
                disabled,
                selected,
            };
            const target = days[days.length - 1];
            if (days.length === 0 || target.length % 7 === 0) {
                days.push([date]);
            }
            else {
                target.push(date);
            }
            dayCount++;
        }
        return days;
    }
    /**
     * A helper function that checks if a date exists in a list of dates
     * @param date - A date objec that includes the day, month and year
     * @param datesString - a comma separated list of dates
     * @returns - Returns true if it found the date in the list of dates
     * @public
     */
    dateInString(date, datesString) {
        const dates = datesString.split(",").map(str => str.trim());
        date =
            typeof date === "string"
                ? date
                : `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
        return dates.some(d => d === date);
    }
    /**
     * Creates a class string for the day container
     * @param date - date of the calendar cell
     * @returns - string of class names
     * @public
     */
    getDayClassNames(date, todayString) {
        const { day, month, year, disabled, selected } = date;
        const today = todayString === `${month}-${day}-${year}`;
        const inactive = this.month !== month;
        return [
            "day",
            today && "today",
            inactive && "inactive",
            disabled && "disabled",
            selected && "selected",
        ]
            .filter(Boolean)
            .join(" ");
    }
    /**
     * Returns a list of weekday labels
     * @returns An array of weekday text and full text if abbreviated
     * @public
     */
    getWeekdayText() {
        const weekdayText = this.dateFormatter.getWeekdays().map(text => ({ text }));
        if (this.weekdayFormat !== "long") {
            const longText = this.dateFormatter.getWeekdays("long");
            weekdayText.forEach((weekday, index) => {
                weekday.abbr = longText[index];
            });
        }
        const firstDay = Math.min(Math.max(0, this.firstDay), 6);
        return [...weekdayText.slice(firstDay), ...weekdayText.slice(0, firstDay)];
    }
    /**
     * Emits the "date-select" event with the day, month and year.
     * @param date - Date cell
     * @public
     */
    handleDateSelect(event, day) {
        event.preventDefault;
        this.$emit("dateselected", day);
    }
    /**
     * Handles keyboard events on a cell
     * @param event - Keyboard event
     * @param date - Date of the cell selected
     */
    handleKeydown(event, date) {
        if (event.key === keyEnter) {
            this.handleDateSelect(event, date);
        }
        return true;
    }
}
__decorate([
    attr({ mode: "boolean" })
], FASTCalendar.prototype, "readonly", void 0);
__decorate([
    attr
], FASTCalendar.prototype, "locale", void 0);
__decorate([
    attr({ attribute: "first-day", converter: nullableNumberConverter })
], FASTCalendar.prototype, "firstDay", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTCalendar.prototype, "month", void 0);
__decorate([
    attr({ converter: nullableNumberConverter })
], FASTCalendar.prototype, "year", void 0);
__decorate([
    attr({ attribute: "day-format", mode: "fromView" })
], FASTCalendar.prototype, "dayFormat", void 0);
__decorate([
    attr({ attribute: "weekday-format", mode: "fromView" })
], FASTCalendar.prototype, "weekdayFormat", void 0);
__decorate([
    attr({ attribute: "month-format", mode: "fromView" })
], FASTCalendar.prototype, "monthFormat", void 0);
__decorate([
    attr({ attribute: "year-format", mode: "fromView" })
], FASTCalendar.prototype, "yearFormat", void 0);
__decorate([
    attr({ attribute: "min-weeks", converter: nullableNumberConverter })
], FASTCalendar.prototype, "minWeeks", void 0);
__decorate([
    attr({ attribute: "disabled-dates" })
], FASTCalendar.prototype, "disabledDates", void 0);
__decorate([
    attr({ attribute: "selected-dates" })
], FASTCalendar.prototype, "selectedDates", void 0);
applyMixins(FASTCalendar, StartEnd);
