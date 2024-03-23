import Axios, { AxiosHeaders } from "axios";
import { getCookie } from "../../cookie";

const headers = {
  accept: "application/json",
  "accept-encoding": "gzip, deflate, br",
  "accept-language": "en-US,en;q=0.9;fr-CA;q=0.8,fr;q=0.7",
  "access-control-allow-headers": "*",
  "access-control-allow-origin": "*",
  "cache-control": "no-cache",
  origin: "https://my.wealthsimple.com",
  pragma: "no-cache",
  referer: "https://my.wealthsimple.com/",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-site",
  "te": "trailers",
  "x-app-platform-os": "web",
  "x-ws-locale": "en-CA",
  "x-ws-profile": "trade",
};

export default function GetAxioDefaults() {
  Axios.defaults.baseURL = "https://trade-service.wealthsimple.com";
  Axios.interceptors.request.use((request) => {
    const accessToken = getCookie("_oauth2_access_v2")?.access_token ?? "";
    request.headers = {
      ...request.headers,
      ... headers,
      authorization: `Bearer ${accessToken}`
    } as unknown as AxiosHeaders;
    return request;
  });
}
