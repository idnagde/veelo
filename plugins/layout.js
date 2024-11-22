import { useLayout } from "@layouts";
import appConfig from "~/static/app.config";

export default defineNuxtPlugin((nuxtApp) => {
  const layout = useLayout();

  nuxtApp.vueApp.use(layout.createLayout(appConfig));
});
