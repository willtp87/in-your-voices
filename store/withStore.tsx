import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../store";

// Make the Redux store available to the top-level component.
export default function withStore(WrappedComponent: React.FC) {
  return class WithStore extends React.Component {
    render() {
      return (
        <Provider store={store} {...this.props}>
          <PersistGate loading={null} persistor={persistor}>
            <WrappedComponent />
          </PersistGate>
        </Provider>
      );
    }
  };
}
