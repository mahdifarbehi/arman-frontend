import PersianDate from "persian-date";
import  DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";

/**
 * Converts an ISO 8601 formatted date string to a Persian date-time string.
 * @param {string} isoDateTime - The ISO 8601 formatted date-time string.
 * @returns {string} - The Persian date-time string in the format "YYYY/MM/DD HH:mm".
 */
export function isoToPersian(isoDateTime: string): string {
  try {
    const jsDate = new Date(isoDateTime);

    if (isNaN(jsDate.getTime())) {
      throw new Error("Invalid ISO 8601 date-time string.");
    }

    const persianDate = new PersianDate(jsDate);
    return persianDate.format("dddd YYYY/MM/DD HH:mm");
  } catch (error) {
    console.error("Error in isoToPersian:", error.message);
    throw new Error("Failed to convert ISO to Persian date.");
  }
}

/**
 * Converts a Persian date-time string to an ISO 8601 formatted string.
 * @param {string} persianDateTime - The Persian date-time string in the format "YYYY/MM/DD HH:mm".
 * @returns {string} - The ISO 8601 formatted date-time string.
 */
// export function persianToISO(persianDateTime: string): string {
//   try {
//     // Convert Persian numerals to English numerals
//     const englishDateTime = convertPersianToEnglishNumerals(persianDateTime);

//     // Remove the weekday name (e.g., پنج‌شنبه) if present
//     const sanitizedDateTime = englishDateTime.replace(/^[^\d]+/, "").trim();

//     // Parse date and time components
//     const [datePart, timePart] = sanitizedDateTime.split(" ");
//     if (!datePart || !timePart) {
//       throw new Error("Invalid Persian date-time format.");
//     }

//     const [year, month, day] = datePart.split("/").map(Number);
//     const [hour, minute] = timePart.split(":").map(Number);

//     if (
//       isNaN(year) ||
//       isNaN(month) ||
//       isNaN(day) ||
//       isNaN(hour) ||
//       isNaN(minute)
//     ) {
//       throw new Error("Invalid Persian date-time values.");
//     }

//     // Create DateObject using Persian calendar
//     const persianDate = new DateObject({
//       year,
//       month,
//       day,
//       hour,
//       minute,
//       calendar: persian,
//     });

//     // Convert to JavaScript Date object
//     const jsDate = persianDate.toDate();

//     if (isNaN(jsDate.getTime())) {
//       throw new Error("Invalid DateObject conversion.");
//     }

//     // Return ISO 8601 formatted string
//     return jsDate.toISOString();
//   } catch (error) {
//     console.error("Error in persianToISO:", error.message);
//     throw new Error("Failed to convert Persian date to ISO.");
//   }
// }
export function persianToISO(persianDateTime: string): string {
  try {
    // Step 1: Convert Persian numerals to English numerals
    const englishDateTime = convertPersianToEnglishNumerals(persianDateTime);

    // Step 2: Remove the weekday name (e.g., سه شنبه) if present
    const sanitizedDateTime = englishDateTime.replace(/^[^\d]+/, "").trim();

    // Step 3: Split date and time parts
    const [datePart, timePart] = sanitizedDateTime
      .replace(",", "") // Remove any comma delimiter
      .trim()
      .split(" ");

    if (!datePart || (timePart && !timePart.includes(":"))) {
      throw new Error("Invalid Persian date-time format.");
    }

    // Step 4: Parse date
    const [year, month, day] = datePart.split("/").map(Number);

    // Step 5: Parse time (optional)
    let hour = 0,
      minute = 0;
    if (timePart) {
      [hour, minute] = timePart.split(":").map(Number);
    }

    if (
      isNaN(year) ||
      isNaN(month) ||
      isNaN(day) ||
      isNaN(hour) ||
      isNaN(minute)
    ) {
      throw new Error("Invalid Persian date-time values.");
    }

    // Step 6: Create DateObject using the Persian calendar
    const persianDate = new DateObject({
      year,
      month,
      day,
      hour,
      minute,
      calendar: persian,
    });

    // Step 7: Convert to JavaScript Date object
    const jsDate = persianDate.toDate();

    if (isNaN(jsDate.getTime())) {
      throw new Error("Invalid DateObject conversion.");
    }

    // Step 8: Return ISO 8601 formatted string
    return jsDate.toISOString();
  } catch (error) {
    console.error("Error in persianToISO:", error.message);
    throw new Error("Failed to convert Persian date to ISO.");
  }
}


/**
 * Converts Persian numerals in a string to English numerals.
 * @param {string} str - The input string containing Persian numerals.
 * @returns {string} - The string with Persian numerals converted to English.
 */
function convertPersianToEnglishNumerals(str: string): string {
  const persianToEnglishMap = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };

  return str.replace(/[۰-۹]/g, (match) => persianToEnglishMap[match]);
}
