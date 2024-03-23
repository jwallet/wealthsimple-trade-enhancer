import Decimal from 'decimal.js';

export const roundTo = (
  value?: number | string,
  type: "CAD" | "USD" | "%" | "" = ""
) => {
  if (value === undefined) return "-";
  const number = Number(value);
  switch (type) {
    case "CAD":
    case "USD":
      return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: type,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number);
    case "%":
      return new Intl.NumberFormat("en-CA", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number);
    default:
      return new Intl.NumberFormat("en-CA", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(number);
  }
};

export const toAmountCurrency = (amount: number, currency?: 'CAD' | 'USD', opts = {}) => {
  const formattedAmount = new Intl.NumberFormat("en-CA", { style: 'currency', currency: currency || "CAD", currencyDisplay: 'narrowSymbol', ...opts }).format(amount);
  return [formattedAmount, currency].filter(Boolean).join(" ");
}

export const toDiffWithPercent = (prev: number, next: number) => {
  const diff = new Decimal(next).minus(prev).toNumber();
  const formattedDiff = toAmountCurrency(diff);
  const percentDiff = new Decimal(diff).dividedBy(prev).toNumber();
  const formattedPercentDiff =  `(${new Intl.NumberFormat("en-CA", { style: 'percent', maximumFractionDigits: 2 }).format(percentDiff)})`;
  return [formattedDiff, formattedPercentDiff].join(' ');
}