import React from "react";

import { StyleSheet, Alert, TouchableOpacity } from "react-native";
import { Icon } from "native-base";
import {
  showError,
  openURL,
  buildBlockchainUrlFromActionId,
  getNetworkName,
} from "../../../helpers";
import Colors from "../../../constants/Colors";

const _openLinkOf = async (actionId): void => {
  const url = buildBlockchainUrlFromActionId(actionId);
  try {
    await openURL(url);
  } catch (err) {
    showError(`Unable to open action link`);
  }
};

const _openLinkInfo = (): void => {
  const title = "";
  const message = `Shows the action details on the real chains.`;
  const buttons = [{ text: "Okay" }];
  Alert.alert(title, message, buttons);
};

const _onPress = (actionId): void => {
  const supportedNetworks = ["ropsten"];
  const networkName = getNetworkName();
  const isNetworkSupported = supportedNetworks.includes(networkName);

  if (isNetworkSupported) _openLinkOf(actionId);
  else _openLinkInfo();
};

const styles = StyleSheet.create({
  icon: {
    color: Colors.linkColor,
  },
  touchable: {
    flexDirection: "column",
    justifyContent: "center",
  },
});

interface LinkToBlockchainProps {
  actionId: string;
}

const LinkToBlockchain: React.FunctionComponent<LinkToBlockchainProps> = React.memo(
  ({ actionId }) => {
    if (!actionId) return null;

    const onPress = (): void => {
      _onPress(actionId);
    };

    return (
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <Icon name="eye" style={styles.icon} />
      </TouchableOpacity>
    );
  }
);

export default LinkToBlockchain;
