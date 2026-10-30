export function PrivacyNotice({ variant }: { variant: "full" | "collect" | "portal" | "worker" }) {
  if (variant === "collect") {
    return (
      <p className="mb-3 text-xs leading-relaxed text-muted">
        Disability and health details are sensitive information under the Privacy Act 1988 (Cth). They are collected to deliver supports, keep people safe, and prepare NDIS claims. The NDIS number is a government identifier and is not the file number. It is not used for marketing. This demo keeps the record in this browser only — do not enter a real participant.
      </p>
    );
  }
  if (variant === "worker") {
    return (
      <p className="text-sm leading-relaxed text-muted">
        Open only the participants assigned to you. Leave a note staff-only unless the person should see it in their portal. Do not put a real person’s information into this demo.
      </p>
    );
  }
  if (variant === "portal") {
    return (
      <div className="space-y-2 text-sm leading-relaxed text-muted">
        <p>
          Your file is used to deliver your supports and to claim NDIS funding. Notes appear here only when your team marks them as shared with you. You can ask for a correction, or raise a privacy question, from Requests.
        </p>
        <p>
          If a privacy complaint is not resolved with your provider, you can contact the Office of the Australian Information Commissioner at{" "}
          <a className="font-semibold text-portal underline" href="https://www.oaic.gov.au" target="_blank" rel="noreferrer">oaic.gov.au</a>.
          Concerns about the quality of NDIS supports can go to the NDIS Quality and Safeguards Commission.
        </p>
        <p>This demo stores the record only in this browser. It is not a clinical record system. Do not enter real personal information.</p>
      </div>
    );
  }
  return (
    <div className="space-y-2 text-sm leading-relaxed text-muted">
      <p>Personal information here is handled against the Australian Privacy Principles. Health and disability information is sensitive and is collected with consent, for supports, safety, and NDIS claiming only.</p>
      <p>Support workers see participants assigned to them, not the whole book. Information is not used for direct marketing and this demo does not send it overseas — it stays in the browser on this device.</p>
      <p>The NDIS number is a government identifier (APP 9). Files use an internal id, never the NDIS number.</p>
      <p>Participants can read shared notes in the portal and request a correction or make a privacy complaint from Requests. Unresolved privacy complaints can go to the OAIC. This demo is not a certified health record and does not replace a provider’s privacy policy or a Notifiable Data Breaches assessment.</p>
    </div>
  );
}
