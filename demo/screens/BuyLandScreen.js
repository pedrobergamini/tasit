import React from "react";
import { connect } from "react-redux";
import { removeLandForSale } from "../actions";
import BuyLand from "@presentational/BuyLand";
import PropTypes from "prop-types";

export class BuyLandScreen extends React.Component {
  _onBuy = landForSale => {
    const { account } = this.props;
    if (!account) this._setupAccount();
    else this._buy(landForSale);
  };

  _setupAccount = () => {
    const { navigation } = this.props;
    navigation.navigate("OnboardingHomeScreen");
  };

  _buy = landForSale => {
    const { navigation, account, removeLandForSale } = this.props;
    const onSuccess = () => {
      removeLandForSale(landForSale);
    };
    this._executeOrder(landForSale, account, onSuccess);
    navigation.navigate("ListLandForSaleScreen");
  };

  _executeOrder = async (sellOrder, account, afterSuccessfulExecution) => {
    // TODO: This function should be called inside of the eventListener
    // that catches the safeExecuteOrder successful event.
    afterSuccessfulExecution();
  };

  render() {
    const { selectedLandToBuy: landForSale } = this.props;

    return (
      <BuyLand
        landForSale={landForSale}
        onBuy={() => this._onBuy(landForSale)}
      />
    );
  }
}

BuyLandScreen.propTypes = {
  account: PropTypes.object,
  selectedLandToBuy: PropTypes.object.isRequired,
  removeLandForSale: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { account, selectedLandToBuy } = state;
  return { account, selectedLandToBuy };
};

const mapDispatchToProps = {
  removeLandForSale,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuyLandScreen);
