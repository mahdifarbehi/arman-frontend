"use client";

import { RxReload } from "react-icons/rx";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

import { LuTrash2, LuPencil } from "react-icons/lu";

type actionType = "edit" | "delete";
type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

type StatusButtonProps = {
  className?: string;
  text?: string;
  size?: "default" | "lg" | "sm";
  onClick: () => void;
};
export function StatusButton({
  className = "",
  text,
  size = "lg",
  onClick,
}: StatusButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-1/3 h-10"
      size={size}
      onClick={onClick}
      variant="outline"
    >
      {pending ? (
        <>
          <RxReload className={`mr-2 h-4 w-4 animate-spin ${className}`} />
          منتظر بمانید...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
export function SubmitButton({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className={`capitalize ${className}`}
      size={size}
    >
      {pending ? (
        <>
          <RxReload className="mr-2 h-4 w-4 animate-spin" />
          منتظر بمانید...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LuPencil />;
      case "delete":
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${never}`);
    }
  };

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? <RxReload className=" animate-spin" /> : renderIcon()}
    </Button>
  );
};
