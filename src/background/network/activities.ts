import Axios, { AxiosError } from "axios";
import { Dispatch } from "redux";

export interface IActivity {
  id: string;
  account_id: string;
  created_at: Date | string;
  market_value: { amount: number; currency: "CAD" | "USD" };
  order_type: "buy_quantity" | "sell_quantity";
  quantity: number;
  status: "posted" | "cancelled";
  symbol: string;
}

export interface IActivitiesResponse {
  bookmark: string;
  results: IActivity[];
}

export const getActivities = async (
  accountId: string,
  bookmark?: string,
  limit: number = 99
) => {
  const params = new URLSearchParams("type=buy&type=sell");
  params.set("account_ids", accountId);
  params.set("limit", limit.toString());
  if (bookmark) {
    params.set("bookmark", bookmark);
  }

  try {
    const response = await Axios.get("/account/activities", {
      params: params,
    });
    return response.data as IActivitiesResponse;
  } catch (error) {
    console.error(error, (error as AxiosError).toJSON());
    throw error;
  }
};

export const getAllActivities = (accountId: string) => async (
  dispatch: Dispatch
) => {
  const activities: IActivity[] = [];

  const transactionsFetcher = async (bookmark?: string) => {
    const data = await getActivities(accountId, bookmark);
    if (data.results.length === 0) return;
    activities.push(...data.results.filter((x) => x.status !== "cancelled"));
    await transactionsFetcher(data.bookmark);
  };

  await transactionsFetcher();

  dispatch({ type: "SAVE_ACTIVITIES", payload: activities });

  return activities;
};
