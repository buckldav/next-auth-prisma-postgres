import React from "react";
import type { Preview } from "@storybook/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../src/theme";
// import { RouterContext } from "next/dist/shared/lib/router-context" // next 12
import "@fontsource/red-hat-display/300.css";
import "@fontsource/red-hat-display/400.css";
import "@fontsource/red-hat-display/500.css";
import "@fontsource/red-hat-display/600.css";
import "@fontsource/red-hat-display/700.css";
import "@fontsource/red-hat-display/800.css";
import "@fontsource/red-hat-display/900.css";
import { SessionProvider } from "next-auth/react";
import { session } from "./data";

export const withProviders = (Story) => (
  <SessionProvider
    session={session}
    refetchInterval={0}
    refetchOnWindowFocus={false}
  >
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  </SessionProvider>
);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [withProviders],
};

export default preview;
