import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

export interface RadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  icon?: React.ReactNode;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ className, label, icon, ...props }, ref) => {
    return (
      <>
        <label
          className={cn(
            "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            "bg-background hover:bg-accent hover:text-accent-foreground",
            "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground",
            "cursor-pointer",
            className
          )}
        >
          <RadioGroupItem ref={ref} className="sr-only" {...props} />
          <div>
            {icon && <span>{icon}</span>}
            {label}
          </div>
        </label>
      </>
    );
  }
);
RadioButton.displayName = "RadioButton";

export { RadioButton };
