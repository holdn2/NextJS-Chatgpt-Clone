// 서버 클라이언트로 지정
"use server";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { createSession } from "./sessions";
import { redirect } from "next/navigation";

export const login = async (_: any, formData: FormData) => {
  // 1. validate Fields
  const validateFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return {
      errorMessage: "잘못된 입력값이 있습니다.",
    };
  }

  // 2. 존재하는 사용자인지 체크
  const { email, password } = validateFields.data;

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return {
        errorMessage: "존재하지 않는 사용자입니다.",
      };
    }

    const { id, name, password: userPassword } = existingUser;
    const passwordMatch = await bcrypt.compare(password, userPassword);

    if (!passwordMatch) {
      return {
        errorMessage: "비밀번호가 일치하지 않습니다.",
      };
    }

    // 세션 생성
    await createSession({ id, name });
  } catch (error) {
    console.log("error", error);
    return {
      errorMessage: "문제가 발생했습니다.",
    };
  }

  redirect("/");
};
