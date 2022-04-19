import DEFAULT_SEO from '../../next-seo.config.json';
import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import DarkModeProvider from '../lib/DarkModeContext';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import TagManager from 'react-gtm-module';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-PJDMBXV' });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...DEFAULT_SEO} />
      <DarkModeProvider>
        <Component {...pageProps} />
        <ToastContainer newestOnTop />
      </DarkModeProvider>
    </>
  );
}

export default MyApp;
