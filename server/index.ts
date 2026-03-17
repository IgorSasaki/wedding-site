import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const AIRTABLE_API_URL = process.env.AIRTABLE_API_URL;
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;

const airtableClient = axios.create({
  baseURL: AIRTABLE_API_URL,
  headers: {
    Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    "Content-Type": "application/json",
  },
});

app.get("/api/messages", async (_req, res) => {
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

    const messages = allRecords.map((r: any) => ({
      ...r.fields,
      id: r.id,
      dateTime: r.createdTime ?? "",
    }));

    res.json(messages);
  } catch (error: any) {
    console.error(
      "Error fetching messages:",
      error.response?.data || error.message,
    );
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const { name, message, email } = req.body;

    const { data } = await airtableClient.post("/messages", {
      records: [
        {
          fields: { name, message, email },
        },
      ],
    });

    res.json(data);
  } catch (error: any) {
    console.error(
      "Error creating message:",
      error.response?.data || error.message,
    );
    res.status(500).json({ error: "Failed to create message" });
  }
});

app.get("/api/gifts", async (_req, res) => {
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

    const gifts = allRecords.map((r: any) => ({
      ...r.fields,
      id: r.id,
    }));

    res.json(gifts);
  } catch (error: any) {
    console.error(
      "Error fetching gifts:",
      error.response?.data || error.message,
    );
    res.status(500).json({ error: "Failed to fetch gifts" });
  }
});

app.patch("/api/gifts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { giftedBy } = req.body;

    await airtableClient.patch(`/gifts/${id}`, {
      fields: {
        available: false,
        giftedBy,
        giftedAt: new Date().toISOString(),
      },
    });

    res.json({ success: true });
  } catch (error: any) {
    console.error(
      "Error updating gift:",
      error.response?.data || error.message,
    );
    res.status(500).json({ error: "Failed to update gift" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
