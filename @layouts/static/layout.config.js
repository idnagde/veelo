import { breakpointsTailwind } from "@vueuse/core";
import { Preset, Theme, Primary, Surface } from "@layouts/static/enums";

export default {
  app: {
    title: "default-layout",
    logo: h("img", { src: "~/assets/logo/logo.svg" }),
    verticalNavBreakpoint: breakpointsTailwind.xl,
    primaryColor: Primary.Cyan,
    surfaceColor: Surface.Gray,
    theme: Theme.System,
    preset: Preset.Arc,
  },
  verticalNav: {
    isVerticalNavUnpinned: false,
  },
  icons: {
    chevronDown: { icon: "pi pi-chevron-down" },
    chevronRight: { icon: "pi pi-chevron-right" },
    close: { icon: "pi pi-times" },
    pinned: { icon: "pi pi-circle-fill" },
    unpinned: { icon: "pi pi-circle" },
    headingPlaceholder: { icon: "pi pi-minus" },
  },
};
