import React, { useEffect } from "react";
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import { isProduction } from "../process";
import { useAccountDropdownConnectorNextRenderer, useAccountDropdownConnectorRenderer } from "../hooks/accountHooks";
import { SecondaryButton } from "./styles/ButtonStyle";
import { getAccountId } from "../location";
import { connect } from "react-redux";
import { exportAccountToTrackYourDividendsExcel, exportAccountToYahooFinanceExcel } from "../background/store/accounts";

export interface IProps {
  location: { pathname: string };
  exportAccountToYahooFinanceExcel: (accountId: string) => void;
  exportAccountToTrackYourDividendsExcel: (accountId: string) => void;
}


const Account = (props: IProps) => {
  const id = getAccountId(props.location.pathname);
  const [, forceUpdate] = React.useState(0);

  useEffect(() => {
    const itv = setInterval(() => forceUpdate((prev) => prev + 1), 1000);
    return () => clearInterval(itv);
  }, []);

   const renderExportToExcel = React.useCallback(() => (
    <DropdownMenu
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    trigger={({ triggerRef, isSelected, testId, ...providedProps }) => (
      <SecondaryButton
      type="button"
      title="Export account to Excel CSV"
      {...providedProps}
      ref={triggerRef as React.Ref<HTMLButtonElement>}     
    >
      Export
    </SecondaryButton>
    )}
    >
      <DropdownItemGroup>
        {[
          { 
            service: 'Yahoo Finance',
            link: 'https://finance.yahoo.com/portfolios',
            generate: () => {
              return props.exportAccountToYahooFinanceExcel(id);
            } 
          },
          {
            service: 'Track Your Dividends', 
            link: 'https://trackyourdividends.com/dashboard/bulk-upload',
            generate: () => {
              return props.exportAccountToTrackYourDividendsExcel(id);
            }
          }
        ].map(opt => (
          <DropdownItem onClick={opt.generate}>
            <span>{opt.service}</span>
            <svg
            style={{float: 'right'}}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              height="22"
              width="22"
              onClick={() => window.open(opt.link, '_blank')}
            >
              <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
            </svg>
          </DropdownItem>
        ))}
      </DropdownItemGroup>
    </DropdownMenu>
  ), [id, props]);

  useAccountDropdownConnectorNextRenderer(
    "export-account-transactions-to-yahoo-finance-next",
    renderExportToExcel
  );

  useAccountDropdownConnectorRenderer(
    "export-account-transactions-to-yahoo-finance",
    renderExportToExcel
  );

  return isProduction() ? null : <span>Account</span>;
};

const connected = connect(() => ({
  // 
}), {
  exportAccountToYahooFinanceExcel,
  exportAccountToTrackYourDividendsExcel,
})(Account);

export default connected;