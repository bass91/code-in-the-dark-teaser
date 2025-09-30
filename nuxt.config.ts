// https://nuxt.com/docs/api/configuration/nuxt-config

import postcssJitProps from "postcss-jit-props";
import openProps from "open-props";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      "postcss-jit-props": postcssJitProps(openProps),
    },
  },

  modules: ["@vueuse/nuxt"],
});