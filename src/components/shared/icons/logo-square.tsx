import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export const LogoSquare = ({ size }: { size?: "sm" | undefined }) => {
  return (
    <div
      className={cn(
        "flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black",
        {
          "h-[40px] w-[40px] rounded-xl": !size,
          "h-[30px] w-[30px] rounded-lg": size === "sm",
        }
      )}
    >
      <Logo
        className={cn({
          "h-[16px] w-[16px]": !size,
          "h-[10px] w-[10px]": size === "sm",
        })}
      />
    </div>
  );
}
