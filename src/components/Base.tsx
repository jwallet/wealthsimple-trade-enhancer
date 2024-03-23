import React, { ReactNode } from "react";
import Account from "./Account";
import GlobalStyle from "./styles/GlobalStyle";

interface IProps {
  location: { pathname: string; hostname: string };
}

interface IState {
  hasError: boolean;
}

const GetPage = (
  path: string
): ((props: IProps) => ReactNode | null) | null => {
  switch (true) {
    case /\/app\/trade\/accounts\//.test(path):
    case /\/app\/account-details\//.test(path):
      return Account;
    default:
      return null;
  }
};

class Base extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  shouldComponentUpdate(nextProps: IProps) {
    return nextProps.location.pathname !== this.props.location.pathname;
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error(error, errorInfo);
  }

  get Page() {
    return GetPage(this.props.location.pathname);
  }

  get notHandled() {
    return (
      this.state.hasError ||
      (!/my\.wealthsimple\.com\/app\/account-details/.test(window.location.toString()) &&
      !/my\.wealthsimple\.com\/app\/trade/.test(window.location.toString()))
    );
  }

  render() {
    if (this.notHandled) return null;
    const Page = this.Page;
    return (
      <>
        <GlobalStyle />
        {/* <Global location={this.props.location} /> */}
        {Page && <Page location={this.props.location} />}
      </>
    );
  }
}

export default Base;
