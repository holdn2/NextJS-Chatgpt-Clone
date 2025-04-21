"use client";

import { useFormValidate } from "@/hooks/useFormValidate";
import { ChangeEvent, useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import { FormCard } from "./FormCard";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { FormMessage } from "./FormMessage";
import { Submit } from "./Submit";
import { TLoginFormError } from "@/types/form";
import { LoginSchema } from "@/schemas/auth";
import { login } from "@/actions/login";

export function LoginForm() {
  const [error, action, isPending] = useActionState(login, undefined);
  const { errors, validateField } =
    useFormValidate<TLoginFormError>(LoginSchema);
  // 이벤트 핸들러를 사용하기 위해서는 클라이언트 컴포넌트로 변경해야 한다.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  useEffect(() => {
    if (error?.errorMessage) {
      toast.error(error.errorMessage);
    }
  }, [error]);

  return (
    <FormCard
      title="로그인"
      footer={{ label: "아직 계정이 없으신가요?", href: "/signup" }}
    >
      <form action={action} className="space-y-6">
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

        <Submit className="w-full">로그인</Submit>
      </form>
    </FormCard>
  );
}
