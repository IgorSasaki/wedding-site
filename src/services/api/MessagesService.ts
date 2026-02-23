import { airtableClient } from "./airtableClient";

export interface Message {
  dateTime: string;
  email?: string;
  id: string;
  message: string;
  name: string;
}

export type CreateMessageData = Pick<Message, "name" | "message"> & {
  email?: string;
};

class MessagesServiceClass {
  private endpoint = "/messages";

  async getAll(): Promise<Message[]> {
    const { data } = await airtableClient.get(this.endpoint);

    return data.records.map((r) => ({
      ...r.fields,
      id: r.id,
      dateTime: r.createdTime,
    }));
  }

  async create(messageData: CreateMessageData): Promise<Message> {
    const { data } = await airtableClient.post<Message>(this.endpoint, {
      records: [
        {
          fields: messageData,
        },
      ],
    });
    return data;
  }

  formatDate(dateTime: string): string {
    const date = new Date(dateTime);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Ontem";
    if (diffDays < 7) return `${diffDays} dias atrás`;

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
}

export const MessagesService = new MessagesServiceClass();
