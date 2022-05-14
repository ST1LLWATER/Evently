/* eslint-disable @next/next/no-page-custom-font */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Franklin&family=Poppins:wght@400;600;700&family=Roboto:wght@300;400;600;700&family=Rubik:wght@300;400;500;600;700&family=Noto+Serif+Display:wght@600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
