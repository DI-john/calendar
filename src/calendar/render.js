import { DAYS } from "./days";
import {
  isLeapYear,
  getMonthStartDay,
  getMonthEndDay,
  prevMonth,
} from "./util";

const renderCollection = (tpl, dataList) => {
  return dataList.map((dataItem) => tpl(dataItem)).join("");
};

const DAY_HEADING_TPL = (data) => `
  <div class="month__day-heading">
    ${data.shortName}
  </div>
`;

const DAY_HEADINGS_TPL = (data) => `
  <div class="month__day-headings">
    ${renderCollection(DAY_HEADING_TPL, data.dayHeadings)}
  </div>
`;

const dayClass = (data) => (data.isCurrentMonth ? "month__day--current" : "");

const DAY_TPL = (data) => `
  <div class="month__day ${dayClass(data)}">
    <span class="month__day-number">
      ${data.number}
    </span>
  </div>
`;

const DAYS_TPL = (data) => `
  <div class="month__days">
    ${renderCollection(DAY_TPL, data.days)}
  </div>
`;

const MONTH_TPL = (data) => `
  <div class="month">
    <div class="month__header">
      ${data.month.name} ${data.year}
    </div>
    <div class="month__content">
      ${DAY_HEADINGS_TPL(data)}

      ${DAYS_TPL(data)}
    </div>
  </div>
`;

function range(min, max) {
  const arr = [];

  for (let i = min; i <= max; i++) {
    arr.push(i);
  }

  return arr;
}

export function renderMonth(month, year) {
  const startDay = getMonthStartDay(month, year);
  const endDay = getMonthEndDay(month, year);
  const daysProp = isLeapYear(year) ? "leapYearDays" : "days";
  const daysInMonth = month[daysProp];

  const monthCells = range(1, daysInMonth).map((value) => {
    return {
      number: value,
      isCurrentMonth: true,
    };
  });

  const priorMonth = prevMonth(month);
  const daysInPrevMonth = priorMonth[daysProp];
  const prevMonthDayCount = startDay.number - DAYS.SUNDAY.number;

  const prevMonthCells = range(
    daysInPrevMonth - prevMonthDayCount + 1,
    daysInPrevMonth
  ).map((value) => {
    return {
      number: value,
      isCurrentMonth: false,
    };
  });

  const nextMonthDayCount = DAYS.SATURDAY.number - endDay.number;

  const nextMonthCells = range(1, nextMonthDayCount).map((value) => {
    return {
      number: value,
      isCurrentMonth: false,
    };
  });

  const data = {
    dayHeadings: Object.values(DAYS),
    month: month,
    year: year,
    days: [prevMonthCells, monthCells, nextMonthCells].flat(),
  };

  const container = document.createElement("div");
  const rawHtml = MONTH_TPL(data);
  container.innerHTML = rawHtml;

  return container;
}
