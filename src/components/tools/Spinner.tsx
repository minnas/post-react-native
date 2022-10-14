import { ActivityIndicator } from "react-native";
import { colors } from "@Styles/colors";

const Spinner = () => {
  return <ActivityIndicator size="large" color={colors.APP_COLOR} />;
};

export default Spinner;
