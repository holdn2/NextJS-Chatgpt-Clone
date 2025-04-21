// 서버 클라이언트로 지정
"use server";

import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { SignUpSchema } from "@/schemas/auth";
import db from "@/db";
import { user } from "@/db/schema";
import { redirect } from "next/navigation";

export const signUp = async (_: any, formData: FormData) => {
  // 1. validate Fields
  const validateFields = SignUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return {
      errorMessage: "잘못된 입력값이 있습니다.",
    };
  }

  // 2. 존재하는 사용자인지 체크
  const { name, email, password } = validateFields.data;

  // 4. 성공 / 실패 처리
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return {
        errorMessage: "이미 존재하는 사용자 입니다.",
      };
    }

    // 비밀번호는 그냥 저장하지 말고 해시해서 저장한다. bcryptjs 라이브러리 사용. 두 번째 인자는 해시 연산을 반복하는 횟수
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. insert db
    await db.insert(user).values({ name, email, password: hashedPassword });

    // 저장이 잘 완료되면 로그인 페이지로 리다이렉트
  } catch (error) {
    console.log("error", error);
    return {
      errorMessage: "문제가 발생했습니다.",
    };
  }
  redirect("/login");
};
