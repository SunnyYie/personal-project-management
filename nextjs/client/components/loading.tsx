import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export function Loading({
  size = "md",
  fullScreen = false,
  className,
  ...props
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        fullScreen && "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      <span className="sr-only">Loading</span>
    </div>
  );
}
