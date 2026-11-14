"use server";

import { formSchema, type Values } from "./schema";

/**
 * Posts the inquiry as JSON to INQUIRY_WEBHOOK_URL, which can be any inbox,
 * CRM or automation endpoint. Validates again, since the client can't be trusted.
 */
export async function sendInquiry(values: Values) {
  const inquiry = formSchema.safeParse(values);
  const url = process.env.INQUIRY_WEBHOOK_URL;
  if (!(inquiry.success && url)) {
    return { ok: false };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiry.data),
    });
    return { ok: response.ok };
  } catch {
    return { ok: false };
  }
}
