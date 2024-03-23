import React from "react";
import { getDomAnchor, nodeListToArray } from "../dom";

const changeOption = (button: HTMLButtonElement, matches: string[]) => {
  if (button.type !== "button") return;
  if (matches.length === 0) {
    button.style.display = "inherit";
  } else if (!matches.some((m) => button.innerText.endsWith(m))) {
    button.style.display = "none";
  }
}

export const useSearchResultsObserver = async (matches: string[]) => {
  const element = (await getDomAnchor(
    "div[data-qa='wstrade-security-search-input']",
    (el) => el.lastElementChild!
  )) as Element;

  React.useEffect(() => {
    const buttons = [...nodeListToArray(element.querySelectorAll("[role='listbox'] > button"))] as HTMLButtonElement[];
    buttons.forEach(button => {
      changeOption(button, []);
      changeOption(button, matches);
    })
  }, [element, matches]);

  const observer = new window.MutationObserver((entries) => {
    if (!Array.isArray(entries) || !entries.length) return;

    entries.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          const button = node as HTMLButtonElement;
          changeOption(button, matches);
        });
      }
    });
  });

  observer.observe(element, {
    childList: true,
    attributes: true,
    subtree: true,
  });
  return observer;
};
