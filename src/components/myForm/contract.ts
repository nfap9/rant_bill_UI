export enum FormItemType {
  input = "input",
  select = "select",
  radioGroup = "radioGroup",
  custom = "custom", // 自定义
  checkbox = "checkbox",
  datePicker = "datePicker",
  roomSelect = "roomSelect",
}
export type buttonOption = {
  label: string;
  callback?: Function;
  type?: string;
};
export type selectOption = {
  label: string;
  value: string;
};
export type formItem = {
  type: FormItemType;
  label?: string;
  prop?: string;
  inputType?: string;
  selectObj?: boolean;
  multiple?: boolean;
  options?: selectOption[];
  placeholder?: string;
  buttons?: buttonOption[];
};
