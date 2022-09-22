import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
import { colors } from "../../styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { less, more, RootState } from "../../store/store";

export type Props = {
  name: string;
  defaultStarLevel?: number;
};

const Profi: React.FC<Props> = ({ name, defaultStarLevel = 0 }) => {
  const stars = useSelector((state: RootState) => state.stars);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const btnOptions = {
    color: colors.FONT_COLOR,
    noBorder: true,
  } as ButtonOptions;

  const onIncrement = () => dispatch(more());
  const onDecrement = () => dispatch(less());

  const renderStar = ({ item }: any) => {
    return (
      <View style={{ marginHorizontal: 5 }}>
        <FontAwesomeIcon
          icon={faStar}
          key={item.index}
          color={colors.APP_COLOR}
          size={32}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.hello, flex: 1 }}>
        Hello {name} {stars}
      </Text>
      <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 15 }}>
        <View>
          <Button
            title="Decrease"
            onPress={onDecrement}
            icon={faMinus}
            type={ButtonType.ICON_ONLY}
          />
        </View>
        <FlatList
          data={[...Array(stars + 1).keys()].map((index: number) => {
            return { key: index.toString(), title: index.toString() };
          })}
          style={styles.starList}
          renderItem={renderStar}
          horizontal={true}
        />
        <View>
          <Button
            title="More Stars"
            onPress={onIncrement}
            icon={faPlus}
            type={ButtonType.ICON_ONLY}
          />
        </View>
      </View>
      <View style={{ ...styles.btnRow, flex: 1 }}>
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
    alignItems: "center",
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
  starList: {
    flex: 4,
    marginHorizontal: 5,
    maxHeight: 60,
    padding: 5,
    borderColor: colors.APP_COLOR,
    borderWidth: 1,
    borderRadius: 15,
  },
});

export default Profi;
