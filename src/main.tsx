import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import './index.css'
import GetAxioDefaults from './background/network/axios.ts'
import Root from './Root.tsx'
import { createDomAnchor } from './dom.ts'
import { thunk } from "redux-thunk";
import { APP_ROOT } from './constant.ts'
import { Store, applyMiddleware } from 'webext-redux'

console.log("[WEALTHSIMPLE TRADE] Starting up...");

GetAxioDefaults();

createDomAnchor("body", APP_ROOT).then(() => {
  const store = new Store();

  const storeEnhanced = applyMiddleware(store, thunk);
  const t = ReactDOM.createRoot(document.getElementById(APP_ROOT)!);

  store
    .ready()
    .then(() => {
      t.render(
        <Provider store={storeEnhanced}>
          <Root />
        </Provider>,
      );
    })
    .catch((error) => console.error("[WEALTHSIMPLE TRADE] Store Error", error));
});