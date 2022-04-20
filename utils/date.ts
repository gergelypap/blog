import Config from "./config";

export function prettyDate(dateString: string, locale = Config.language): string {
  return new Date(dateString).toLocaleString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
