import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const pages = process.env.GITHUB_PAGES === '1';

export default defineConfig({
  base: pages ? '/adplan-superagent/' : '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'AdPlan Superagent',
        short_name: 'AdPlan',
        description: 'Plan ads. Rank the cheapest workflow. Do not spend until Confirm.',
        theme_color: '#0c0b10',
        background_color: '#0c0b10',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: pages ? '/adplan-superagent/' : '/',
        scope: pages ? '/adplan-superagent/' : '/',
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' },
        ],
      },
    }),
  ],
  server: { port: 5174, host: true },
});
