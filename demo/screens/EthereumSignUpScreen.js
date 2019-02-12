import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setAccount } from "../actions";
import EthereumSignUp from "@presentational/EthereumSignUp";

export class EthereumSignUpScreen extends React.Component {
  // Note: As same as Account.create(), this functions isn't running as async.
  // Timeout Between button click and screen change (afterSignUp()) is abount 5 secs.
  // See more: https://github.com/tasitlabs/tasit/issues/42
  _createAccount = async () => {
    const { setAccount } = this.props;
    const account = {};
    setAccount(account);
  };

  _onSignUp = () => {
    // Should run async but isn't when calling Account.create() or createFromPrivateKey()
    this._createAccount();

    this.props.navigation.navigate("BuyLandScreen");
  };

  render() {
    return <EthereumSignUp onSignUp={this._onSignUp} />;
  }
}

EthereumSignUpScreen.propTypes = {
  setAccount: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  setAccount,
};

export default connect(
  null,
  mapDispatchToProps
)(EthereumSignUpScreen);
