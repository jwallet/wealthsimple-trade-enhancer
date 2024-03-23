const setCookie = (name: string, value: string, hours: number) => {
  let expires = "";
  if (hours) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ""}${expires}; Path=/; SameSite=Lax;`;
};

const decodeHTML = (value: string) => {
  if (!value) return null;
  const txt = decodeURIComponent(value);
  if (txt.startsWith("{") && txt.endsWith("}")) {
    return JSON.parse(txt);
  }
  return txt;
};

const getCookie = (name: string) => {
  const ca = document.cookie.split("; ");
  const cookies = ca
    .filter((c) => c.includes("="))
    .map((c) => {
      const [name, value] = c.trim().split("=");
      return {
        name,
        value: decodeHTML(value),
      };
    });
  return cookies.find((c) => c.name === name)?.value;
};

const eraseCookie = (name: string) => {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

export { setCookie, getCookie, eraseCookie };
