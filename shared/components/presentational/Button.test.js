import React from "react";
import { shallow } from "enzyme";
import Button from "shared/components/presentational/Button";

describe("Button", () => {
  describe("renders the component", () => {
    const onPress = () => {};

    it("default button", async () => {
      expect(
        shallow(<Button title="Enabled button" onPress={onPress} />)
      ).toMatchSnapshot();
    });

    it("disabled button", async () => {
      const disabled = true;
      expect(
        shallow(
          <Button
            title="Disabled button"
            onPress={onPress}
            disabled={disabled}
          />
        )
      ).toMatchSnapshot();
    });
  });
});
