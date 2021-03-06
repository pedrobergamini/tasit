import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { connect } from "react-redux";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: "center",
    paddingTop: 15
  }
});

interface TransactionObject {
  to: string;
  from: string;
  amount: number;
}

type TransactionScreenProps = {
  title?: string;
  transactions: TransactionObject[];
};

export class TransactionScreen extends React.Component<
  TransactionScreenProps,
  {}
> {
  render(): JSX.Element {
    const { transactions } = this.props;
    console.info("# of transactions", transactions.length);
    const latestTx = transactions[transactions.length - 1];
    console.info("latestTx", latestTx);
    // TODO: Handle the undefined latestTx case
    const { to } = latestTx;
    const { from } = latestTx;
    const { amount } = latestTx;
    return (
      <View style={styles.container}>
        {!to ? (
          <Text>{"Missing 'to' address"}</Text>
        ) : (
          <Text>{`to ${to}`}</Text>
        )}
        {!from ? (
          <Text>{"Missing 'from' address"}</Text>
        ) : (
          <Text>{`from ${from}`}</Text>
        )}
        {!amount ? (
          <Text>{"Missing 'amount'"}</Text>
        ) : (
          <Text>{`amount ${amount}`}</Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state): object => ({
  transactions: state.transactions
});

export default connect(mapStateToProps)(TransactionScreen);
