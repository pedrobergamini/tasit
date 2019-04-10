import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "native-base";
import {
  showError,
  openURL,
  buildBlockchainUrlFromActionId,
  getNetworkName,
} from "@helpers";

const supportedNetworks = ["ropsten"];

const _openLinkOf = async actionId => {
  const url = await buildBlockchainUrlFromActionId(actionId);
  try {
    await openURL(url);
  } catch (err) {
    showError(`Unable to open action link`);
  }
};

export default function LinkToBlockchain({ actionId }) {
  // Note: Use 'ropsten' network for tests on development env
  const networkName = getNetworkName();
  const isNetworkSupported = supportedNetworks.includes(networkName);

  if (!isNetworkSupported || !actionId) return null;

  const openLink = () => _openLinkOf(actionId);
  return (
    <Button transparent onPress={openLink}>
      <Icon name="eye" />
    </Button>
  );
}

LinkToBlockchain.propTypes = {
  actionId: PropTypes.string,
};
