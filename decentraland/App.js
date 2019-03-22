import React from "react";
import { YellowBox } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import PropTypes from "prop-types";
import AppNavigator from "./AppNavigator";
import { Provider } from "react-redux";
import { createStore } from "redux";
import decentralandApp from "./redux/reducers";
import { Action } from "tasit-sdk";
const { ConfigLoader } = Action;
import tasitSdkConfig from "./config/default";
import {
  checkBlockchain,
  showFatalError,
  showError,
  showWarn,
} from "./helpers";
import { Root } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const store = createStore(decentralandApp);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  async componentDidMount() {
    await this._setupTasitSDK();
    await this._setupFonts();
    try {
      // Ignoring setting timer warnings on the app UI
      YellowBox.ignoreWarnings(["Setting a timer"]);
    } catch (error) {
      showWarn(`Error on YellowBox setup`);
    }
  }

  // Refs: https://docs.nativebase.io/docs/GetStarted.html
  async _setupFonts() {
    try {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });
    } catch (error) {
      showError(`Error on fonts setup.`);
    }
  }

  async _setupTasitSDK() {
    try {
      ConfigLoader.setConfig(tasitSdkConfig);
    } catch (error) {
      showError(`Error on reading config file. Using the default config.`);
      ConfigLoader.setConfig({
        provider: {
          network: "ropsten",
          provider: "fallback",
          pollingInterval: 4000,
        },
        events: {
          timeout: 10000,
        },
      });
    }

    try {
      const connectionOK = await checkBlockchain();
      if (!connectionOK) {
        const errorMessage = `Failed to establish the connection to the blockchain.
  Is the 'config/default.js' file correct?`;
        showFatalError(errorMessage);
      }
    } catch (error) {
      showFatalError(`Failed to establish the connection to the blockchain.`);
    }
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

  _loadResourcesAsync = async () => {
    return Promise.all([Asset.loadAsync([]), Font.loadAsync({})]);
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
