import { useStorage } from "@vueuse/core";
import appConfig from "~/static/app.config";

export const transformEnum = (enumValue, options = {}) => {
  if (options.labelOnly) {
    return Object.entries(enumValue).map(([label, value]) => label);
  }
  if (options.valueOnly) {
    return Object.entries(enumValue).map(([label, value]) => value);
  }

  return Object.entries(enumValue).map(([label, value]) => ({
    label,
    value,
  }));
};

export const nameSpaceConfig = (str) => {
  return `${appConfig.app.title.replaceAll(" ", "-")}-${str}`;
};

export const cookieRef = (key, defaultValue) => {
  return useCookie(nameSpaceConfig(key), { default: () => defaultValue });
};

export const localStorageRef = (key, defaultValue) => {
  return useStorage(nameSpaceConfig(key), defaultValue);
};
