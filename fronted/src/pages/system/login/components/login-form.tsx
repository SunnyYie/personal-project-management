import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import VerificationCodeInput from "./verification-code-input";
import Github from "@/assets/icons/github";
import Google from "@/assets/icons/google";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormSchema, LoginFormType } from "../types";

interface LoginFormProps {
  onForgotPassword: () => void;
}

export default function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [showVerification, setShowVerification] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = (data: LoginFormType) => {
    console.log(data, errors);
    if (!showVerification) {
      // 调用获取验证码的接口

      // 成功后展示
      setShowVerification(true);
      return;
    }
    // 验证code是否等于验证码发送的code
  };

  const handleVerification = (code: string) => {
    setValue("verificationCode", code);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <Input
          id="password"
          type="password"
          placeholder="******"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {showVerification && (
        <div className="space-y-2">
          <Label htmlFor="verificationCode">验证码</Label>
          <VerificationCodeInput
            onComplete={handleVerification}
            {...register("verificationCode")}
          />
          {errors.verificationCode && (
            <p className="text-sm text-red-500">
              {errors.verificationCode.message}
            </p>
          )}
        </div>
      )}

      <Button type="submit" className="w-full">
        {showVerification ? "登录" : "发送验证码"}
      </Button>
      <div className="text-center">
        <Button variant="link" onClick={onForgotPassword}>
          忘记密码？
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            或通过以下方式登录
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Button variant="outline" onClick={() => handleSocialLogin("github")}>
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Button>
        <Button variant="outline" onClick={() => handleSocialLogin("google")}>
          <Google className="mr-2 h-4 w-4" /> Google
        </Button>
      </div>
    </form>
  );
}
