"use server";

import { promises as fs } from "fs";
import path from "path";

export type NewsletterSignupState = {
  status: "idle" | "success" | "error";
  message: string;
  signupId?: string;
  fieldErrors?: {
    email?: string;
  };
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

export async function submitNewsletterSignup(
  prevState: NewsletterSignupState,
  formData: FormData
): Promise<NewsletterSignupState> {
  const signupId = new Date().toISOString();

  const submission = {
    signupId,
    email: getStringValue(formData, "email"),
    siteKey: getStringValue(formData, "siteKey"),
    sourcePage: getStringValue(formData, "sourcePage"),
    pagePath: getStringValue(formData, "pagePath"),
    language: getStringValue(formData, "language"),
    utmSource: getStringValue(formData, "utmSource"),
    utmMedium: getStringValue(formData, "utmMedium"),
    utmCampaign: getStringValue(formData, "utmCampaign"),
    utmTerm: getStringValue(formData, "utmTerm"),
    utmContent: getStringValue(formData, "utmContent"),
    submittedAt: signupId,
  };

  if (!submission.email) {
    return {
      status: "error",
      message: "Please enter your email.",
      fieldErrors: {
        email: "Email is required.",
      },
    };
  }

  if (!isValidEmail(submission.email)) {
    return {
      status: "error",
      message: "Please enter a valid email.",
      fieldErrors: {
        email: "Enter a valid email address.",
      },
    };
  }

  const filePath = path.join(process.cwd(), "newsletter-signups.jsonl");
  await fs.appendFile(filePath, `${JSON.stringify(submission)}\n`, "utf8");

  return {
    status: "success",
    message: "Newsletter signup successful.",
    signupId,
  };
}

