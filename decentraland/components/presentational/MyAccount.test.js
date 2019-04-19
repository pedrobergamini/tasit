import React from "react";
import { shallow } from "enzyme";
import MyAccount from "./MyAccount";
import { accountCreationSteps } from "@helpers/testHelpers";

describe("MyAccount", () => {
  it("renders the component", async () => {
    const progress = 0.5;
    expect(
      shallow(
        <MyAccount progress={progress} creationSteps={accountCreationSteps} />
      )
    ).toMatchSnapshot();
  });
});