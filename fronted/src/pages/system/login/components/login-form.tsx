import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import VerificationCodeInput from "./verification-code-input";
import Github from "@/assets/icons/github";
import Google from "@/assets/icons/google";

import { LoginFormSchema, LoginFormType } from "@/api/user/types";
import commonService from "@/api/commonService";
import { useSignIn } from "@/store/user";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface LoginFormProps {
  onForgotPassword: () => void;
}

export default function LoginForm({ onForgotPassword }: LoginFormProps) {
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
  const [showVerification, setShowVerification] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: commonService.sendCode,
  });
  const signIn = useSignIn();

  const handleLogin = async (data: LoginFormType) => {
    if (!showVerification) {
      setLoading(true);
      // 调用获取验证码的接口
      await mutation.mutateAsync({ email: data.email });

      setLoading(false);
      // 成功后展示
      setShowVerification(true);
      return;
    }

    setLoading(true);
    await signIn(data);

    setLoading(false);
    navigate("/", { replace: true });
  };

  const handleVerification = (code: string) => {
    setValue("verificationCode", code);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          disabled={loading}
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
          disabled={loading}
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
            disabled={loading}
            {...register("verificationCode")}
          />
          {errors.verificationCode && (
            <p className="text-sm text-red-500">
              {errors.verificationCode.message}
            </p>
          )}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {showVerification ? "登录" : "发送验证码"}
      </Button>
      <div className="text-center">
        <Button variant="link" onClick={onForgotPassword} disabled={loading}>
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
        <Button
          variant="outline"
          onClick={() => handleSocialLogin("github")}
          disabled={loading}
        >
          <Github className="mr-2 h-4 w-4" /> GitHub
        </Button>
        <Button
          variant="outline"
          onClick={() => handleSocialLogin("google")}
          disabled={loading}
        >
          <Google className="mr-2 h-4 w-4" /> Google
        </Button>
      </div>
    </form>
  );
}
