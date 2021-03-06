import React, { useState, useEffect } from "react";

import { Text } from "react-native";

// interface EthereumUpgradeSecurityProps {}

import CenteredAlert from "../../presentational/CenteredAlert";

// TODO: Decide whether to use redux rather than useState here, and also
// whether either way it's the job of the screen that contains this component

const EthereumUpgradeSecurity: React.FunctionComponent<{}> = () => {
  const [isDeployed, setIsDeployed] = useState(null);

  useEffect(() => {
    function handleDeploymentComplete() {
      setIsDeployed(true);
    }

    // TODO: Hit the API to deploy a new contract

    handleDeploymentComplete();

    return function cleanup() {
      // TODO: Cancel any unwanted remnants of having already made this request
    };
  });

  if (isDeployed === null) {
    return <CenteredAlert text="Loading..." />;
  }
  return isDeployed ? (
    <CenteredAlert text="Deployed" />
  ) : (
    <CenteredAlert text="Not yet deployed" />
  );
};

export default EthereumUpgradeSecurity;
