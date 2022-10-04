export enum ButtonType {
  ICON_ONLY,
  DEFAULT,
}

export enum ToastType {
  SUCCESS,
  ERROR,
}
export type ButtonOptions = {
  noBorder?: boolean;
  color?: string;
  iconSize?: number;
};
export type ToastOptions = {
  left?: number;
  top?: number;
};
