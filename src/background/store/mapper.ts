const getSymbol = (symbol: string, exchange: string) => {
  const symbolFormatted = symbol.replace(".", "-");
  if (!symbolFormatted) return "";
  switch (exchange) {
    case "TSX":
      return `${symbolFormatted}.TO`;
    case "TSX-V":
      return `${symbolFormatted}.V`;
    default:
      return symbolFormatted;
  }
};

const getCryptoSymbol = (symbol: string) => (symbol ? `${symbol}-CAD` : "");

export const getYahooSymbol = (
  compareToCrypto: string,
  symbol: string,
  exchange: string
) =>
  compareToCrypto.includes("crypto")
    ? getCryptoSymbol(symbol)
    : getSymbol(symbol, exchange);

export const getSecurityName = (type: string) => {
  switch (type.toLocaleLowerCase()) {
    case "equity":
      return "Equity";
    case "cryptocurrency":
      return "Crypto";
    case "exchange_traded_fund":
      return "ETF";
    default:
      return "Other";
  }
};

export const toSharesNumber = (shares: number) =>
  Number(
    new Intl.NumberFormat("en-CA", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    }).format(shares)
  );
