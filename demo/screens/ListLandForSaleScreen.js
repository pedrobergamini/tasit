import React from "react";
import { connect } from "react-redux";
import { setLandForSaleList, selectLandToBuy } from "../actions";
import PropTypes from "prop-types";
import LandForSaleList from "@presentational/LandForSaleList";
import LandForSaleListItem from "@presentational/LandForSaleListItem";

export class ListLandForSaleScreen extends React.Component {
  componentDidMount = async () => {
    const { setLandForSaleList } = this.props;
    const landForSaleList = await this._getLandForSaleList();
    setLandForSaleList(landForSaleList);
  };

  // Note: This function is assuming that:
  // - All estates have a sell order
  // - The total supply of estates is small
  // TODO: Rewrite this function when we move to testnet
  _getLandForSaleList = async () => {
    const orders = [];
    const totalSupply = 5;

    for (let estateId = 1; estateId <= Number(totalSupply); estateId++) {
      const order = this._getLandForSale(estateId);
      orders.push(order);
    }

    return await Promise.all(orders);
  };

  _getLandForSale = async estateId => {
    const estateName = `cool estate 0x${estateId}`;
    const price = 1e18;
    const manaPerUsd = 30;
    const priceMana = Number(price.toString()) / 1e18;
    const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);
    const imgUrl = `https://api.decentraland.org/v1/estates/${estateId}/map.png`;

    return {
      id: estateId.toString(),
      priceMana,
      priceUSD,
      // TODO: Create an enum type for identify asset
      asset: {
        id: estateId,
        name: estateName,
        img: imgUrl,
      },
    };
  };

  _renderItem = ({ item: landForSale }) => {
    const { navigation, selectLandToBuy } = this.props;
    const handlePress = () => {
      selectLandToBuy(landForSale);
      navigation.navigate("BuyLandScreen");
    };

    return (
      <LandForSaleListItem landForSale={landForSale} onPress={handlePress} />
    );
  };

  render() {
    const { landForSaleList } = this.props;
    return (
      <LandForSaleList
        landForSaleList={landForSaleList}
        renderItem={this._renderItem}
      />
    );
  }
}

ListLandForSaleScreen.propTypes = {
  landForSaleList: PropTypes.array.isRequired,
  setLandForSaleList: PropTypes.func.isRequired,
  selectLandToBuy: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { landForSaleList } = state;
  return { landForSaleList };
};

const mapDispatchToProps = {
  setLandForSaleList,
  selectLandToBuy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListLandForSaleScreen);
