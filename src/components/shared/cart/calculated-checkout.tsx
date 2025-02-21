import { Price } from "../price";

interface CalculatedCheckoutProps {
  totalAmount: string;
  totalAmountCurrencyCode: string;
  totalTaxAmount: string;
  totalTaxAmountCurrencyCode: string;
}

export const CalculatedCheckout: React.FC<CalculatedCheckoutProps> = ({
  totalAmount,
  totalAmountCurrencyCode,
  totalTaxAmount,
  totalTaxAmountCurrencyCode,
}) => {
  return (
    <div className="py-4 text-sm text-neutral-500">
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1">
        <p>Taxes</p>
        <Price
          className="text-right text-base text-black"
          amount={totalTaxAmount}
          currencyCode={totalTaxAmountCurrencyCode}
        />
      </div>
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
        <p>Shipping</p>
        <p className="text-right">Calculated at checkout</p>
      </div>
      <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1">
        <p>Total</p>
        <Price
          className="text-right text-base text-black"
          amount={totalAmount}
          currencyCode={totalAmountCurrencyCode}
        />
      </div>
    </div>
  );
};
