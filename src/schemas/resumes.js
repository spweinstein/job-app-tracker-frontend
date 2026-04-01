import { z } from "zod";
import { requiredObjectId } from "./common.js";

const experienceItemSchema = z.object({
  company: requiredObjectId,
  title: z.string().trim().min(1, "Title is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().transform((v) => v ?? ""),
  description: z.string().optional().transform((v) => v ?? ""),
});

const educationItemSchema = z.object({
  degree: z.string().trim().min(1, "Degree is required"),
  school: z.string().trim().min(1, "School is required"),
  year: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => {
      if (v === "" || v == null) return "";
      return String(v);
    }),
});

const projectItemSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  company: requiredObjectId,
  year: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => {
      if (v === "" || v == null) return "";
      return String(v);
    }),
  link: z.string().optional().transform((v) => v ?? ""),
  description: z.string().optional().transform((v) => v ?? ""),
});

const certificationItemSchema = z.object({
  title: z.string().optional().transform((v) => v ?? ""),
  company: requiredObjectId,
  year: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => {
      if (v === "" || v == null) return "";
      return String(v);
    }),
  description: z.string().optional().transform((v) => v ?? ""),
});

const skillRowSchema = z.object({
  skill: z.string().optional().transform((v) => v ?? ""),
});

function yearFromForm(year) {
  if (year === "" || year == null) return undefined;
  const n = typeof year === "number" ? year : Number(year);
  return Number.isFinite(n) ? n : undefined;
}

const resumeBaseSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(500),
  link: z.string().optional().transform((v) => v ?? ""),
  summary: z.string().optional().transform((v) => v ?? ""),
  notes: z.string().optional().transform((v) => v ?? ""),
  experience: z.array(experienceItemSchema).default([]),
  education: z.array(educationItemSchema).default([]),
  projects: z.array(projectItemSchema).default([]),
  certifications: z.array(certificationItemSchema).default([]),
  skills: z.array(skillRowSchema).default([]),
});

function mapExperience(exp) {
  return {
    company: exp.company,
    title: exp.title,
    startDate: exp.startDate,
    ...(exp.endDate ? { endDate: exp.endDate } : {}),
    ...(exp.description ? { description: exp.description } : {}),
  };
}

function mapEducation(edu) {
  const y = yearFromForm(edu.year);
  return {
    degree: edu.degree,
    school: edu.school,
    ...(y !== undefined ? { year: y } : {}),
  };
}

function mapProject(p) {
  const row = {
    title: p.title,
    company: p.company,
    link: p.link || undefined,
    description: p.description || undefined,
  };
  const y = yearFromForm(p.year);
  if (y !== undefined) row.year = y;
  if (!row.company) delete row.company;
  return row;
}

function mapCertification(c) {
  const row = {
    description: c.description || undefined,
  };
  if (c.title) row.title = c.title;
  if (c.company) row.company = c.company;
  const y = yearFromForm(c.year);
  if (y !== undefined) row.year = y;
  if (!row.company) delete row.company;
  return row;
}

export const resumeCreateSchema = resumeBaseSchema.transform((data) => {
  const skills = data.skills.map((s) => s.skill).filter(Boolean);
  return {
    name: data.name,
    link: data.link || undefined,
    summary: data.summary || undefined,
    notes: data.notes || undefined,
    experience: data.experience.map(mapExperience),
    education: data.education.map(mapEducation),
    projects: data.projects.map((p) => {
      const m = mapProject(p);
      if (m.company === "" || m.company == null) delete m.company;
      return m;
    }),
    certifications: data.certifications.map((c) => {
      const m = mapCertification(c);
      return m;
    }),
    skills,
  };
});

export const resumeUpdateSchema = resumeBaseSchema.transform((data) => {
  const skills = data.skills.map((s) => s.skill).filter(Boolean);
  return {
    name: data.name,
    link: data.link || undefined,
    summary: data.summary || undefined,
    notes: data.notes || undefined,
    experience: data.experience.map(mapExperience),
    education: data.education.map(mapEducation),
    projects: data.projects.map((p) => {
      const m = mapProject(p);
      if (m.company === "" || m.company == null) delete m.company;
      return m;
    }),
    certifications: data.certifications.map((c) => mapCertification(c)),
    skills,
  };
});
