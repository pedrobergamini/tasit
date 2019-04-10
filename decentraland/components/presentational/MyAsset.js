import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import LinkToBlockchain from "./LinkToBlockchain";
import Estate from "./Estate";
import Parcel from "./Parcel";
import AssetTypes from "@constants/AssetTypes";
import AssetName from "./AssetName";

const { ESTATE, PARCEL } = AssetTypes;

export default function MyAsset({ asset }) {
  const { type, actionId } = asset;

  return (
    <View style={styles.assetContainer}>
      {(() => {
        switch (type) {
          case ESTATE:
            return <Estate estate={asset} />;
          case PARCEL:
            return <Parcel parcel={asset} />;
        }
      })()}
      <View style={styles.landInfoContainer}>
        <AssetName asset={asset} />
        <LinkToBlockchain actionId={actionId} />
      </View>
    </View>
  );
}

MyAsset.propTypes = {
  asset: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  landInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  assetContainer: {
    width: responsiveWidth(95),
  },
});
