import "tailwindcss/tailwind.css";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="A smart table to help you filter and find games that score high on metacritic."
        />
        <meta name="keywords" content="metacritic, video game, review, game" />
        <meta name="theme-color" content="#317EFB" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        <title>Best Metacritic Games</title>

        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/icons/android-chrome-512x512.png"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="500x500"
          href="/icons/apple-touch-icon.png"
        />

        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
