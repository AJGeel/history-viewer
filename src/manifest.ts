/* eslint-disable camelcase */
import type { Manifest } from "webextension-polyfill";

import { buildTargets } from "../buildTarget";
import pkg from "../package.json";

const manifest: Manifest.WebExtensionManifest = {
  description: "History Viewer",
  icons: {
    "128": "icon-128.png",
  },
  manifest_version: 3,
  name: "UpTab",
  permissions: ["storage", "history"],
  version: pkg.version,
  web_accessible_resources: [
    {
      matches: [],
      resources: ["icon-128.png", "icon-34.png"],
    },
  ],
  ...(process.env.BUILD_TARGET === buildTargets.firefox
    ? {
        browser_specific_settings: {
          gecko: {
            id: "geelaj01@gmail.com",
            strict_min_version: "109.0",
          },
        },
      }
    : {}),
};

export default manifest;
