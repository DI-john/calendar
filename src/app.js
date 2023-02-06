import { renderMonth } from "./calendar/render";
import { getCurrentMonth, getCurrentYear } from "./calendar/util";

const ROOT_SELECTOR = "#app-root";
const rootEl = document.querySelector(ROOT_SELECTOR);

const monthEl = renderMonth(getCurrentMonth(), getCurrentYear());
rootEl.appendChild(monthEl);
