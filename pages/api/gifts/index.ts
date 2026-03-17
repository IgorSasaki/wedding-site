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
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const allRecords: unknown[] = [];
    let offset: string | undefined;

    do {
      const { data } = await airtableClient.get("/gifts", {
        params: offset ? { offset } : {},
      });

      allRecords.push(...(data.records ?? []));
      offset = data.offset;
    } while (offset);

    const gifts = allRecords.map((r: unknown) => {
      const record = r as { fields: Record<string, unknown>; id: string };
      return {
        ...record.fields,
        id: record.id,
      };
    });

    res.status(200).json(gifts);
  } catch (error: unknown) {
    const err = error as { response?: { data?: unknown }; message?: string };
    console.error("Error fetching gifts:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch gifts" });
  }
}
