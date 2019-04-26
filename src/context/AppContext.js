import React from "react";

export const AppContext = React.createContext({
  invoice: {},
  masterChanged: false,
  setInvoice: invoiceParam => {}
});

export class AppContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      invoice: {},
      masterChanged: false
    };
    this.masterChanged = this.setMasterChanged.bind(this);
    this.setInvoice = this.setInvoice.bind(this);
  }

  setInvoice(invoiceParam) {
    this.setState({ invoice: invoiceParam });
  }
  setMasterChanged() {
    this.setState({ masterChanged: true });
  }

  render() {
    const { children } = this.props;
    const { invoice, masterChanged } = this.state;

    return (
      <AppContext.Provider
        value={{
          invoice,
          masterChanged,
          setMasterChanged: this.setMasterChanged,
          setInvoice: this.setInvoice
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export const AppContextConsumer = AppContext.Consumer;
