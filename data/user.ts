import { verifySession } from "@/actions/sessions";
import db from "@/db";
import { user } from "@/db/schema";
import { User } from "@/types/db";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email),
    });

    if (!existingUser) return null;

    return existingUser;
  } catch (error) {
    console.log("error", error);
    throw new Error("문제가 발생했습니다.");
  }
};

export const getConversationByUser = async () => {
  const session = await verifySession();

  const response = await db.query.user.findFirst({
    where: eq(user.id, session.id),
    with: {
      conversations: {
        orderBy: (conversation, { desc }) => [desc(conversation.updateAt)],
      },
    },
  });

  return response?.conversations || [];
};
