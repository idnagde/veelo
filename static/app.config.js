import { breakpointsTailwind } from "@vueuse/core";
import { Preset, Theme, Primary, Surface } from "~/@layouts/static/enums";
import veeloLogo from "~/assets/logo/veelo-logo.svg?raw";

const resizeLogo = (logo) => {
  return logo.replace(/<svg/, '<svg width="26px" height="26px"');
};

export default {
  app: {
    title: "Veelo",
    logo: h("div", {
      innerHTML: resizeLogo(veeloLogo),
      class: "text-primary-500 dark:text-primary-400",
      style: "line-height:0;",
    }),
    verticalNavBreakpoint: breakpointsTailwind.xl,
    primaryColor: Primary.Emerald,
    surfaceColor: Surface.Gray,
    theme: Theme.System,
    preset: Preset.Classic,
  },
  verticalNav: {
    isVerticalNavUnpinned: false,
    defaultNavItemIconProps: { icon: "pi pi-circle", size: 0.7 },
  },
  icons: {
    chevronDown: { icon: "pi pi-chevron-down" },
    chevronRight: { icon: "pi pi-chevron-right" },
    close: { icon: "pi pi-times" },
    pinned: { icon: "pi pi-th-large" },
    unpinned: { icon: "pi pi-th-large" },
    headingPlaceholder: { icon: "pi pi-minus" },
  },
};
