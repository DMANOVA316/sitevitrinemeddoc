export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.toLocaleString("fr-FR", { month: "long" });
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year} ${hours}:${minutes}`;
}
