import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { SkipNavLink } from 'nextra-theme-docs';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <SkipNavLink styled />
          <Main />
          <NextScript />
          <SpeedInsights />
          <Analytics />
        </body>
      </Html>
    )
  }
}

export default MyDocument
