import { createGlobalStyle } from "styled-components";

export const POSITIVE = '#377674';
export const NEGATIVE = '#B82E14';
export const NEUTRAL = '#CDCDCD';

const GlobalStyle = createGlobalStyle`
	// watchlist full height
	.__watchListStyle {
		max-height: initial !important;
  		overflow-y: auto !important;
	}
	// main: full width
	.__portfolioListStyle {
		padding: 0 40px;
	}
	.page-content * {
		max-width: initial !important;
	}
	// containers:
	.__marketContainerStyle {
		display: flex;
		flex: 1;
	  }
	// search box
	#security-search-input {
		margin-right: 1rem;
	}
	.__hidden {
		position: absolute;
		z-index: -2;
		opacity: 0;
		height: 0;
	}
	// colored order actions
	.__coloredBuyOrderAction:not(:disabled) {
		background: ${POSITIVE}F0;
		:hover {
			background: ${POSITIVE}FF !important;
		}
	}
	.__coloredSellOrderAction:not(:disabled) {
		background: ${NEGATIVE}F0;
		:hover {
			background: ${NEGATIVE}FF !important;
		}
	}
`;

export default GlobalStyle;
