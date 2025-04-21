import React, { ComponentProps, useActionState } from "react";
import { Button } from "../ui/button";
import { login } from "@/actions/login";

export function Submit({ children, ...others }: ComponentProps<typeof Button>) {
  const [error, action, isPending] = useActionState(login, undefined);

  return (
    <Button disabled={isPending} type="submit" {...others}>
      {children}
    </Button>
  );
}
