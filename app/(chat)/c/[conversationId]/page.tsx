import { Chat } from "@/components/chat/Chat";
import { getMessageByConversation } from "@/data/conversations";

type Props = {
  params: {
    conversationId: string;
  };
};

export default async function ConversationPage(props: Props) {
  const { conversationId } = props.params;
  const messages = await getMessageByConversation(conversationId);
  return <Chat initialMessages={messages} />;
}
