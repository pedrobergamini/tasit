import React from "react";
import { shallow } from "enzyme";
import { BuyLandScreen } from "./BuyLandScreen";
import { estateForSale } from "@helpers/testHelpers";
import AccountCreationStatus from "@constants/AccountCreationStatus";
const { READY_TO_USE } = AccountCreationStatus;

describe("BuyLandScreen", () => {
  describe("renders the component", () => {
    it("", async () => {
      const accountInfo = {
        creationStatus: READY_TO_USE,
        creationActions: {},
      };
      const navigation = () => {};
      const removeLandForSale = () => {};
      const prependToMyAssetsList = () => {};
      const removeFromMyAssetsList = () => {};
      const prependLandForSaleToList = () => {};
      const addUserAction = () => {};
      const updateUserActionStatus = () => {};
      const myAssets = [];

      expect(
        shallow(
          <BuyLandScreen
            navigation={navigation}
            accountInfo={accountInfo}
            myAssets={myAssets}
            landToBuy={estateForSale}
            removeLandForSale={removeLandForSale}
            prependToMyAssetsList={prependToMyAssetsList}
            removeFromMyAssetsList={removeFromMyAssetsList}
            prependLandForSaleToList={prependLandForSaleToList}
            addUserAction={addUserAction}
            updateUserActionStatus={updateUserActionStatus}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
