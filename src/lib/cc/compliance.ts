import type { Staff } from "./types";

const MONTHS: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

/** National maxima, NDIS Pricing Schedule 2026-27 (effective 24 Sep 2026), standard self-care. Cents. */
const RATE = {
  weekday: { cents: 7358, item: "01_011_0107_1_1", label: "weekday daytime" },
  saturday: { cents: 10354, item: "01_013_0107_1_1", label: "Saturday" },
  sunday: { cents: 13350, item: "01_014_0107_1_1", label: "Sunday" },
} as const;

export type ClaimRate = { cents: number; item: string; label: string; dollars: number };

function perthYear() {
  return Number(new Intl.DateTimeFormat("en-AU", { timeZone: "Australia/Perth", year: "numeric" }).format(new Date()));
}

export function rateForDate(dateLabel: string): ClaimRate {
  const m = dateLabel.match(/(\d{1,2})\s+([A-Za-z]{3})(?:\s+(\d{4}))?/);
  const month = m ? MONTHS[m[2]] : undefined;
  let band: (typeof RATE)[keyof typeof RATE] = RATE.weekday;
  if (m && month != null) {
    const day = new Date(Date.UTC(m[3] ? Number(m[3]) : perthYear(), month, Number(m[1]))).getUTCDay();
    if (day === 6) band = RATE.saturday;
    else if (day === 0) band = RATE.sunday;
  }
  return { ...band, dollars: band.cents / 100 };
}

export function claimCents(hours: number, date: string) {
  return Math.round(hours * rateForDate(date).cents);
}

export function money(n: number) {
  const whole = Math.abs(n - Math.round(n)) < 0.001;
  return n.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export const CLAIM_NOTE =
  "Hours are priced at the national self-care limit for that day (weekday daytime $73.58, Saturday $103.54, Sunday $133.50). Evening, night and public holidays are not split out. Usually GST-free. This demo does not lodge a claim with the NDIA.";

export function rosterHold(s: Pick<Staff, "name" | "status" | "wwcc" | "firstAid" | "ndisScreening">): string | null {
  if (s.status === "leave") return `${s.name} is on leave`;
  if (s.ndisScreening === "expired" || s.ndisScreening === "missing") {
    return `${s.name} does not have a current NDIS Worker Screening Check`;
  }
  if (s.wwcc === "expired") return `${s.name} has an expired Working with Children Check`;
  if (s.firstAid === "expired") return `${s.name} has expired first aid`;
  return null;
}

export function rosterWarn(s: Pick<Staff, "name" | "wwcc" | "firstAid" | "ndisScreening">): string | null {
  const bits: string[] = [];
  if (s.ndisScreening === "expiring") bits.push("NDIS screening expiring");
  if (s.wwcc === "expiring") bits.push("WWCC expiring");
  if (s.firstAid === "expiring") bits.push("first aid expiring");
  return bits.length ? `${s.name}: ${bits.join(" · ")}` : null;
}
