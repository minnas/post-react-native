import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

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
});
