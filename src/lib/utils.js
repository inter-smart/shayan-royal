import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPostDate(dateString) {
  const date = new Date(dateString);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const day = date.getDate().toString().padStart(2, "0");
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatPostTime(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

export function toSnakeCase(input) {
  return input
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`) // Handle camelCase
    .replace(/-+/g, "_") // Replace dashes with underscores
    .replace(/__+/g, "_") // Remove multiple underscores
    .replace(/^_+|_+$/g, "") // Trim leading/trailing underscores
    .toLowerCase(); // Final lowercase
}

export function truncateToReferenceLength(text) {
  const reference = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Illa enim, quae prosunt aut quae nocent";
  const maxLength = reference.length;

  if (!text) return "";

  return text.length > maxLength ? text.substring(0, maxLength).trim() + "..." : text;
}
