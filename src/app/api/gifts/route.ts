import { NextResponse } from "next/server";
import axios from "axios";

const AIRTABLE_API_URL = process.env.AIRTABLE_API_URL;
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;

const airtableClient = axios.create({
  baseURL: AIRTABLE_API_URL,
  headers: {
    Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export async function GET() {
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

    return NextResponse.json(gifts);
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: unknown };
      message?: string;
    };
    console.error("Error fetching gifts:", err.response?.data || err.message);
    return NextResponse.json(
      { error: "Failed to fetch gifts" },
      { status: 500 },
    );
  }
}
