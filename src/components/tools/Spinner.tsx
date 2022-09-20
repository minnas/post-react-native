import { ActivityIndicator } from "react-native";
import { colors } from "../../styles/colors";

const Spinner = () => {
  return <ActivityIndicator size="large" color={colors.APP_COLOR} />;
};

export default Spinner;
