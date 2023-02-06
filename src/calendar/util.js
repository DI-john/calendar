import { MONTHS } from "./months";
import { DAYS } from "./days";

export function isLeapYear(year) {
  if (year % 4 !== 0) {
    return false;
  }

  if (year % 100 !== 0) {
    return true;
  }

  return year % 400 === 0;
}

export function nextDay(day) {
  const index = day.number - 1;
  const newNumber = ((index + 1) % 7) + 1;

  return Object.values(DAYS).find((day) => {
    return day.number == newNumber;
  });
}

export function nextMonth(month) {
  const index = month.number - 1;
  const newNumber = ((index + 1) % 12) + 1;

  return Object.values(MONTHS).find((month) => {
    return month.number == newNumber;
  });
}

export function prevDay(day) {
  const index = day.number - 1;
  const newNumber = ((index + 6) % 7) + 1;

  return Object.values(DAYS).find((day) => {
    return day.number == newNumber;
  });
}

export function prevMonth(month) {
  const index = month.number - 1;
  const newNumber = ((index + 11) % 12) + 1;

  return Object.values(MONTHS).find((month) => {
    return month.number == newNumber;
  });
}

const ANCHOR_DATE = {
  dayOfMonth: 1,
  month: MONTHS.JANUARY,
  year: 2022,
  day: DAYS.SATURDAY,
};

export function getMonthStartDay(month, year) {
  if (month == undefined) {
    throw new Error("Missing required month!");
  }

  if (year == undefined) {
    throw new Error("Missing required year!");
  }

  if (month == ANCHOR_DATE.month && year == ANCHOR_DATE.year) {
    return ANCHOR_DATE.day;
  }

  // figure out if this is before or after the anchor date
  const isAfterAnchor = ((month, year) => {
    if (year > ANCHOR_DATE.year) {
      return true;
    } else if (year < ANCHOR_DATE.year) {
      return false;
    }

    return month.number > ANCHOR_DATE.month.number;
  })(month, year);

  // iterate until you reach the day
  let currentDay = ANCHOR_DATE.day;
  let currentDayOfMonth = ANCHOR_DATE.dayOfMonth;
  let currentMonth = ANCHOR_DATE.month;
  let currentYear = ANCHOR_DATE.year;
  let done = false;

  while (!done) {
    if (isAfterAnchor) {
      // advance the day
      currentDayOfMonth++;
      currentDay = nextDay(currentDay);

      const daysProp = isLeapYear(currentYear) ? "leapYearDays" : "days";

      // advance month as needed
      if (currentDayOfMonth > currentMonth[daysProp]) {
        currentDayOfMonth = 1;

        currentMonth = nextMonth(currentMonth);

        // advance year as needed
        if (currentMonth == MONTHS.JANUARY) {
          currentYear++;
        }
      }
    } else {
      // retreat the day
      currentDayOfMonth--;
      currentDay = prevDay(currentDay);

      // retreat month as needed
      if (currentDayOfMonth < 1) {
        currentMonth = prevMonth(currentMonth);

        // retreat year as needed
        if (currentMonth == MONTHS.DECEMBER) {
          currentYear--;
        }

        const daysProp = isLeapYear(currentYear) ? "leapYearDays" : "days";
        currentDayOfMonth = currentMonth[daysProp];
      }
    }

    done =
      currentDayOfMonth == 1 && currentMonth == month && currentYear == year;
  }

  return currentDay;
}

export function getMonthEndDay(month, year) {
  const upcomingMonth = nextMonth(month);

  if (upcomingMonth == MONTHS.JANUARY) {
    year++;
  }

  return prevDay(getMonthStartDay(upcomingMonth, year));
}

export function getCurrentMonth() {
  const monthNumber = new Date().getMonth() + 1;

  const [_k, result] = Object.entries(MONTHS).find(([_k, month]) => {
    return month.number == monthNumber;
  });

  return result;
}

export function getCurrentYear() {
  return new Date().getFullYear();
}
