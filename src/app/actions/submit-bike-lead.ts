"use server";

import { createClient } from "@supabase/supabase-js";

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

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!supabaseServiceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function submitBikeLead(
  prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  const submissionId = new Date().toISOString();

  const submission = {
    submission_id: submissionId,
    name: getStringValue(formData, "name"),
    email: getStringValue(formData, "email"),
    phone: getStringValue(formData, "phone"),
    city: getStringValue(formData, "city"),
    budget: getStringValue(formData, "budget"),
    bike_specification: getStringValue(formData, "bikeSpecification"),
    preferred_condition: getStringValue(formData, "preferredCondition"),
    preferred_brand: getStringValue(formData, "preferredBrand"),
    size: getStringValue(formData, "size"),
    use_case: getStringValue(formData, "useCase"),
    notes: getStringValue(formData, "notes"),
    site_key: getStringValue(formData, "siteKey"),
    source_page: getStringValue(formData, "sourcePage"),
    page_path: getStringValue(formData, "pagePath"),
    language: getStringValue(formData, "language"),
    utm_source: getStringValue(formData, "utmSource"),
    utm_medium: getStringValue(formData, "utmMedium"),
    utm_campaign: getStringValue(formData, "utmCampaign"),
    utm_term: getStringValue(formData, "utmTerm"),
    utm_content: getStringValue(formData, "utmContent"),
    submitted_at: new Date().toISOString(),
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

  if (!submission.bike_specification) {
    fieldErrors.bikeSpecification = "Bike type or specification is required.";
  }

  if (!submission.preferred_condition) {
    fieldErrors.preferredCondition = "Preferred condition is required.";
  }

  if (!submission.use_case) {
    fieldErrors.useCase = "Use case is required.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors,
    };
  }

  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("bike_leads")
      .insert([submission])
      .select("id, submission_id");

    if (error) {
      console.error("SUPABASE INSERT ERROR:", error);
      return {
        status: "error",
        message: `Supabase error: ${error.message}`,
      };
    }

    console.log("SUPABASE INSERT OK:", data);

    return {
      status: "success",
      message: `Lead submitted successfully. ${submissionId}`,
      submissionId,
    };
  } catch (error) {
    console.error("submitBikeLead failed:", error);

    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Unknown server error",
    };
  }
}