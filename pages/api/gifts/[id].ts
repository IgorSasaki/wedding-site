import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const AIRTABLE_API_URL = process.env.AIRTABLE_API_URL;
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;

const airtableClient = axios.create({
  baseURL: AIRTABLE_API_URL,
  headers: {
    Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const { giftedBy } = req.body;

    await airtableClient.patch(`/gifts/${id}`, {
      fields: {
        available: false,
        giftedBy,
        giftedAt: new Date().toISOString(),
      },
    });

    res.status(200).json({ success: true });
  } catch (error: unknown) {
    const err = error as { response?: { data?: unknown }; message?: string };
    console.error("Error updating gift:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to update gift" });
  }
}
