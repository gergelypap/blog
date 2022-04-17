export function prettyDate(dateString: string, locale = "en-US"): string {
  const userAgentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return new Date(dateString).toLocaleString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: userAgentTimezone,
  });
}
