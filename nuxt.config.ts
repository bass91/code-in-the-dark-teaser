// https://nuxt.com/docs/api/configuration/nuxt-config

import postcssJitProps from "postcss-jit-props";
import openProps from "open-props";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
        },
      ],
    },
  },

  postcss: {
    plugins: {
      "postcss-jit-props": postcssJitProps(openProps),
    },
  },

  modules: ["@vueuse/nuxt"],
});
