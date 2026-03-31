"use server";

import { promises as fs } from "fs";
import path from "path";

export type LeadFormFieldErrors = Partial<
  Record<
    | "name"
    | "email"
    | "phone"
    | "city"
    | "bikeSpecification"
    | "preferredCondition"
    | "useCase",
    string
  >
>;

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message: string;
  submissionId?: string;
  fieldErrors?: LeadFormFieldErrors;
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitBikeLead(
  prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const submissionId = new Date().toISOString();

  const submission = {
    submissionId,
    name: getStringValue(formData, "name"),
    email: getStringValue(formData, "email"),
    phone: getStringValue(formData, "phone"),
    city: getStringValue(formData, "city"),
    budget: getStringValue(formData, "budget"),
    bikeSpecification: getStringValue(formData, "bikeSpecification"),
    preferredCondition: getStringValue(formData, "preferredCondition"),
    preferredBrand: getStringValue(formData, "preferredBrand"),
    size: getStringValue(formData, "size"),
    useCase: getStringValue(formData, "useCase"),
    notes: getStringValue(formData, "notes"),
    siteKey: getStringValue(formData, "siteKey"),
    sourcePage: getStringValue(formData, "sourcePage"),
    pagePath: getStringValue(formData, "pagePath"),
    language: getStringValue(formData, "language"),
    utmSource: getStringValue(formData, "utmSource"),
    utmMedium: getStringValue(formData, "utmMedium"),
    utmCampaign: getStringValue(formData, "utmCampaign"),
    utmTerm: getStringValue(formData, "utmTerm"),
    utmContent: getStringValue(formData, "utmContent"),
    submittedAt: submissionId,
  };

  const fieldErrors: LeadFormFieldErrors = {};

  if (!submission.name) {
    fieldErrors.name = "Name is required.";
  }

  if (!submission.email) {
    fieldErrors.email = "Email is required.";
  } else if (!isValidEmail(submission.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (!submission.phone) {
    fieldErrors.phone = "Phone is required.";
  }

  if (!submission.city) {
    fieldErrors.city = "City is required.";
  }

  if (!submission.bikeSpecification) {
    fieldErrors.bikeSpecification = "Bike type or specification is required.";
  }

  if (!submission.preferredCondition) {
    fieldErrors.preferredCondition = "Preferred condition is required.";
  }

  if (!submission.useCase) {
    fieldErrors.useCase = "Use case is required.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors,
    };
  }

  const filePath = path.join(process.cwd(), "lead-submissions.jsonl");
  await fs.appendFile(filePath, `${JSON.stringify(submission)}\n`, "utf8");

  return {
    status: "success",
    message: "Lead submitted successfully.",
    submissionId,
  };
}