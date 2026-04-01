import { z } from "zod";

export const OBJECT_ID_REGEX = /^[a-f0-9]{24}$/i;

export const objectIdString = z
  .string()
  .regex(OBJECT_ID_REGEX, "Must be a valid id");

export function preprocessRef(value) {
  // If the value is null or empty, return an empty string
  if (value == null || value === "") return "";
  if (typeof value === "object" && value !== null && "_id" in value) {
    return value._id == null ? "" : String(value._id);
  }
  return String(value);
}

export const requiredObjectId = z.preprocess(preprocessRef, objectIdString);

export const optionalObjectId = z.preprocess((value) => {
  const s = preprocessRef(value);
  return s === "" ? undefined : s;
}, objectIdString.optional());

export function flattenZodErrors(error) {
  // Transform the Zod error into a map of field names to error messages
  // The error.issues is an array of objects, each with a path and a message
  const map = {};
  for (const issue of error.issues) {
    const path = issue.path.length ? issue.path.join(".") : "_root";
    if (!map[path]) map[path] = issue.message;
  }
  return map;
}
