import { green, gold, red } from "@ant-design/colors";

const primaryColor = "#5acba1";
const linkColor = primaryColor;
const successColor = green[5];
const warningColor = gold[5];
const errorColor = red[5];

const antdTheme = {
  "@primary-color": primaryColor,
  "@link-color": linkColor,
  "@success-color": successColor,
  "@warning-color": warningColor,
  "@error-color": errorColor,
};

const customTheme = {
  ...antdTheme,
  // Add your custom theme variables here
};

export default customTheme;
