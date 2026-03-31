"use server";

import { promises as fs } from "fs";
import path from "path";

export type NewsletterFormState = {
  status: "idle" | "success" | "error";
  message: string;
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

export async function submitNewsletterSubscription(
  prevState: NewsletterFormState,
  formData: FormData
): Promise<NewsletterFormState> {
  const email = getStringValue(formData, "email");
  const siteKey = getStringValue(formData, "siteKey");
  const city = getStringValue(formData, "city");
  const language = getStringValue(formData, "language");

  if (!email) {
    return {
      status: "error",
      message: "Please enter your email address.",
      fieldErrors: {
        email: "Email is required.",
      },
    };
  }

  if (!isValidEmail(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
      fieldErrors: {
        email: "Enter a valid email address.",
      },
    };
  }

  const filePath = path.join(process.cwd(), "newsletter-subscribers.jsonl");

  const record = {
    email,
    siteKey,
    city,
    language,
    subscribedAt: new Date().toISOString(),
  };

  await fs.appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");

  return {
    status: "success",
    message: "Subscription saved successfully.",
  };
}