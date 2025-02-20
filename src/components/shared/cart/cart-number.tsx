export const CartNumber = ({
  quantity,
}: {
  className?: string;
  quantity?: number;
}) => {
  return (
    <>
      {quantity ? (
        <div
          className="flex flex-col justify-center items-center absolute left-9 -top-1 h-4 w-4 rounded-md
         bg-blue-600 text-[11px] font-medium text-white p-[9px]"
        >
          {quantity}
        </div>
      ) : null}
    </>
  );
};
