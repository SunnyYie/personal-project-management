import { cn } from "@/lib/utils";
import React from "react";

export interface AvatarGroupProps {
  children: React.ReactElement[];
  maxCount?: number;
  size?: "small" | "default" | "large";
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  maxCount = 5,
  size = "small",
  className,
}) => {
  const avatars = React.Children.toArray(children) as React.ReactElement[];
  const displayAvatars = avatars.slice(0, maxCount);

  return (
    <div className={cn("flex -space-x-4", className)}>
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className="relative z-0 hover:z-10 transition-transform hover:scale-110"
        >
          {React.cloneElement(avatar, { size })}
        </div>
      ))}
    </div>
  );
};
