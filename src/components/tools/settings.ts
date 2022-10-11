export enum ButtonType {
  ICON_ONLY,
  DEFAULT,
  SVG,
}

export enum ToastType {
  SUCCESS,
  ERROR,
}
export type ButtonOptions = {
  noBorder?: boolean;
  color?: string;
  iconSize?: number;
  fontSize?: number;
  backgroundColor?: string;
};
export type ToastOptions = {
  left?: number;
  top?: number;
};
