
import { cn } from "@/lib/utils";
import { Price } from "./price";

interface LabelProps {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}

export const Label: React.FC<LabelProps> = ({
  title,
  amount,
  currencyCode,
  position,
}) => {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        }
      )}
    >
      <div className="flex items-center rounded-full border bg-white/70 md:p-1 p-[2px] text-xs font-semibold text-black backdrop-blur-md">
        <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
          {title}
        </h3>
        <Price
          className="flex-none rounded-full bg-blue-600 md:p-2 p-1 text-white"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden"
        />
      </div>
    </div>
  );
};
