import ElementReady from "element-ready";

let creatingNodeFor = "";

export const createDomAnchor = (
  connectTo: string,
  anchorId: string,
  insertionType: "first" | "last" | "clear" = "first",
  elementSelector: (el: Element) => Element | null = (el) => el,
  cssClass?: string
): Promise<Element> => {
  return new Promise((resolve, reject) => {
    ElementReady(connectTo, {
      stopOnDomReady: false,
      timeout: 10000,
    })
      .then((container) => {
        if (container == null) return reject();
        if (creatingNodeFor === anchorId) return reject();
        creatingNodeFor = anchorId;
        const anchor = document.createElement("div");
        anchor.setAttribute("id", anchorId);
        if (cssClass) anchor.classList.add(cssClass);
        const newContainer = elementSelector(container)!;
        switch (insertionType) {
          case "first":
            newContainer.insertBefore(anchor, newContainer.childNodes[0]);
            break;
          case "last":
            newContainer.appendChild(anchor);
            break;
          case "clear":
            newContainer.innerHTML = "";
            newContainer.appendChild(anchor);
            break;
          default:
            break;
        }
        return resolve(anchor);
      })
      .catch(() => {
        const fakeAnchor = document.createElement("div");
        fakeAnchor.style.position = "absolute";
        fakeAnchor.style.top = "-1000px";
        fakeAnchor.style.zIndex = "-1000";
        fakeAnchor.style.visibility = "hidden";
        document.body.appendChild(fakeAnchor);
      });
      creatingNodeFor = "";
  });
};

export const getDomAnchor = (
  connectTo: string,
  elementSelector: (el: Element) => Element | null = (el) => el
) => {
  return new Promise((resolve, reject) => {
    ElementReady(connectTo, {
      stopOnDomReady: false,
      timeout: 10000,
    })
      .then((container) => {
        if (container == null) return reject();
        const newContainer = elementSelector(container)!;
        return resolve(newContainer);
      })
      .catch(() => {
        const fakeAnchor = document.createElement("div");
        fakeAnchor.style.position = "absolute";
        fakeAnchor.style.top = "-1000px";
        fakeAnchor.style.zIndex = "-1000";
        fakeAnchor.style.visibility = "hidden";
        document.body.appendChild(fakeAnchor);
      });
  });
};

export const getClassNameToQuerySelector = (className: string) => `.${className.replace(/\s/g, '.')}`;

export const nodeListToArray = (elements: NodeListOf<any>) => {
  const result: any[] = [];
  elements.forEach(element => {
    result.push(element);
  });
  return result;
}