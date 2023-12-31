import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { theme } from "@/theme";
import createEmotionCache from "@/createEmotionCache";
import { Navbar } from "@/components/layout/main";
import { AuthGuard } from "@/guards";
import "@fontsource/red-hat-display/300.css";
import "@fontsource/red-hat-display/400.css";
import "@fontsource/red-hat-display/500.css";
import "@fontsource/red-hat-display/600.css";
import "@fontsource/red-hat-display/700.css";
import "@fontsource/red-hat-display/800.css";
import "@fontsource/red-hat-display/900.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// @ts-ignore
export default function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
  } = props as AppProps;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Home</title>
        <meta name="description" content="This is a p." />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <AuthGuard router={router}>
            <Navbar />
            <Component {...pageProps} />
          </AuthGuard>
        </ThemeProvider>
      </SessionProvider>
    </CacheProvider>
  );
}
