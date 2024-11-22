import { localStorageRef, transformEnum } from "@layouts/utils/helper";
import { Preset, Primary, Surface, Theme } from "@layouts/static/enums";
import { useLayoutConfigStore } from "@layouts/stores/config";
import layoutConfig from "@layouts/static/layout.config";
// import appConfig from "~/static/app.config";

export const useLayout = () => {
  const getPresetOpt = (options) => transformEnum(Preset, options);

  const getPrimaryOpt = (options) => transformEnum(Primary, options);

  const getSurfaceOpt = (options) => transformEnum(Surface, options);

  const getThemeOpt = (options) => transformEnum(Theme, options);

  const createLayout = (appConfig) => {
    return () => {
      const configStore = useLayoutConfigStore();

      layoutConfig.app.title = appConfig.app.title ?? layoutConfig.app.title;
      layoutConfig.app.logo = appConfig.app.logo ?? layoutConfig.app.logo;
      layoutConfig.app.verticalNavBreakpoint =
        appConfig.app.verticalNavBreakpoint ??
        layoutConfig.app.verticalNavBreakpoint;
      layoutConfig.icons.chevronDown =
        appConfig.icons.chevronDown ?? layoutConfig.icons.chevronDown;
      layoutConfig.icons.chevronRight =
        appConfig.icons.chevronRight ?? layoutConfig.icons.chevronRight;
      layoutConfig.icons.close =
        appConfig.icons.close ?? layoutConfig.icons.close;
      layoutConfig.icons.headingPlaceholder =
        appConfig.icons.headingPlaceholder ??
        layoutConfig.icons.headingPlaceholder;
      layoutConfig.icons.pinned =
        appConfig.icons.pinned ?? layoutConfig.icons.pinned;
      layoutConfig.icons.unpinned =
        appConfig.icons.unpinned ?? layoutConfig.icons.unpinned;

      configStore.$patch({
        appPreset: localStorageRef(
          "appPreset",
          appConfig.app.preset ?? layoutConfig
        ),
        appPrimaryColor: localStorageRef(
          "appPrimaryColor",
          appConfig.app.primaryColor ?? layoutConfig.app.primaryColor
        ),
        appSurfaceColor: localStorageRef(
          "appSurfaceColor",
          appConfig.app.surfaceColor ?? layoutConfig.app.surfaceColor
        ),
        appTheme: localStorageRef(
          "appTheme",
          appConfig.app.theme ?? layoutConfig.app.theme
        ),
        isVerticalNavUnpinned: localStorageRef(
          "isVerticalNavUnpinned",
          appConfig.verticalNav.isVerticalNavUnpinned ??
            layoutConfig.verticalNav.isVerticalNavUnpinned
        ),
      });
    };
  };

  return {
    getPresetOpt,
    getPrimaryOpt,
    getSurfaceOpt,
    getThemeOpt,
    createLayout,
  };
};
