import axios from "axios";

export default async function test() {
  try {
    const response = await axios.get("https://httpstat.us/200");
    console.log(response);
  } catch (error) {
    console.warn("disconnected");
    console.error(error);
  }
}
