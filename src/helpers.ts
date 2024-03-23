import _camelCase from "lodash.camelcase";
import _get from "lodash.get";
import _set from "lodash.set";
import _has from "lodash.has";

export function toCamelCase(o: object | object[]) {
  let newO, origKey, newKey, value;
  if (o instanceof Array) {
    return o.map(function (value) {
      if (typeof value === "object") {
        value = toCamelCase(value);
      }
      return value;
    });
  } else {
    newO = {} as object;
    for (origKey in o) {
      if (_has(o, origKey)) {
        newKey = _camelCase(origKey);
        value = _get(o, origKey);
        if (
          value instanceof Array ||
          (value !== null && value.constructor === Object)
        ) {
          value = toCamelCase(value);
        }
        _set(newO, newKey, value);
      }
    }
  }
  return newO;
}

export const getYesterdayDateYearMonthDay = (
  dateString: Date | string,
  separator: string = ""
) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  return getDateYearMonthDay(date, separator);
};

export const getLastYearDateYearMonthDay = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);
  return getDateYearMonthDay(date);
};

export const getDateYearMonthDay = (
  dateString: Date | string,
  separator: string = ""
) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return [year, month, day].join(separator);
};

export const upsertObjectToArray = (
  array: object[],
  payload: object,
  basedOnProperty = "id"
) => {
  const index = array.findIndex(
    (x) => _get(x, basedOnProperty) === _get(payload, basedOnProperty)
  );
  return index === -1
    ? [...array, payload]
    : [...array.slice(0, index), payload, ...array.slice(index + 1)];
};

export const changeSorting = (sort: "asc" | "desc") => {
  switch (sort) {
    case "asc":
      return "desc";
    case "desc":
    default:
      return "asc";
  }
}