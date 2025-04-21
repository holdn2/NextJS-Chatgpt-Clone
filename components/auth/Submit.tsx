import React, { ComponentProps } from "react";
import { Button } from "../ui/button";

export function Submit({ children, ...others }: ComponentProps<typeof Button>) {
  return (
    <Button type="submit" {...others}>
      {children}
    </Button>
  );
}
