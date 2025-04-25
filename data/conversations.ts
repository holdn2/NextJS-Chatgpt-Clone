import db from "@/db";
import { conversation } from "@/db/schema";
import { Message } from "ai";
import { eq } from "drizzle-orm";

export const getMessageByConversation = async (id: string) => {
  const response = await db.query.conversation.findFirst({
    where: eq(conversation.id, id),
    with: {
      messages: true,
    },
  });

  return (response?.messages || []) as Message[];
};
