import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function Control({ children, className, ...props }: Props) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center size-8 rounded-full motion-safe:transition-colors text-white/56 hover:text-white focus-visible:text-white hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-0 focus-visible:outline-hidden not-disabled:cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
