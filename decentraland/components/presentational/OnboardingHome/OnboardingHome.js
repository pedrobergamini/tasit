import React from "react";
import { Image, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { responsiveHeight } from "react-native-responsive-dimensions";
import Button from "@shared-presentational/Button";
import Colors from "@shared-constants/Colors";
import LargeText from "@presentational/LargeText";
import TinyLink from "@presentational/TinyLink";

export default function OnboardingHome(props) {
  const privacyPolicyText = `Tasit privacy policy`;
  const privacyPolicyUrl = `https://privacy.tasit.io/`;

  return (
    <View style={styles.container}>
      <Image source={require("@images/icon.png")} />
      <LargeText>{`Let's get you set up with a secure way to store this land!`}</LargeText>
      <View style={styles.buttonView}>
        <Button title="Get started" onPress={props.onPress} />
      </View>
      <View style={styles.privacyPolicyView}>
        <TinyLink url={privacyPolicyUrl} text={privacyPolicyText} />
      </View>
    </View>
  );
}

OnboardingHome.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
  container: {
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
  privacyPolicyView: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: responsiveHeight(5),
  },
});
