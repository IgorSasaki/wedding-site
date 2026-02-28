import { Gift } from "@/config/giftsConfig";

import { airtableClient } from "./airtableClient";

interface AirtableGiftsResponse {
  offset?: string;
  records: Array<{ id: string; fields: Record<string, unknown> }>;
}

class GiftsServiceClass {
  private endpoint = "/gifts";

  /** Busca todos os presentes (percorre offset da API para lista completa). Uso: paginação local no front. */
  async getAll(): Promise<Gift[]> {
    const allRecords: Gift[] = [];
    let offset: string | undefined;

    do {
      const { data } = await airtableClient.get<AirtableGiftsResponse>(
        this.endpoint,
        { params: offset ? { offset } : {} },
      );
      const page = (data.records ?? []).map((r) => ({
        ...r.fields,
        id: r.id,
      })) as Gift[];
      allRecords.push(...page);
      offset = data.offset;
    } while (offset);

    return allRecords;
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
