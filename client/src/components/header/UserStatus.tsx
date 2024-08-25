import { Button } from "@chakra-ui/react";
import React from "react";
import LoginBtn from "./LoginBtn";
import { auth } from "@/auth";
import ActionArea from "./ActionArea";

export default async function UserStatus() {
  const session = await auth();
  return (
    <>{session?.user ? <ActionArea user={session.user} /> : <LoginBtn />}</>
  );
}
