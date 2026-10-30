import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export function perthNow() {
  return new Date().toLocaleString("en-AU", { timeZone: "Australia/Perth" });
}

export function perthGreeting() {
  const hour = Number(
    new Intl.DateTimeFormat("en-AU", { timeZone: "Australia/Perth", hour: "numeric", hour12: false }).format(new Date()),
  );
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function perthShortDate() {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Perth",
    day: "numeric",
    month: "short",
  }).format(new Date());
}

export function perthShortDateYear() {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Perth",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());
}

export function perthClock() {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Perth",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  })
    .format(new Date())
    .replace(/\u202f/g, " ");
}

export function displayClock(value: string) {
  if (!value) return "";
  if (value.includes("T") || value.includes(",")) {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) {
      return new Intl.DateTimeFormat("en-AU", {
        timeZone: "Australia/Perth",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      })
        .format(d)
        .replace(/\u202f/g, " ");
    }
  }
  return value;
}

export function hoursBetween(start: string, end: string) {
  const mins = (v: string) => {
    const m = v.match(/(\d{1,2}):(\d{2})/);
    if (!m) return null;
    const h = Number(m[1]);
    const min = Number(m[2]);
    if (h > 23 || min > 59) return null;
    return h * 60 + min;
  };
  const a = mins(start);
  const b = mins(end);
  if (a == null || b == null || b === a) return 0;
  const diff = b < a ? b + 24 * 60 - a : b - a;
  return Math.round((diff / 60) * 10) / 10;
}

export function perthDate() {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Perth",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}
