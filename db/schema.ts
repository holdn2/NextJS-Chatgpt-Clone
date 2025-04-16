import { relations } from "drizzle-orm";
import { text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";

// 관계 및 foreign key action 관련 링크
// https://orm.drizzle.team/docs/relations

// pgTable함수로 테이블 정의
// 첫 번째 인수로 테이블 이름 지정
// 두 번째 인수로 컬럼 지정
// 컬럼의 타입이 처음으로 옴
// 필요한 제약사항이 있다면 '함수 체이닝'을 통해 추가
export const user = pgTable("user", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updateAt: timestamp("updated_at").defaultNow().notNull(),
});
// serial : 자동 증가하는 4바이트 정수 타입
// uuid : uuid 형식의 문자열을 id로 만들어줌

export const userRelations = relations(user, ({ many }) => ({
  conversations: many(conversation),
}));

export const conversation = pgTable("conversation", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: text("name"),
  userId: uuid("userId")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updateAt: timestamp("updated_at").defaultNow().notNull(),
});
// ! user 테이블과 conversation 테이블의 관계는 one to many 관계
// user 한 명은 여러 대화를 가질 수 있고 대화는 여러 사용자가 있는 것이 아님

export const conversationRelations = relations(
  conversation,
  ({ one, many }) => ({
    user: one(user, {
      fields: [conversation.userId],
      references: [user.id],
    }),
    messages: many(message),
  })
);

export const message = pgTable("message", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  content: text("content"),
  role: text("role").$type<"user" | "assistant">(),
  conversationId: uuid("conversationId")
    .references(() => conversation.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updateAt: timestamp("updated_at").defaultNow().notNull(),
});

export const messagesRelations = relations(message, ({ one }) => ({
  conversation: one(conversation, {
    fields: [message.conversationId],
    references: [conversation.id],
  }),
}));
