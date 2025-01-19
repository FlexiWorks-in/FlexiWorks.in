import type {} from "@mui/material/themeCssVarsAugmentation";
import { ThemeOptions, PaletteMode } from "@mui/material/styles";
import { getDesignTokens } from "./themePrimitives";
import {
  inputsCustomizations,
  navigationCustomizations,
  surfacesCustomizations,
} from "./custom";

export default function getAppTheme(mode: PaletteMode): ThemeOptions {
  return {
    ...getDesignTokens(mode),
    components: {
      ...inputsCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
    },
  };
}
