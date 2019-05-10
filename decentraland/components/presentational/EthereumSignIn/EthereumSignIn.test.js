import React from "react";
import { shallow } from "enzyme";
import EthereumSignIn from "@presentational/EthereumSignIn";

describe("EthereumSignIn", () => {
  it("renders the component", async () => {
    const onConnect = () => {};
    expect(shallow(<EthereumSignIn onConnect={onConnect} />)).toMatchSnapshot();
  });
});
