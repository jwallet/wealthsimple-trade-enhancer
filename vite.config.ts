import { defineConfig } from 'vite'
import webExtension from "@samrum/vite-plugin-web-extension";
import react from '@vitejs/plugin-react'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    webExtension({
      manifest: {
        name: pkg.title,
        description: pkg.description,
        author: pkg.author,
        version: pkg.version,
        manifest_version: 2,
        background: {
          // service_worker: "src/scripts/index.ts",
          // type: "module",
          scripts: ["src/scripts/index.ts"],
          persistent: true,
        },
        content_scripts: [
          {
            matches: ["https://my.wealthsimple.com/*"],
            js: ["src/main.tsx"],
            run_at: "document_end"
          }
        ],
        icons: {
          "128": "assets/icon-128.png",
          "96": "assets/icon-96.png",
          "64": "assets/icon-64.png",
          "48": "assets/icon-48.png"
        },
        permissions:  [
          "activeTab",
          "storage",
          "https://my.wealthsimple.com/*",
          "https://trade-service.wealthsimple.com/*",
          // "https://httpstat.us/*"
        ],
        // host_permissions: [
        //   "https://my.wealthsimple.com/*",
        //   "https://trade-service.wealthsimple.com/*",
        //   "https://httpstat.us/*"
        // ],
        // options_ui: {
        //   page: "src/options/index.html",
        //   open_in_tab: true,
        //   chrome_style: true
        // },
        // content_security_policy: 'script-src \'self\' \'unsafe-eval\'; object-src \'self\'',
        // "content_security_policy": {
        //   "extension_pages": "script-src 'self' 'unsafe-eval'; object-src 'self'",
        // },
      },
    }),],
})
