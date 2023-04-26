import type { ValuesOf } from "../utilities/index.js";
/**
 * Day format values for DateFormatter.
 * @public
 */
export declare const DayFormat: {
    readonly "2-digit": "2-digit";
    readonly numeric: "numeric";
};
/**
 * Day format type for DateFormatter.
 * @public
 */
export type DayFormat = ValuesOf<typeof DayFormat>;
/**
 * Weekday format values for DateFormatter.
 * @public
 */
export declare const WeekdayFormat: {
    readonly long: "long";
    readonly narrow: "narrow";
    readonly short: "short";
};
/**
 * Weekday format type for DateFormatter.
 * @public
 */
export type WeekdayFormat = ValuesOf<typeof WeekdayFormat>;
/**
 * Month format values for DateFormatter.
 * @public
 */
export declare const MonthFormat: {
    readonly "2-digit": "2-digit";
    readonly numeric: "numeric";
    readonly short: "short";
    readonly long: "long";
    readonly narrow: "narrow";
};
/**
 * Month format type for DateFormatter.
 * @public
 */
export type MonthFormat = ValuesOf<typeof MonthFormat>;
/**
 * Year format values for DateFormatter.
 * @public
 */
export declare const YearFormat: {
    readonly "2-digit": "2-digit";
    readonly numeric: "numeric";
};
/**
 * Year format type for DateFormatter.
 * @public
 */
export type YearFormat = ValuesOf<typeof YearFormat>;
