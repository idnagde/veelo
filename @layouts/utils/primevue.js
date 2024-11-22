import { Preset, Theme } from "@layouts/static/enums";
import {
  palette,
  updatePrimaryPalette,
  updateSurfacePalette,
} from "@primevue/themes";

export const updatePrimaryColor = (primary) => {
  const primaryPalette = palette(`{${primary}}`);
  updatePrimaryPalette(primaryPalette);
};

export const updateSurfaceColor = (surface) => {
  const surfacePalette = palette(`{${surface}}`);
  updateSurfacePalette(surfacePalette);
};

export const getPreferredTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const updateTheme = ([preset, theme]) => {
  // Lyra always use mixed-theme
  const themeLocal =
    preset === Preset.Lyra
      ? Theme.Light
      : theme === Theme.System
      ? getPreferredTheme()
      : theme;

  const html = document.querySelector("html");

  if (themeLocal === Theme.Dark) {
    html.classList.add("mode-dark");
  } else {
    html.classList.remove("mode-dark");
  }
};
