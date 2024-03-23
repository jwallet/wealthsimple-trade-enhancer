import { compose, applyMiddleware, Store, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { wrapStore } from "webext-redux";
import reducers, { IState, loadState, saveState } from "../background/store";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const storeInstance = legacy_createStore(reducers, loadState(), (applyMiddleware(thunk)));

const promiseResponder = (
  dispatchResult: { _sender: never; payload: never; type: string },
  send: (params: unknown) => void,
  store: Store<IState>
) => {
  Promise.resolve(dispatchResult)
    .then((res) => {
      send({
        error: null,
        value: res,
      });
      saveState(store.getState());
    })
    .catch((err) => {
      console.error("[MY WEALTHSIMPLE TRADE] error dispatching result:", err);
      send({
        error: err.message,
        value: null,
      });
    });
};

wrapStore(storeInstance, {
  dispatchResponder: (dispatchResult: never, send: never) =>
    promiseResponder(dispatchResult, send, storeInstance as Store<IState>),
});
