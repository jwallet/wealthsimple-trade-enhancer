import { Parser } from "@json2csv/plainjs";
import _orderBy from "lodash.orderby";
import { getPositions } from "../../network";
import { exportExcel } from "../../excel";
import { getYahooSymbol } from "../mapper";
import { mapPositionToTransaction } from "./mapper";
import { Dispatch } from "redux";

export const exportAccountToYahooFinanceExcel =
  (accountId: string) => async (dispatch: Dispatch) => {
    // const activities = await getAllActivities(accountId)(dispatch);
    const accountPositions = (await getPositions()(dispatch)).filter(
      (p: { account_id: string }) => p.account_id === accountId
    );
    const mappedData = accountPositions.flatMap((p) => {
      // const activitiesByStock = activities.filter(
      //   (t) => t.symbol === p.stock.symbol
      // );
      const symbol = getYahooSymbol(
        accountId,
        p.stock.symbol,
        p.stock.primary_exchange
      );
      // const totalShares = getActivitiesTotalShares(activitiesByStock);
      // if (totalShares === toSharesNumber(p.quantity)) {
      //   return activitiesByStock.map((t) => ({
      //     ...mapActivityToTransaction(t),
      //     symbol,
      //   }));
      // }
      return { ...mapPositionToTransaction(p), symbol };
    });

    const fields = [
      {
        label: "Symbol",
        value: "symbol",
      },
      {
        label: "Trade Date",
        value: "date",
      },
      {
        label: "Purchase Price",
        value: "purchase",
      },
      {
        label: "Quantity",
        value: "quantity",
      },
    ];

    const csvData = _orderBy(mappedData, ["symbol", "date"], ["desc", "asc"]);
    
    const parser = new Parser({ fields });
    const csv = parser.parse(csvData);

    const fileName = `yahoo-finance-${accountId}.csv`;
    await exportExcel(csv, fileName);
  };

  export const exportAccountToTrackYourDividendsExcel =
  (accountId: string) => async (dispatch: Dispatch) => {
    const accountPositions = (await getPositions()(dispatch)).filter(
      (p: { account_id: string }) => p.account_id === accountId
    );
    const mappedData = accountPositions.flatMap((p) => {
      const symbol = getYahooSymbol(
        accountId,
        p.stock.symbol,
        p.stock.primary_exchange
      );
      return { ...mapPositionToTransaction(p), symbol };
    });

    const fields = [
      {
        label: "Ticker",
        value: "symbol",
      },
      {
        label: "Quantity",
        value: "quantity",
      },
      {
        label: "Price",
        value: "purchase",
      },
    ];

    const csvData = _orderBy(mappedData, ["symbol"], ["asc"]);

    const parser = new Parser({ fields });
    const csv = parser.parse(csvData);
    const [, ...lines] = csv.split('\n');
    const csvOnlyData = lines.join('\n');

    const fileName = `track-your-dividends-${accountId}.csv`;
    await exportExcel(csvOnlyData, fileName);
  };
