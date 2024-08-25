import { signIn } from "@/auth";
import { Button } from "@chakra-ui/react";
import React from "react";

type Props = {};

export default function LoginBtn({}: Props) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button type="submit" variant={"primary"}>
        Login
      </Button>
    </form>
  );
}
