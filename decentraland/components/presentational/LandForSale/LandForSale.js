import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import Estate from "@presentational/Estate";
import Parcel from "@presentational/Parcel";
import LandForSaleInfo from "@presentational/LandForSaleInfo";
import AssetTypes from "@constants/AssetTypes";

const { ESTATE, PARCEL } = AssetTypes;

export default function LandForSale({ landForSale }) {
  const { asset } = landForSale;
  const { type } = asset;

  return (
    <View style={styles.landContainer}>
      {(() => {
        switch (type) {
          case ESTATE:
            return <Estate estate={asset} />;
          case PARCEL:
            return <Parcel parcel={asset} />;
        }
      })()}
      <LandForSaleInfo landForSale={landForSale} />
    </View>
  );
}

LandForSale.propTypes = {
  landForSale: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  landContainer: {
    width: responsiveWidth(95),
  },
});
