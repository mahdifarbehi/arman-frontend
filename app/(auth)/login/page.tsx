"use client";
import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/utils/actions";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";

import { SubmitButton } from "@/components/form/Buttons";
const initialState = {
  message: "",
  success: false,
  data: "",
};
function LoginPage() {
  const [state, formAction] = useActionState(login, initialState);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      const token = state.data;
      document.cookie = `token=${token}; path=/; sameSite=Strict; secure`;
      localStorage.setItem("token", token);
      toast({ description: state.message });
      router.push("/");
    } else if (!state?.success && state?.message)
      toast({
        description: state?.message || " نام کاربری یا رمز عبور درست نمی باشد",
      });
  }, [state, toast, router]);
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          ورود به پنل
        </h1>
        <form action={formAction}>
          <div className="space-y-6">
            <div className="mb-2">
              <Label>نام کاربری</Label>{" "}
              <Input
                type="text"
                name="username"
                placeholder="نام کاربری خود را وارد کنید"
                required
                className="text-black"
              />
            </div>
            <div className="mb-2">
              <Label>رمز عبور</Label>
              <Input
                type="password"
                name="password"
                placeholder="رمز عبور خود را وارد کنید"
                required
                className="text-black"
              />
            </div>
          </div>
          <div className="mt-6">
            <SubmitButton text="ورود" className="w-full" />
          </div>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          دسترسی به پنل نیازمند مجوز است.
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
