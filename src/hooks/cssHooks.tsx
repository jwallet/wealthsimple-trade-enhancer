import React from "react";
import _get from 'lodash.get';
import { getDomAnchor } from '../dom';

export const usePortfolioListFullWidth = async (location: { pathname: string }) => {
    const patchStyle = async () => {
        const element = (await getDomAnchor(
            '[data-qa="wstrade-position-list"]',
            (el) => _get(el, 'parentElement.parentElement.parentElement', null)
          )) as HTMLDivElement;
        if (element) {
            element.className = "__portfolioListStyle";
        }
    }
    React.useLayoutEffect(() => {
        if (location.pathname.startsWith('/app/trade/accounts/')) {
            patchStyle();
        }
    }, []);
}

export const useWatchListFullHeight = async (location: { pathname: string }) => {
    const patchStyle = async () => {
        const element = (await getDomAnchor(
            '[data-qa="wstrade-watchlist"]',
            (el) => _get(el, 'lastChild.childNodes[0]', null)
          )) as HTMLDivElement;
        if (element) {
            element.className = "__watchListStyle";
        }
    }
    React.useLayoutEffect(() => {
        if (location.pathname.startsWith('/app/trade/accounts/')) {
            patchStyle();
        }
    }, []);
}