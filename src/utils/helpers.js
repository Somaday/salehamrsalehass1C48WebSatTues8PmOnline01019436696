import siteData from "../data/siteData.js";

const colorMap = Object.fromEntries(
  siteData.categories.map((c) => [c.name, c.color]),
);

export function categoryColor(categoryName) {
  return colorMap[categoryName] || "orange";
}

export function formatDate(isoDate) {
  if (typeof isoDate !== "string" || /[^\x00-\x7F]/.test(isoDate)) {
    return isoDate;
  }

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;

  try {
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return isoDate;
  }
}
