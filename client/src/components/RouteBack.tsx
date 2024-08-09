import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ButtonHTMLAttributes } from "react";

type Props = ButtonProps;

export default function RouteBack({ onClick, ...props }: Props) {
  const { back } = useRouter();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) onClick(e);
    back();
  };

  return (
    <Button onClick={handleClick} {...props}>
      <ArrowBackIcon />
    </Button>
  );
}
