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
      const { data } = await airtableClient.get("/messages", {
        params: offset ? { offset } : {},
      });

      allRecords.push(...(data.records ?? []));
      offset = data.offset;
    } while (offset);

    const messages = allRecords.map((r: unknown) => {
      const record = r as {
        fields: Record<string, unknown>;
        id: string;
        createdTime?: string;
      };
      return {
        ...record.fields,
        id: record.id,
        dateTime: record.createdTime ?? "",
      };
    });

    return NextResponse.json(messages);
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: unknown };
      message?: string;
    };
    console.error(
      "Error fetching messages:",
      err.response?.data || err.message,
    );
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, message, email } = body;

    const { data } = await airtableClient.post("/messages", {
      records: [
        {
          fields: { name, message, email },
        },
      ],
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error: unknown) {
    const err = error as {
      response?: { data?: unknown };
      message?: string;
    };
    console.error("Error creating message:", err.response?.data || err.message);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 },
    );
  }
}
