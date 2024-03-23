import { combineReducers } from "redux";
import { APP_STATE } from "../../constant";

// Enhance the Action interface with the option of a payload.
// While still importing the Action interface from redux.
declare module "redux" {
  export interface Action<T = any, P = any> {
    type: T;
    payload?: P;
  }
}

type OnSuccess = () => void;
type OnError = (e: Error) => void;

export interface IState {
  // nothing here yet
}

export const loadState = (): IState | undefined => {
  try {
    const serializedState = window.localStorage.getItem(APP_STATE);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (
  state: IState,
  success: OnSuccess = () => {},
  error: OnError = () => {}
) => {
  try {
    const serializedState = JSON.stringify(state);
    window.localStorage.setItem(APP_STATE, serializedState);
    success();
  } catch (e: unknown) {
    error(e as Error);
  }
};

const reducers = combineReducers<IState>({
// nothing yet
});

export default reducers;
