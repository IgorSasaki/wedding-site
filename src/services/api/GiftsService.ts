import { Gift } from "@/config/giftsConfig";

import { airtableClient } from "./airtableClient";

class GiftsServiceClass {
  private endpoint = "/gifts";

  async getAll(): Promise<Gift[]> {
    const { data } = await airtableClient.get(this.endpoint);

    return data.records.map((r) => ({ ...r.fields, id: r.id }));
  }

  async markAsGiven(giftId: string, giftedBy: string): Promise<void> {
    await airtableClient.patch(`${this.endpoint}/${giftId}`, {
      fields: {
        available: false,
        giftedBy,
        giftedAt: new Date().toISOString(),
      },
    });
  }
}

export const GiftsService = new GiftsServiceClass();
