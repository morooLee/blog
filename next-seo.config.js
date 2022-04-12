/* eslint-disable import/no-anonymous-default-export */
export default {
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
        height: 630,
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
