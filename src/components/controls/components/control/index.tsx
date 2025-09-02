import type { ButtonHTMLAttributes } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  tooltip: string;
};

export function Control({ tooltip, children, className, ...props }: Props) {
  return (
    <Tooltip>
      <TooltipContent side="left" sideOffset={12}>
        {tooltip}
      </TooltipContent>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center justify-center size-8 rounded-full motion-safe:transition-colors text-white/56 hover:text-white focus-visible:text-white hover:bg-white/10 focus-visible:bg-white/10 focus-visible:ring-0 focus-visible:outline-hidden not-disabled:cursor-pointer",
            className,
          )}
          aria-label={tooltip}
          {...props}
        >
          {children}
        </button>
      </TooltipTrigger>
    </Tooltip>
  );
}
