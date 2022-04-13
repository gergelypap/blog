export function prettyDate(dateString: string, locale = "en-US"): string {
  return new Date(dateString).toLocaleString(locale, {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}
