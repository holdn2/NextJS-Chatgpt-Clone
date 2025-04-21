import { useState } from "react";
import { ZodObject, ZodRawShape } from "zod";

export function useFormValidate<T>(schema: ZodObject<ZodRawShape>) {
  const [errors, setErrors] = useState<Partial<T>>();

  const validateField = (name: string, value: string) => {
    setErrors({
      ...errors,
      [name]: undefined,
    });
    // zod의 pick 메서드: 검증할 필드만 가져오기. 인자로 name을 key로 true를 value로
    const parsedValue = schema.pick({ [name]: true }).safeParse({
      [name]: value,
    });

    // zod의 메서드를 (flatten)을 이용해서 에러가 났을 경우에만 에러메시지 setErrors
    if (!parsedValue.success) {
      setErrors({
        ...errors,
        ...parsedValue.error.flatten().fieldErrors,
      });
    }
  };

  return { errors, validateField };
}
