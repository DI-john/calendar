import { expect, test } from "vitest";
import {
  isLeapYear,
  nextDay,
  nextMonth,
  prevDay,
  prevMonth,
  getMonthStartDay,
  getMonthEndDay,
} from "../../src/calendar/util";
import { DAYS } from "../../src/calendar/days";
import { MONTHS } from "../../src/calendar/months";

test("isLeapYear", () => {
  const LEAP_YEARS = [4, 1992, 1996, 2000, 2004, 2008];

  const NOT_LEAP_YEARS = [500, 1700, 1800, 1900, 2001, 2002, 2003];

  LEAP_YEARS.forEach((year) => {
    expect(isLeapYear(year)).toBe(true);
  });

  NOT_LEAP_YEARS.forEach((year) => {
    expect(isLeapYear(year)).toBe(false);
  });
});

test("nextDay", () => {
  expect(nextDay(DAYS.SUNDAY)).toBe(DAYS.MONDAY);
  expect(nextDay(DAYS.WEDNESDAY)).toBe(DAYS.THURSDAY);
  expect(nextDay(DAYS.SATURDAY)).toBe(DAYS.SUNDAY);
});

test("nextMonth", () => {
  expect(nextMonth(MONTHS.JANUARY)).toBe(MONTHS.FEBRUARY);
  expect(nextMonth(MONTHS.JULY)).toBe(MONTHS.AUGUST);
  expect(nextMonth(MONTHS.DECEMBER)).toBe(MONTHS.JANUARY);
});

test("prevDay", () => {
  expect(prevDay(DAYS.SATURDAY)).toBe(DAYS.FRIDAY);
  expect(prevDay(DAYS.WEDNESDAY)).toBe(DAYS.TUESDAY);
  expect(prevDay(DAYS.SUNDAY)).toBe(DAYS.SATURDAY);
});

test("prevMonth", () => {
  expect(prevMonth(MONTHS.DECEMBER)).toBe(MONTHS.NOVEMBER);
  expect(prevMonth(MONTHS.JULY)).toBe(MONTHS.JUNE);
  expect(prevMonth(MONTHS.JANUARY)).toBe(MONTHS.DECEMBER);
});

test("getMonthStartDay", () => {
  expect(getMonthStartDay(MONTHS.JANUARY, 2022)).toBe(DAYS.SATURDAY);
  expect(getMonthStartDay(MONTHS.OCTOBER, 2022)).toBe(DAYS.SATURDAY);
  expect(getMonthStartDay(MONTHS.NOVEMBER, 2034)).toBe(DAYS.WEDNESDAY);

  expect(getMonthStartDay(MONTHS.DECEMBER, 2021)).toBe(DAYS.WEDNESDAY);
  expect(getMonthStartDay(MONTHS.FEBRUARY, 1982)).toBe(DAYS.MONDAY);
  expect(getMonthStartDay(MONTHS.FEBRUARY, 1962)).toBe(DAYS.THURSDAY);
});

test("getMonthEndDay", () => {
  expect(getMonthEndDay(MONTHS.JANUARY, 2022)).toBe(DAYS.MONDAY);
  expect(getMonthEndDay(MONTHS.NOVEMBER, 2022)).toBe(DAYS.WEDNESDAY);
  expect(getMonthEndDay(MONTHS.DECEMBER, 2022)).toBe(DAYS.SATURDAY);
});
