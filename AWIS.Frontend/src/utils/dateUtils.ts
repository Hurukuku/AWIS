export function formatDateForInput(dateStr?: string | null): string {
  if (!dateStr) return "";
  if (dateStr.includes("T")) {
    return dateStr.split("T")[0];
  }
  const date = new Date(dateStr);
  if (!isNaN(date.getTime())) {
    return date.toISOString().split("T")[0];
  }
  return dateStr;
}


export function formatDateForDisplay(dateStr?: string | null): string {
  if (!dateStr) return "-";
  const datePart = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
  const date = new Date(datePart);
  if (!isNaN(date.getTime())) {
    return date.toLocaleDateString("pl-PL");
  }
  return datePart;
}


export function getYearFromDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  const datePart = dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
  const [year] = datePart.split("-");
  return year || "";
}

