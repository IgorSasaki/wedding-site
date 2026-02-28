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

interface AirtableMessagesResponse {
  offset?: string;
  records: Array<{
    createdTime?: string;
    fields: Record<string, unknown>;
    id: string;
  }>;
}

class MessagesServiceClass {
  private endpoint = "/messages";

  async getAll(): Promise<Message[]> {
    const allRecords: Message[] = [];
    let offset: string | undefined;

    do {
      const { data } = await airtableClient.get<AirtableMessagesResponse>(
        this.endpoint,
        { params: offset ? { offset } : {} },
      );

      const page = (data.records ?? []).map((r) => ({
        ...r.fields,
        id: r.id,
        dateTime: r.createdTime ?? "",
      })) as Message[];

      allRecords.push(...page);
      offset = data.offset;
    } while (offset);

    return allRecords;
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
