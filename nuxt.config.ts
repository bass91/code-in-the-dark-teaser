// https://nuxt.com/docs/api/configuration/nuxt-config

import postcssJitProps from "postcss-jit-props";
import openProps from "open-props";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "What Glows Yet Hides in Plain Sight?",
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      ],
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
        },
        {
          name: "description",
          content:
            "No map. No labels. Only hush and glow. Find the circle that isn't a moon; press it, and the dark will speak.",
        },
        // Open Graph
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "What Glows Yet Hides in Plain Sight?",
        },
        {
          property: "og:description",
          content:
            "No map. No labels. Only hush and glow. Find the circle that isn't a moon; press it, and the dark will speak.",
        },
        { property: "og:image", content: "/og.png" },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:width", content: "1536" },
        { property: "og:image:height", content: "1024" },
        {
          property: "og:image:alt",
          content: "Neon riddle: What glows yet hides in plain sight?",
        },
        // Twitter Cards
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:title",
          content: "What Glows Yet Hides in Plain Sight?",
        },
        {
          name: "twitter:description",
          content:
            "No map. No labels. Only hush and glow. Find the circle that isn't a moon; press it, and the dark will speak.",
        },
        { name: "twitter:image", content: "/og.png" },
        {
          name: "twitter:image:alt",
          content: "Neon riddle: What glows yet hides in plain sight?",
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
