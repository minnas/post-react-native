import React, { useImperativeHandle, forwardRef, useRef } from "react";
import { TextInput } from "react-native";
import { styles } from "@Styles/views";

interface Props {
  value?: string;
  placeholder?: string;
  multiline?: boolean;
  onChangeValue?: Function;
}

const TextField = forwardRef((props: Props, ref) => {
  const inputRef = useRef<TextInput | null>(null);
  const placeholder = props.placeholder || "";
  const value = props.value || "";
  const multiline = props.multiline || false;

  useImperativeHandle(ref, () => ({
    blur: () => {
      inputRef?.current?.blur();
    },
  }));

  const onChange = (text: string) => {
    if (props.onChangeValue) {
      props.onChangeValue(text);
    }
  };

  return (
    <TextInput
      multiline={multiline}
      ref={inputRef}
      value={value}
      placeholder={placeholder}
      style={styles.inputTextLarge}
      onChangeText={(text) => onChange(text)}
    />
  );
});

export default TextField;
