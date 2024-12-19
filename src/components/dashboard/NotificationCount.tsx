import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type NotificationCountProps = ComponentProps<"span"> & {
  count: number;
};

export const NotificationCount = ({
  className,
  count = 0,
  ...props
}: NotificationCountProps) => {
  if (count == 0) return null;
  return (
    <span
      className={cn(
        "flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground",
        className,
      )}
      {...props}
    >
      {count}
    </span>
  );
};
