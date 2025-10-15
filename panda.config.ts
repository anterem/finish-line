import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  jsxFramework: "react",
  theme: {
    extend: {
      tokens: {
        fonts: {
          transitional: {
            value:
              "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif;",
          },
        },
        sizes: {
          editor: { value: "60ch" },
          editorMax: { value: "80ch" },
        },
      },
    },
  },
  globalCss: {
    body: {
      fontFamily: "transitional",
    },
  },
  outdir: "styled-system",
});
