import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  faStar,
  faCircleInfo,
  faPlus,
  faMinus,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigate } from "react-router-native";
import Button from "../tools/Button";
import { ButtonOptions, ButtonType } from "../tools/settings";

export type Props = {
  name: string;
  defaultStarLevel?: number;
};

const Profi: React.FC<Props> = ({ name, defaultStarLevel = 0 }) => {
  const [starLevel, setStarLevel] = React.useState(defaultStarLevel);
  const navigate = useNavigate();
  const btnOptions = {
    color: "#000",
    noBorder: true,
  } as ButtonOptions;

  const onIncrement = () => setStarLevel(starLevel + 1);
  const onDecrement = () => setStarLevel(starLevel > 0 ? starLevel - 1 : 0);

  return (
    <View style={styles.container}>
      <Text style={styles.hello}>
        Hello {name} {starLevel}
      </Text>
      <View style={styles.row}>
        {[...Array(starLevel + 1).keys()].map((index: number) => (
          <FontAwesomeIcon icon={faStar} key={index} size={24} />
        ))}
      </View>
      <View style={styles.btnRow}>
        <Button
          title="Decrease"
          onPress={onDecrement}
          icon={faMinus}
          type={ButtonType.ICON_ONLY}
        />
        <Button
          title="More Stars"
          onPress={onIncrement}
          icon={faPlus}
          type={ButtonType.ICON_ONLY}
        />
      </View>
      <View style={styles.btnRow}>
        <Button
          onPress={() => {
            navigate("/about");
          }}
          icon={faCircleInfo}
          type={ButtonType.ICON_ONLY}
          options={btnOptions}
        />
        <Button
          onPress={() => {
            navigate("/posts");
          }}
          icon={faLayerGroup}
          type={ButtonType.ICON_ONLY}
          options={btnOptions}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    rowGap: 12,
  },
  hello: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  },
  row: {
    flexDirection: "row",
    display: "flex",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  btnRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 25,
    paddingHorizontal: 55,
  },
});

export default Profi;
