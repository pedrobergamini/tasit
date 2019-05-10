import React from "react";
import { YellowBox } from "react-native";
import { AppLoading, Font } from "expo";
import PropTypes from "prop-types";
import AppNavigator from "./AppNavigator";
import { Provider } from "react-redux";
import { createStore } from "redux";
import decentralandApp from "@redux/reducers";
import {
  setAccount,
  setMyAssetsList,
  setAccountCreationStatus,
  setAccountCreationActions,
  addUserAction,
} from "@redux/actions";
import applyMiddleware from "@redux/middlewares";
import { Action } from "tasit-sdk";
const { ConfigLoader } = Action;
import tasitSdkConfig from "./config/current";
import { checkBlockchain, showFatalError } from "@helpers";
import {
  retrieveAccount,
  clearAllStorage,
  retrieveMyAssets,
  retrieveAccountCreationStatus,
  retrieveAccountCreationActions,
  storeIsFirstUse,
  retrieveIsFirstUse,
  retrieveUserActions,
} from "@helpers/storage";
import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";

const store = createStore(decentralandApp, applyMiddleware);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  async componentDidMount() {
    // Ignoring setting timer warnings on the app UI
    YellowBox.ignoreWarnings(["Setting a timer"]);
  }

  // Refs: https://docs.nativebase.io/docs/GetStarted.html
  async _loadFonts() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
  }

  async _setupTasitSDK() {
    ConfigLoader.setConfig(tasitSdkConfig);
    const connectionOK = await checkBlockchain();
    if (!connectionOK) {
      const errorMessage = `Failed to establish the connection to the blockchain.
Is the config file correct?`;
      showFatalError(errorMessage);
    }
  }

  async _checkIfIsFirstUse() {
    // Note: Forcing account removal after app uninstall
    // On iOS environment, Secure Store data remains even after app uninstallation
    const isFirstUse = await retrieveIsFirstUse();
    if (isFirstUse) {
      await clearAllStorage();
      await storeIsFirstUse(false);
    }
  }

  async _loadAccountInfo() {
    const account = await retrieveAccount();
    const creationStatus = await retrieveAccountCreationStatus();
    const creationActions = await retrieveAccountCreationActions();

    if (account) {
      store.dispatch(setAccount(account));
    }

    if (creationStatus) {
      store.dispatch(setAccountCreationStatus(creationStatus));
    }

    if (creationActions) {
      store.dispatch(setAccountCreationActions(creationActions));
    }
  }

  async _loadMyAssets() {
    const myAssets = await retrieveMyAssets();
    const userActions = await retrieveUserActions();

    if (userActions) store.dispatch(addUserAction(userActions));
    if (myAssets) store.dispatch(setMyAssetsList(myAssets));
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <Root>
            <AppNavigator />
          </Root>
        </Provider>
      );
    }
  }

  // More about AppLoading: https://docs.expo.io/versions/latest/sdk/app-loading/
  _loadResourcesAsync = async () => {
    const loadFonts = this._loadFonts();
    const loadTasitSDK = this._setupTasitSDK();

    const loadFromStorage = async () => {
      await this._checkIfIsFirstUse();
      const loadMyAssets = this._loadMyAssets();
      const loadAccountInfo = this._loadAccountInfo();
      return Promise.all([loadMyAssets, loadAccountInfo]);
    };

    return Promise.all([loadFromStorage(), loadFonts, loadTasitSDK]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

App.propTypes = {
  skipLoadingScreen: PropTypes.bool,
};
