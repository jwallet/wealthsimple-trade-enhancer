import Axios, { AxiosError } from "axios";
import { Dispatch } from "redux";

export interface IPosition {
  id: string;
  account_id: string;
  book_value: { amount: number; currency: "CAD" | "USD" };
  market_book_value: { amount: number; currency: "CAD" | "USD" };
  created_at: Date | string;
  quantity: number;
  stock: { symbol: string; name: string; primary_exchange: "TSX" | "TSX-V" };
  groups: { name_en: string }[];
  todays_earnings_baseline_value: { amount: number };
  quote: { amount: number; currency: "CAD" | "USD", previous_close: number };
}

export interface IPositionsResponse {
  bookmark: string;
  results: IPosition[];
}

export const getPositions = () => async (dispatch: Dispatch) => {
  try {
    const response = await Axios.get("/account/positions");
    const positions = (response.data as IPositionsResponse).results;
    dispatch({ type: "SAVE_POSITIONS", payload: positions });
    return positions;
  } catch (error: unknown) {
    console.error(error, (error as AxiosError).toJSON());
    throw error;
  }
};
