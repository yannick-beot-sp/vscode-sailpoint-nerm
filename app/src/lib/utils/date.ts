import { CalendarDate, type DateValue } from "@internationalized/date";

const dateFormat = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});
/**
 * Format the date for human readable
 * @param input if string, ISO8601 
 */
export function formatHumanReadableDate(input: Date | string | undefined) {
  if (input === undefined) { return "" }
  if (typeof input === "string") {
    input = new Date(input)
  }

  return dateFormat.format(input)
}

/**
 * Parse the string following a NERM format
 * @param value 
 * @param format 
 * @returns 
 */
export function parseDateString(
  value: string,
  format: string
): DateValue | undefined {
  if (!value) {
    return undefined;
  }

  const parts = value.split(/[-/]/);
  const formatParts = format.split(/[-/]/);

  if (parts.length !== 3 || formatParts.length !== 3) {
    return undefined; // Invalid value or format
  }

  let year: number | undefined;
  let month: number | undefined;
  let day: number | undefined;

  for (let i = 0; i < 3; i++) {
    const part = parseInt(parts[i], 10);
    const formatPart = formatParts[i].toLowerCase();

    if (isNaN(part)) {
      return undefined; // Invalid date part
    }

    if (formatPart === "mm") {
      month = part;
    } else if (formatPart === "dd") {
      day = part;
    } else if (formatPart === "yyyy") {
      year = part;
    }
  }

  if (year === undefined || month === undefined || day === undefined) {
    return undefined; // Missing date components
  }

  try {
    const dateValue = new CalendarDate(year, month, day);
    return dateValue;
  } catch (error) {
    console.error("Error creating DateValue:", error);
    return undefined;
  }
}

/**
 * Format the date according to NERM format
 * @param dateValue 
 * @param format 
 * @returns 
 */
export function formatDateValue(dateValue: DateValue, format: string): string {
  const pad = (num: number): string => num.toString().padStart(2, "0");
  const year = dateValue.year;
  const month = pad(dateValue.month);
  const day = pad(dateValue.day);

  switch (format.toLowerCase()) {
    case "mm/dd/yyyy":
      return `${month}/${day}/${year}`;
    case "mm-dd-yyyy":
      return `${month}-${day}-${year}`;
    case "dd/mm/yyyy":
      return `${day}/${month}/${year}`;
    case "dd-mm-yyyy":
      return `${day}-${month}-${year}`;
    case "yyyy/mm/dd":
      return `${year}/${month}/${day}`;
    case "yyyy-mm-dd":
      return `${year}-${month}-${day}`;
    default:
      return ""; // Invalid format
  }
}
