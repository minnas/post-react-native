import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const styles = StyleSheet.create({
  containerPosts: {},
  item: {
    flexDirection: "row",
    display: "flex",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemIconRight: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 2,
    borderBottomColor: "#916ec9",
    borderBottomWidth: 2,
  },
  actions: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 80,
    paddingLeft: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.FONT_COLOR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: colors.BLACK_OPACITY_2,
    borderBottomWidth: 3,
    paddingVertical: 10,
  },
  itemText: {
    maxWidth: "70%",
    fontSize: 24,
    fontWeight: "normal",
    color: "#000",
    marginHorizontal: 25,
  },
  listItemIconLeft: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputTextLarge: {
    borderColor: colors.APP_COLOR,
    borderRadius: 5,
    borderWidth: 2,
    padding: 5,
    width: "80%",
    height: 100,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 24,
  },
  bottomShadowLine: {
    borderBottomColor: colors.LIGHT_VIOLET_6,
    borderBottomWidth: 1,
    shadowColor: colors.LIGHT_VIOLET,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 2,
  },
});
export const slider = StyleSheet.create({
  thumb: {
    borderRadius: 15,
    borderWidth: 5,
    height: 52,
    width: 20,
    shadowColor: colors.APP_COLOR,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 2,
  },
  track: {
    backgroundColor: colors.APP_COLOR,
    borderRadius: 5,
    height: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    paddingVertical: 25,
    paddingHorizontal: 5,
    minHeight: 100,
    ...styles.bottomShadowLine,
  },
  minField: { fontSize: 24, textAlign: "left" },
  maxField: { fontSize: 24, textAlign: "right" },
});
