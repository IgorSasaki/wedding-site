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
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, message, email } = req.body;

    const { data } = await airtableClient.post("/messages", {
      records: [
        {
          fields: { name, message, email },
        },
      ],
    });

    res.status(201).json(data);
  } catch (error: unknown) {
    const err = error as { response?: { data?: unknown }; message?: string };
    console.error("Error creating message:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to create message" });
  }
}
