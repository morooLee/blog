import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import DarkModeProvider from '../lib/DarkModeContext';
import { MediaContextProvider } from '../components/Media';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';

const DEFAULT_SEO = {
  title: 'Moroo Blog',
  description: 'Software QA 및 테스트 자동화에 대한 이야기',
  twitter: {
    handle: '@lee_moroo',
    site: '@lee_moroo',
    cardType: 'summary_large_image',
  },
  openGraph: {
    type: 'website',
    title: 'Moroo Blog',
    defaultTitle: 'Moroo Blog',
    description: 'Software QA 및 테스트 자동화에 대한 이야기',
    locale: 'ko_KR',
    site_name: 'Moroo Blog',
    profile: {
      firstName: 'Soon Han',
      lastName: 'Lee',
      username: 'moroo',
      gender: 'male',
    },
    images: [
      {
        url: 'https://blog.moroo.dev/assets/blog-cover-image.jpeg',
        alt: 'Cover Image',
        type: 'image/jpg',
        width: 1200,
        height: 1200,
      },
    ],
  },
  additionalMetaTags: [
    {
      property: 'NaverBot',
      content: 'All',
    },
    {
      name: 'NaverBot',
      content: 'index,follow',
    },
    {
      property: 'Yeti',
      content: 'All',
    },
    {
      name: 'Yeti',
      content: 'index,follow',
    },
    // {
    //   name: 'facebook-domain-verification',
    //   content: '9wvjinz2dotboiz2f3m2sdgqish34f',
    // },
    {
      property: 'fb:app_id',
      content: '736749940650920',
    },
  ],
};
function MyApp({ Component, pageProps }: any) {
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
