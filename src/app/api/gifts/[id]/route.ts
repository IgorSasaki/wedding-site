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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { giftedBy } = body;

    await airtableClient.patch(`/gifts/${id}`, {
      fields: {
        available: false,
        giftedBy,
        giftedAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: unknown };
      message?: string;
    };
    console.error("Error updating gift:", err.response?.data || err.message);
    return NextResponse.json(
      { error: "Failed to update gift" },
      { status: 500 },
    );
  }
}
