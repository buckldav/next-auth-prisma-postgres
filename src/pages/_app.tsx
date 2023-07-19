import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { theme } from "@/theme";
import createEmotionCache from "@/createEmotionCache";
import { Navbar } from "@/layout";
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

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Employee information and documentation for SpringMicroHost."
        />
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
