// 클라이언트 컴포넌트로 변경하기
"use client";
// 2025.04.21 zod 설치 : 타입스크립트를 지원하는 스키마 검증 라이브러리. 유효성 검사 로직에 많이 사용되는 라이브러리

import { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormCard } from "./FormCard";
import { Submit } from "./Submit";
import { useFormValidate } from "@/hooks/useFormValidate";
import { SignUpSchema } from "@/schemas/auth";
import { TSignUpFormError } from "@/types/form";
import { FormMessage } from "./FormMessage";

export function SignUpForm() {
  const { errors, validateField } =
    useFormValidate<TSignUpFormError>(SignUpSchema);
  // 이벤트 핸들러를 사용하기 위해서는 클라이언트 컴포넌트로 변경해야 한다.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  console.log("erros", errors);

  return (
    <FormCard
      title="회원가입"
      footer={{ label: "이미 계정이 있으신가요?", href: "/login" }}
    >
      <form className="space-y-6">
        {/* 이름 */}
        <div className="space-y-2">
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            name="name"
            placeholder="이름을 입력해주세요"
            error={!!errors?.name}
            onChange={handleChange}
          />
          {errors?.name && <FormMessage message={errors?.name[0]} />}
        </div>
        {/* 이메일 */}
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@example.com"
            error={!!errors?.email}
            onChange={handleChange}
          />
        </div>
        {errors?.email && <FormMessage message={errors?.email[0]} />}

        {/* 비밀번호 */}
        <div className="space-y-2">
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            error={!!errors?.password}
            onChange={handleChange}
          />
        </div>
        {errors?.password && <FormMessage message={errors?.password[0]} />}

        <Submit className="w-full">가입하기</Submit>
      </form>
    </FormCard>
  );
}
