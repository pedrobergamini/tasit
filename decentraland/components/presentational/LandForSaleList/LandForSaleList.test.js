import React from "react";
import { shallow } from "enzyme";
import LandForSaleList from "@presentational/LandForSaleList";

describe("LandForSaleList", () => {
  describe("renders the component", () => {
    const landForSaleRenderer = () => {};

    it("when list is empty and the loading is in progress", async () => {
      const landForSaleList = [];
      const loadingInProgress = true;
      expect(
        shallow(
          <LandForSaleList
            landForSaleList={landForSaleList}
            renderItem={landForSaleRenderer}
            loadingInProgress={loadingInProgress}
          />
        )
      ).toMatchSnapshot();
    });

    it("after having loaded an empty list", async () => {
      const landForSaleList = [];
      const loadingInProgress = false;
      expect(
        shallow(
          <LandForSaleList
            landForSaleList={landForSaleList}
            renderItem={landForSaleRenderer}
            loadingInProgress={loadingInProgress}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
