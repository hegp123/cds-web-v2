import React from "react";

export const AppContext = React.createContext({
  invoice: {},
  setInvoice: invoiceParam => {}
});

export class AppContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      invoice: {}
    };

    this.setInvoice = this.setInvoice.bind(this);
  }

  setInvoice(invoiceParam) {
    this.setState({ invoice: invoiceParam });
  }

  render() {
    const { children } = this.props;
    const { invoice } = this.state;

    return (
      <AppContext.Provider
        value={{
          invoice,
          setInvoice: this.setInvoice
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = AppContext.Consumer;
