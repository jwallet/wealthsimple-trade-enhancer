import { IActivity } from "../background/network";
import { IPosition } from "../background/network/position";
import {
  getDateYearMonthDay,
  getLastYearDateYearMonthDay,
} from "../helpers";
import { toSharesNumber } from "../background/store/mapper";

export const mapActivityToTransaction = (activity: IActivity) => ({
  symbol: activity.symbol,
  date: getDateYearMonthDay(activity.created_at),
  purchase: activity.market_value.amount / activity.quantity,
  quantity: activity.order_type.includes("sell")
    ? -activity.quantity
    : activity.quantity,
});

export const mapPositionToTransaction = (position: IPosition) => {
  return {
    date: getLastYearDateYearMonthDay(),
    purchase: position.market_book_value.amount / position.quantity,
    quantity: position.quantity,
  };
};

export const getActivitiesTotalShares = (activitiesByStock: IActivity[]) => {
  const count = activitiesByStock.reduce(
    (acc, a) => acc + (a.order_type.includes("sell") ? -1 : 1) * a.quantity,
    0
  );
  return toSharesNumber(count);
};
