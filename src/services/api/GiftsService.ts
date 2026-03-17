import { Gift } from "@/config/giftsConfig";

import { apiClient } from "./client";

class GiftsServiceClass {
  async getAll(): Promise<Gift[]> {
    const { data } = await apiClient.get<Gift[]>("/gifts");
    return data;
  }

  async markAsGiven(giftId: string, giftedBy: string): Promise<void> {
    await apiClient.patch(`/gifts/${giftId}`, { giftedBy });
  }
}

export const GiftsService = new GiftsServiceClass();
