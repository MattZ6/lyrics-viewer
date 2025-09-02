import type { NextConfig } from "next";

import { version } from "./package.json";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_NAME: "Lyrics Viewer",
    NEXT_PUBLIC_VERSION: `v${version}`,
  },
};

export default nextConfig;
