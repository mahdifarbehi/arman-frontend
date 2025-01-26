"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { actionFunction } from "@/utils/types";


const initialState = {
  message: "",
  success: false,
};

function FormContainer({
  action,
  children,
  setOpen,
}: {
  action: actionFunction;
  children: React.ReactNode; 
  setOpen?: (state:boolean) => void;
}) {
  const [state, formAction] = useActionState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
    }
    if (state?.success && setOpen) {
      setOpen(false);
    }
  }, [state,setOpen,toast]);

  return (
    <form action={formAction} className="w-full">
      {children}
    </form>
  );
}

export default FormContainer;
