import { useMemo } from "react";
import { useSession } from "./session";
import { useCC } from "./store";

export function useLookups() {
  const db = useCC();
  const { session } = useSession();
  const view = useMemo(() => {
    if (session?.role === "client" && session.clientId) {
      const id = session.clientId;
      return {
        ...db,
        clients: db.clients.filter((c) => c.id === id),
        notes: db.notes.filter((n) => n.clientId === id && n.visibleToClient !== false),
        incidents: [],
        invoices: [],
        timesheets: [],
        requests: db.requests.filter((r) => r.clientId === id),
        carePlans: db.carePlans.filter((p) => p.clientId === id),
        shifts: db.shifts.filter((s) => s.clientId === id),
      };
    }
    if (session?.role === "support_worker" && session.staffId) {
      const mine = session.staffId;
      const ids = new Set(db.clients.filter((c) => c.staffIds.includes(mine)).map((c) => c.id));
      return {
        ...db,
        clients: db.clients.filter((c) => ids.has(c.id)),
        notes: db.notes.filter((n) => ids.has(n.clientId)),
        incidents: db.incidents.filter((i) => ids.has(i.clientId)),
        requests: db.requests.filter((r) => ids.has(r.clientId)),
        carePlans: db.carePlans.filter((p) => ids.has(p.clientId)),
        invoices: [],
        shifts: db.shifts.filter((s) => s.staffId === mine || ids.has(s.clientId)),
        timesheets: db.timesheets.filter((t) => t.staffId === mine),
        checkins: db.checkins.filter((c) => c.staffId === mine),
      };
    }
    return db;
  }, [db, session]);
  const staffName = (id: string) => db.staff.find((s) => s.id === id)?.name ?? "Unknown staff";
  const clientName = (id: string) => {
    const known = view.clients.some((c) => c.id === id) || session?.role === "admin" || session?.role === "manager";
    if (!known) return "Hidden";
    return db.clients.find((c) => c.id === id)?.name ?? "Unknown client";
  };
  return { ...view, staffName, clientName };
}
