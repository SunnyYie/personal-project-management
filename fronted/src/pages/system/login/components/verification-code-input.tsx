import { useState, useEffect, forwardRef } from "react";
import { Input } from "@/components/ui/input";

import { UseFormRegisterReturn } from "react-hook-form";

interface VerificationCodeInputProps extends Partial<UseFormRegisterReturn> {
  onComplete: (code: string) => void;
  disabled: boolean;
}

const VerificationCodeInput = forwardRef<
  HTMLInputElement,
  VerificationCodeInputProps
>(
  (
    { onComplete, disabled, onChange: formOnChange, onBlur: formOnBlur, name },
    ref
  ) => {
    const [code, setCode] = useState("");

    const handleChange = (value: string) => {
      setCode(value);
      // 触发 react-hook-form 的 onChange
      formOnChange?.({
        target: {
          name,
          value,
        },
      });
    };

    useEffect(() => {
      if (code.length === 6) {
        onComplete(code);
      }
    }, [code, onComplete]);

    return (
      <div className="flex justify-between space-x-2">
        <Input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={formOnBlur}
          placeholder="请输入验证码"
          disabled={disabled}
        />
      </div>
    );
  }
);

export default VerificationCodeInput;
