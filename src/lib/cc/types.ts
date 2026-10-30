export type Role = "admin" | "manager" | "support_worker" | "client";

export type StatusTone = "ok" | "warn" | "bad" | "info";

export type Session = { email: string; name: string; role: Role; staffId?: string; clientId?: string };

export type Staff = {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  role: Role | "team_leader";
  status: "active" | "leave";
  wwcc: "ok" | "expiring" | "expired" | "missing";
  firstAid: "ok" | "expiring" | "expired" | "missing";
  wwccExpiry: string;
  firstAidExpiry: string;
  ndisScreening: "ok" | "expiring" | "expired" | "missing";
  ndisScreeningExpiry: string;
  employment: string;
};

export type Client = {
  id: string;
  name: string;
  preferredName?: string;
  suburb: string;
  ndis: string;
  plan: string;
  hours: number;
  risk: "low" | "medium" | "high";
  status: "active" | "onboarding";
  coordinator: string;
  goals: string;
  staffIds: string[];
  privacyConsent?: boolean;
  consentAt?: string;
};

export type Note = {
  id: string;
  clientId: string;
  staffId: string;
  date: string;
  shift: string;
  body: string;
  kind?: string;
  visibleToClient?: boolean;
};

export type Incident = {
  id: string;
  clientId: string;
  staffId: string;
  severity: "low" | "moderate" | "high";
  status: "open" | "investigating" | "closed";
  reportable: boolean;
  when: string;
  summary: string;
  followUp: string;
};

export type Timesheet = {
  id: string;
  staffId: string;
  clientId: string;
  date: string;
  start: string;
  end: string;
  hours: number;
  status: "draft" | "submitted" | "approved";
};

export type Invoice = {
  id: string;
  number: string;
  clientId: string;
  amount: number;
  status: "draft" | "sent" | "paid";
  period: string;
  timesheetIds: string[];
};

export type Shift = {
  id: string;
  staffId: string;
  clientId: string;
  day: string;
  window: string;
  status: "scheduled" | "in_progress" | "complete" | "off";
};

export type CarePlan = {
  id: string;
  clientId: string;
  name: string;
  status: "active" | "draft" | "review";
  goals: string[];
  start: string;
};

export type Training = {
  id: string;
  staffId: string;
  name: string;
  status: "current" | "due" | "overdue";
  expiry: string;
};

export type OnboardingTask = {
  id: string;
  subjectType: "staff" | "client";
  subjectId: string;
  name: string;
  status: "pending" | "done";
};

export type RequestKind = "schedule" | "service" | "feedback" | "privacy" | "correction" | "other";

export type RequestItem = {
  id: string;
  clientId: string;
  title: string;
  status: "pending" | "in_progress" | "resolved";
  notes: string;
  type: RequestKind;
  reply?: string;
};

export type Checkin = {
  id: string;
  staffId: string;
  clientId: string;
  inAt: string;
  outAt?: string;
};

export type Org = {
  name: string;
  phone: string;
  email: string;
  abn: string;
  region: string;
};

export type DB = {
  org: Org;
  staff: Staff[];
  clients: Client[];
  notes: Note[];
  incidents: Incident[];
  timesheets: Timesheet[];
  invoices: Invoice[];
  shifts: Shift[];
  carePlans: CarePlan[];
  training: Training[];
  onboarding: OnboardingTask[];
  requests: RequestItem[];
  checkins: Checkin[];
};
