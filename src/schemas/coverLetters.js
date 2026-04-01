import { z } from "zod";
import { optionalObjectId } from "./common.js";

export const coverLetterCreateSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(500),
  body: z.string().min(1, "Body is required"),
  notes: z
    .string()
    .optional()
    .transform((v) => (v == null ? "" : v)),
  parent: optionalObjectId,
});

export const coverLetterUpdateSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(500),
  body: z.string().min(1, "Body is required"),
  notes: z
    .string()
    .optional()
    .transform((v) => (v == null ? "" : v)),
});
