// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",

  ssr: false,

  alias: {
    "@layouts": "~/@layouts",
  },

  debug: process.env.NODE_ENV !== "production",

  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "vue3-perfect-scrollbar/nuxt",
  ],

  css: ["~/@layouts/styles/index.css", "~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          prefix: "p",
          darkModeSelector: ".mode-dark",
          cssLayer: false,
        },
      },
    },
  },

  app: {
    head: {
      title: "Veelo - Dashboard Starter",
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || "http://localhost:3000",
    },
  },
});
