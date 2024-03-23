import ReactDOM from "react-dom";
import { createDomAnchor } from "../dom";

export const useAccountDropdownConnectorRenderer = async (
  id: string,
  render: () => JSX.Element,
  callback?: () => void
) => {
  if (!document.getElementById(id)) {
    await createDomAnchor(
      "button[data-cy='account-switcher-dropdown']",
      id,
      "last",
      (el) => el.parentElement!.parentElement
    );
  }
  ReactDOM.render(render(), document.getElementById(id), callback);
};

export const useAccountDropdownConnectorNextRenderer = async (
  id: string,
  render: () => JSX.Element,
  callback?: () => void
) => {
  if (!document.getElementById(id)) {
    await createDomAnchor(
      'button[data-qa="account-actions-menu"]',
      id,
      "first",
      el => el.parentElement!.parentElement
    );
    const el = document.getElementById(id);
    if (el) {
      el.style.marginRight = "10px";
      const parent = el.parentElement!;
      parent.style.display = "flex";
      parent.style.flexDirection = "row";
      parent.style.alignItems = "center";
    }

  }
  ReactDOM.render(render(), document.getElementById(id), callback);
};
