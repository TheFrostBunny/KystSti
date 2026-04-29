// pwa.config.ts
import type { VitePWAOptions } from "vite-plugin-pwa";

const pwaConfig: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  manifest: {
    name: "KystSti",
    short_name: "KystSti",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f6f2",
    theme_color: "#457b66",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "192x192",
        type: "image/ico"
      },
      {
        src: "/favicon.ico",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest,mp3}", "assets/**"],
    navigateFallback: "/index.html",
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.mode === 'navigate',
        handler: 'NetworkFirst',
        options: {
          cacheName: 'pages',
          expiration: { maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 },
        },
      },
      {
        urlPattern: /.*\.(?:js|css|png|jpg|jpeg|svg|gif|webp|ico|mp3)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'assets',
          expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 },
        },
      },
    ],
  },
};

export default pwaConfig;
