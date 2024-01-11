// props.ts

export interface Item {
  [key: string]: any;
}

export const dropdownItemsProps = {
  type: Array<Item>,
  default: [],
};

export const selectedItemsProps = {
  type: Array<Item>,
  default: [],
};

export const dropdownPositionProps = {
  validator(value: string) {
    return ["top-right", "top-left", "bottom-right"].includes(value);
  },
  default: "top-right",
};

export const labelKeyProps = {
  type: String,
  default: "name",
};

export const uniqueKeyProps = {
  type: String,
  default: "id",
};

export const showIconProps = {
  type: Boolean,
  default: false,
};

export const iconKeyProps = {
  type: String,
  default: null,
};

export const isLoadingProps = {
  type: Boolean,
  default: false,
};

export const errorInfoProps = {
  type: Object,
  default: null,
};

export const Props = {
  dropdownItems: dropdownItemsProps,
  selectedItems: selectedItemsProps,
  dropdownPosition: dropdownPositionProps,
  labelKey: labelKeyProps,
  uniqueKey: uniqueKeyProps,
  showIcon: showIconProps,
  iconKey: iconKeyProps,
  isLoading: isLoadingProps,
  errorInfo: errorInfoProps,
};
