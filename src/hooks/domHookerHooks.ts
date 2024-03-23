import React from "react";
import { getDomAnchor } from "../dom";

const useHookerObserver = async (observeElement: string | Element, callback: (observeElement: Element) => void) => {
  const element = typeof observeElement === 'string'
    ? (await getDomAnchor(
      "div[data-qa='wstrade-security-search-input']",
      (el) => el.lastElementChild!
    )) as Element
    : observeElement;

  const observer = new window.MutationObserver(() => {
      callback(element);
  });

  observer.observe(element, {
    childList: true,
    attributes: true,
    characterData: true,
    subtree: true,
  });

  callback(element);
  
  return observer;
};

/**
 * @deprecated not used, does not work with useEffect, see above function
 */
const useHookerChildrenObserver = (observeElement: string, query?: string, callback?: (container: HTMLElement, elements: HTMLElement[]) => void) => {
  const [hookElements, setHookElements] = React.useState<HTMLElement[]>([]);

  const ref = React.useRef<Node>();

  const observer = React.useMemo(
    () =>
      new window.MutationObserver(() => {
        if (query) {
          const elements = document.querySelectorAll(query);
          setHookElements([...((elements as NodeListOf<HTMLElement>) || [])]);
        }
        if (callback) {
          callback(ref.current! as HTMLElement, hookElements);
        }
      }),
    []
  );

  React.useEffect(() => {
    ref.current = document.querySelector(observeElement) as Node;

    if (query) {
      const elements = document.querySelectorAll(query);
      setHookElements([...((elements as NodeListOf<HTMLElement>) || [])]);
    }    

    if (callback) {
      callback(ref.current! as HTMLElement, hookElements);
    }

    observer.observe(ref.current, { attributes: false, childList: true, subtree: true });

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, observer, callback]);

  return [ref.current, hookElements];
};

export { useHookerChildrenObserver, useHookerObserver };
