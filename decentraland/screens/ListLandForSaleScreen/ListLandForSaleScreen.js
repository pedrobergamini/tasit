import React from "react";
import { connect } from "react-redux";
import {
  appendLandForSaleToList,
  selectLandToBuy,
  setLoadingAssetsForSaleInProgress,
} from "@redux/actions";
import PropTypes from "prop-types";
import LandForSaleList from "@presentational/LandForSaleList";
import LandForSaleListItem from "@presentational/LandForSaleListItem";
import { showError, showInfo, getContracts, addressesAreEqual } from "@helpers";
import { generateAssetFromId } from "@helpers/decentraland";
import { Root } from "native-base";
import DecentralandUtils from "tasit-sdk/dist/helpers/DecentralandUtils";

export class ListLandForSaleScreen extends React.Component {
  componentDidMount = async () => {
    const {
      appendLandForSaleToList,
      setLoadingAssetsForSaleInProgress,
    } = this.props;
    try {
      showInfo("Loading land for sale...");
      const assetsForSale = await this._getAllAssetsForSale();

      const loadingAssetsOnScreen = assetsForSale.map(promise => {
        let loadAssetOnScreen = async () => {
          const assetForSale = await promise;
          appendLandForSaleToList(assetForSale);
        };
        return loadAssetOnScreen();
      });

      await Promise.all([...loadingAssetsOnScreen]);
      setLoadingAssetsForSaleInProgress(false);
    } catch (err) {
      showError(err);
    }
  };

  // Note: Returns a list of Promises
  _getAllAssetsForSale = async () => {
    const decentralandUtils = new DecentralandUtils();
    const { getAllAssetsForSale: getAllOpenSellOrders } = decentralandUtils;

    const openSellOrders = await getAllOpenSellOrders();

    const contracts = getContracts();
    const { landContract } = contracts;

    // Showing only parcels for now because of all estates are with blank images
    const parcelsForSale = [];
    for (let order of openSellOrders) {
      const { nftAddress } = order;
      const isParcel = addressesAreEqual(nftAddress, landContract.getAddress());
      if (isParcel) parcelsForSale.push(order);
    }

    const assetsForSale = [];
    // Note: Getting only the first 10 assets for now
    // See more: https://github.com/tasitlabs/tasit/issues/155
    const listSize = 10;
    for (let order of parcelsForSale.slice(0, listSize)) {
      let assetForSalePromise = this._toAssetForSale(order);
      assetsForSale.push(assetForSalePromise);
    }

    return assetsForSale;
  };

  _toAssetForSale = async sellOrder => {
    const contracts = getContracts();
    const { estateContract, landContract } = contracts;
    const {
      id,
      nftAddress,
      assetId,
      seller,
      priceInWei,
      expiresAt,
    } = sellOrder;

    // Note: Conversion to USD will be implemented on v0.2.0
    const manaPerUsd = 30;
    // Get mana price using string to avoid imprecise rounding (i.e.: 57999.99999999999)
    // TODO: Use TasitSDK Utils to dealing with BigNumbers (will be implemented on v0.2.0)
    const priceManaInWei = `${priceInWei}`;
    const strPriceManaLength = priceManaInWei.length - 18;
    const strRoundedPriceMana = priceManaInWei.substring(0, strPriceManaLength);
    const priceMana = strRoundedPriceMana;
    const priceUSD = Number(priceMana / manaPerUsd).toFixed(2);

    const asset = await generateAssetFromId(
      estateContract,
      landContract,
      assetId,
      nftAddress
    );

    const assetForSale = {
      id,
      priceManaInWei,
      priceMana,
      priceUSD,
      seller,
      expiresAt,
      asset,
    };

    return assetForSale;
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
    const { assetsForSale } = this.props;
    const { list, loadingInProgress } = assetsForSale;

    // Note: The initial route component from react-navigation
    // Should add the NativaBase `Root` component.
    // See more: https://github.com/tasitlabs/tasit/pull/237#issuecomment-479124236
    // Tech debt: Move from here to the App.js component.
    return (
      <Root>
        <LandForSaleList
          landForSaleList={list}
          renderItem={this._renderItem}
          loadingInProgress={loadingInProgress}
        />
      </Root>
    );
  }
}

ListLandForSaleScreen.propTypes = {
  assetsForSale: PropTypes.object.isRequired,
  appendLandForSaleToList: PropTypes.func.isRequired,
  selectLandToBuy: PropTypes.func.isRequired,
  setLoadingAssetsForSaleInProgress: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  const { assetsForSale } = state;
  return { assetsForSale };
};

const mapDispatchToProps = {
  appendLandForSaleToList,
  setLoadingAssetsForSaleInProgress,
  selectLandToBuy,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListLandForSaleScreen);
