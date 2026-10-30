import type { DB } from "./types";

export const DEMO_PASSWORD = "Demo1234";

export const CLIENT_PORTAL = {
  username: "robert.thompson",
  accessCode: "472819",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function perthWall(offsetDays = 0) {
  const wall = new Date(new Date().toLocaleString("en-US", { timeZone: "Australia/Perth" }));
  wall.setDate(wall.getDate() + offsetDays);
  return wall;
}

function stamp(offsetDays: number) {
  const d = perthWall(offsetDays);
  const weekday = WEEK[d.getDay()];
  const month = MONTHS[d.getMonth()];
  return {
    weekday,
    date: d.getDate(),
    month,
    year: d.getFullYear(),
    label: `${weekday} ${d.getDate()} ${month}`,
    short: `${d.getDate()} ${month}`,
    long: `${d.getDate()} ${month} ${d.getFullYear()}`,
  };
}

const today = perthWall(0);
const mondayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay();
const week = Array.from({ length: 7 }, (_, i) => stamp(mondayOffset + i));
const todayIndex = Math.max(0, week.findIndex((d) => d.date === today.getDate() && d.month === MONTHS[today.getMonth()]));

function shiftStatus(dayIndex: number, live = false): "complete" | "in_progress" | "scheduled" {
  if (dayIndex < todayIndex) return "complete";
  if (dayIndex === todayIndex && live) return "in_progress";
  return "scheduled";
}

const liveDay = todayIndex;
const nextDay = todayIndex + 1 < week.length ? todayIndex + 1 : 0;
const earlierDay = [0, 1, 2, 3, 4, 5, 6].find((i) => i !== liveDay && i !== nextDay) ?? 0;

export const weekDays = week.map((d) => d.label);
export const todayLabel = week[todayIndex]?.label ?? week[0].label;

export const accounts = [
  { email: "demo@admin.carterscare.com", role: "admin" as const, name: "Sarah Mitchell", staffId: "s6" },
  { email: "demo@manager.carterscare.com", role: "manager" as const, name: "David Chen", staffId: "s5" },
  { email: "demo@worker.carterscare.com", role: "support_worker" as const, name: "Emma Johnson", staffId: "s1" },
  { email: "demo@client.carterscare.com", role: "client" as const, name: "Robert Thompson", clientId: "c1" },
];

export const seed: DB = {
  org: {
    name: "Carters Care Group",
    phone: "1800 CARTERS",
    email: "hello@carterscare.com.au",
    abn: "61 448 220 193",
    region: "Perth metro · Australia/Perth",
  },
  staff: [
    { id: "s1", name: "Emma Johnson", email: "demo@worker.carterscare.com", phone: "0412 889 102", title: "Support Worker", role: "support_worker", status: "active", wwcc: "ok", firstAid: "expiring", ndisScreening: "ok", wwccExpiry: "12 Apr 2027", firstAidExpiry: stamp(21).long, ndisScreeningExpiry: "12 Apr 2027", employment: "casual" },
    { id: "s2", name: "Jamal Okonkwo", email: "jamal@carterscare.com", phone: "0433 210 554", title: "Support Worker", role: "support_worker", status: "active", wwcc: "ok", firstAid: "ok", ndisScreening: "ok", wwccExpiry: "3 Jan 2028", firstAidExpiry: "11 Mar 2027", ndisScreeningExpiry: "3 Jan 2028", employment: "part-time" },
    { id: "s3", name: "Priya Nair", email: "priya@carterscare.com", phone: "0408 771 390", title: "Team Leader", role: "team_leader", status: "active", wwcc: "ok", firstAid: "ok", ndisScreening: "ok", wwccExpiry: "19 Aug 2027", firstAidExpiry: "2 Feb 2027", ndisScreeningExpiry: "19 Aug 2027", employment: "full-time" },
    { id: "s4", name: "Tom Walsh", email: "tom@carterscare.com", phone: "0421 009 884", title: "Support Worker", role: "support_worker", status: "leave", wwcc: "expiring", firstAid: "expired", ndisScreening: "ok", wwccExpiry: "8 Nov 2026", firstAidExpiry: "1 Jun 2026", ndisScreeningExpiry: "8 Nov 2027", employment: "casual" },
    { id: "s5", name: "David Chen", email: "demo@manager.carterscare.com", phone: "0417 665 221", title: "Operations Manager", role: "manager", status: "active", wwcc: "ok", firstAid: "ok", ndisScreening: "ok", wwccExpiry: "4 May 2028", firstAidExpiry: "18 Jul 2027", ndisScreeningExpiry: "4 May 2028", employment: "full-time" },
    { id: "s6", name: "Sarah Mitchell", email: "demo@admin.carterscare.com", phone: "0400 112 338", title: "Director", role: "admin", status: "active", wwcc: "ok", firstAid: "ok", ndisScreening: "ok", wwccExpiry: "22 Dec 2028", firstAidExpiry: "9 Oct 2027", ndisScreeningExpiry: "22 Dec 2028", employment: "full-time" },
  ],
  clients: [
    { id: "c1", name: "Robert Thompson", preferredName: "Bob", suburb: "Perth", ndis: "431 234 567", plan: "SIL + Community", hours: 28, risk: "medium", status: "active", coordinator: "Priya Nair", goals: "Independent grocery shop and community swimming.", staffIds: ["s1", "s3"], privacyConsent: true, consentAt: "1 Jul 2026" },
    { id: "c2", name: "Eliza Hart", suburb: "Fremantle", ndis: "431 008 441", plan: "Community Access", hours: 16, risk: "low", status: "active", coordinator: "Priya Nair", goals: "Weekly swimming program and cafe social.", staffIds: ["s3", "s2"], privacyConsent: true, consentAt: "14 Mar 2026" },
    { id: "c3", name: "Marcus Bell", suburb: "Joondalup", ndis: "429 774 102", plan: "Personal Care", hours: 22, risk: "high", status: "active", coordinator: "David Chen", goals: "Safe transfers and reduced anxiety at home.", staffIds: ["s2", "s3"], privacyConsent: true, consentAt: "2 May 2026" },
    { id: "c4", name: "Aisha Rahman", suburb: "Canning Vale", ndis: "432 551 009", plan: "Capacity Building", hours: 12, risk: "low", status: "active", coordinator: "Emma Johnson", goals: "Budgeting and public transport practice.", staffIds: ["s1"], privacyConsent: true, consentAt: "20 Aug 2026" },
    { id: "c5", name: "Owen Fraser", suburb: "Midland", ndis: "428 330 776", plan: "SIL", hours: 38, risk: "medium", status: "onboarding", coordinator: "David Chen", goals: "Settle into SIL and complete intake.", staffIds: ["s5"], privacyConsent: false },
  ],
  notes: [
    { id: "n1", clientId: "c1", staffId: "s1", date: stamp(-2).long, shift: "07:00–15:00", kind: "daily care", visibleToClient: true, body: "Good day — Robert engaged well. Completed grocery shop independently with verbal prompts. Mood settled after lunch. PRN not required." },
    { id: "n2", clientId: "c3", staffId: "s2", date: stamp(-1).long, shift: "15:00–21:00", kind: "daily care", visibleToClient: false, body: "Elevated anxiety during transition home. Used grounding sequence from care plan. Family updated." },
    { id: "n3", clientId: "c2", staffId: "s3", date: stamp(-3).long, shift: "09:00–13:00", kind: "daily care", visibleToClient: true, body: "Community access to South Beach. Participated in swimming program. No incidents." },
    { id: "n4", clientId: "c1", staffId: "s2", date: stamp(-4).long, shift: "09:00–13:00", kind: "progress", visibleToClient: true, body: "Mobility improving — walked around the garden independently. Proud of the extra lap." },
  ],
  incidents: [
    { id: "i1", clientId: "c3", staffId: "s2", severity: "moderate", status: "investigating", reportable: false, when: `${stamp(-2).long} 16:40`, summary: "Slip in bathroom. No injury. Environment reviewed.", followUp: "Non-slip mat ordered. Review this week." },
    { id: "i2", clientId: "c1", staffId: "s1", severity: "low", status: "closed", reportable: false, when: `${stamp(-8).long} 11:15`, summary: "Missed medication window by 20 min. Double-check protocol followed.", followUp: "Closed after medication audit." },
    { id: "i3", clientId: "c3", staffId: "s2", severity: "high", status: "open", reportable: true, when: `${stamp(0).long} 07:20`, summary: "Door locked during an anxiety episode. No injury. Recorded as an unauthorised restrictive practice.", followUp: "Notify the NDIS Commission within 24 hours. Behaviour support to review the plan." },
  ],
  timesheets: [
    { id: "t1", staffId: "s1", clientId: "c1", date: stamp(-2).short, start: "07:00", end: "15:00", hours: 8, status: "submitted" },
    { id: "t2", staffId: "s2", clientId: "c3", date: stamp(-1).short, start: "15:00", end: "21:00", hours: 6, status: "draft" },
    { id: "t3", staffId: "s3", clientId: "c2", date: stamp(-3).short, start: "09:00", end: "13:00", hours: 4, status: "approved" },
    { id: "t4", staffId: "s1", clientId: "c4", date: stamp(-3).short, start: "16:00", end: "20:00", hours: 4, status: "approved" },
  ],
  invoices: [
    { id: "inv1", number: "INV-1044", clientId: "c1", amount: 4280, status: "paid", period: "Aug 2026", timesheetIds: [] },
    { id: "inv2", number: "INV-1045", clientId: "c3", amount: 3610, status: "sent", period: "Aug 2026", timesheetIds: [] },
    { id: "inv3", number: "INV-1046", clientId: "c2", amount: 2144, status: "draft", period: "Sep 2026", timesheetIds: ["t3"] },
  ],
  shifts: [
    { id: "sh1", staffId: "s1", clientId: "c1", day: week[0].label, window: "07–15", status: shiftStatus(0) },
    { id: "sh2", staffId: "s1", clientId: "c1", day: week[1].label, window: "07–15", status: shiftStatus(1) },
    { id: "sh3", staffId: "s1", clientId: "c4", day: week[2].label, window: "16–20", status: shiftStatus(2) },
    { id: "sh4", staffId: "s1", clientId: "c1", day: week[4].label, window: "07–15", status: shiftStatus(4) },
    { id: "sh5", staffId: "s2", clientId: "c3", day: week[earlierDay].label, window: "15–21", status: shiftStatus(earlierDay) },
    { id: "sh6", staffId: "s2", clientId: "c3", day: week[liveDay].label, window: "07–15", status: shiftStatus(liveDay, true) },
    { id: "sh7", staffId: "s2", clientId: "c3", day: week[nextDay].label, window: "15–21", status: shiftStatus(nextDay) },
    { id: "sh8", staffId: "s2", clientId: "c2", day: week[5].label, window: "09–13", status: shiftStatus(5) },
    { id: "sh9", staffId: "s3", clientId: "c2", day: week[0].label, window: "09–13", status: shiftStatus(0) },
    { id: "sh10", staffId: "s3", clientId: "c1", day: week[3].label, window: "15–21", status: shiftStatus(3) },
    { id: "sh11", staffId: "s3", clientId: "c3", day: week[4].label, window: "07–13", status: shiftStatus(4) },
  ],
  carePlans: [
    { id: "cp1", clientId: "c1", name: "Robert SIL 2026", status: "active", goals: ["Independent shop", "Community swim"], start: "1 Jul 2026" },
    { id: "cp2", clientId: "c2", name: "Eliza community access", status: "active", goals: ["Swimming", "Social cafe"], start: "14 Mar 2026" },
    { id: "cp3", clientId: "c3", name: "Marcus personal care", status: "review", goals: ["Safe transfers", "Anxiety plan"], start: "2 May 2026" },
    { id: "cp4", clientId: "c4", name: "Aisha capacity building", status: "active", goals: ["Budgeting", "Transperth"], start: "20 Aug 2026" },
    { id: "cp5", clientId: "c5", name: "Owen intake plan", status: "draft", goals: ["SIL settle", "Intake pack"], start: "9 Sep 2026" },
  ],
  training: [
    { id: "tr1", staffId: "s1", name: "Provide First Aid", status: "due", expiry: stamp(21).long },
    { id: "tr2", staffId: "s1", name: "Manual handling", status: "current", expiry: "4 Feb 2027" },
    { id: "tr3", staffId: "s2", name: "Positive behaviour support", status: "current", expiry: "11 Mar 2027" },
    { id: "tr4", staffId: "s4", name: "Provide First Aid", status: "overdue", expiry: "1 Jun 2026" },
    { id: "tr5", staffId: "s3", name: "Team leader induction", status: "current", expiry: "30 Nov 2027" },
  ],
  onboarding: [
    { id: "ob1", subjectType: "client", subjectId: "c5", name: "Service agreement signed", status: "pending" },
    { id: "ob2", subjectType: "client", subjectId: "c5", name: "Privacy consent recorded", status: "pending" },
    { id: "ob3", subjectType: "client", subjectId: "c5", name: "Risk assessment complete", status: "pending" },
    { id: "ob4", subjectType: "client", subjectId: "c5", name: "SIL environment check", status: "done" },
    { id: "ob5", subjectType: "staff", subjectId: "s4", name: "Return-to-work plan", status: "pending" },
  ],
  checkins: [
    { id: "ck1", staffId: "s2", clientId: "c3", inAt: "08:05" },
  ],
  requests: [
    { id: "rq1", clientId: "c1", title: "Change visit time", status: "pending", type: "schedule", notes: "Please change Friday visit from 9am to 10am. Family lunch on Friday." },
    { id: "rq2", clientId: "c2", title: "New pool towel", status: "resolved", type: "service", notes: "Towel at South Beach program is worn. Replacement approved.", reply: "Replacement towel is with the South Beach program." },
    { id: "rq3", clientId: "c1", title: "Preferred name is Bob", status: "pending", type: "correction", notes: "Please keep my preferred name as Bob on the portal and the roster." },
  ],
};
