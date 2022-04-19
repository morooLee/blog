import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';

interface IDObject {
  '@id': string;
}

interface ImageObject {
  url: string;
  width: number;
  height: number;
  caption: string;
}

interface Person {
  email: string;
  image: ImageObject;
  jobTitle: string;
  name: string;
  gender: 'male' | 'female';
  nationality: string;
  url: string;
  sameAs: string[];
}

export function generatePersonJsonLD(person?: Person) {
  return {
    '@type': 'Person',
    '@id': 'https://blog.moroo.dev/#' + (person?.name ?? 'Me'),
    email: person?.email ?? 'moroo.lee@gmail.com',
    image: person?.image ?? {
      '@type': 'ImageObject',
      url: 'https://blog.moroo.dev/assets/moroo.png',
      width: 360,
      height: 360,
      caption: 'Moroo Logo',
    },
    jobTitle: person?.jobTitle ?? 'Software Quality Assurance',
    name: person?.name ?? 'moroo',
    gender: person?.gender ?? 'male',
    nationality: person?.nationality ?? 'Republic of Korea',
    url: person?.url ?? 'https://blog.moroo.dev/profile',
    sameAs: person?.sameAs ?? [
      'https://github.com/morooLee',
      'https://www.linkedin.com/in/moroo',
      'https://www.facebook.com/moroo.lee',
    ],
  };
}

interface PersonJsonLDProps {
  person?: Person;
}
export function PersonJsonLD({ person }: PersonJsonLDProps) {
  const [data, setData] = useState<object | undefined>(undefined);

  useEffect(() => {
    setData(generatePersonJsonLD(person));
  }, [person]);

  return (
    <Head>
      {data ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...data,
            }),
          }}
        />
      ) : null}
    </Head>
  );
}

export function generateBreadcrumbJsonLD(pathname: string) {
  const paths = decodeURI(pathname)
    .split('/')
    .filter((path) => path);

  return {
    '@type': 'BreadcrumbList',
    name: 'Breadcrumb',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://blog.moroo.dev',
      },
      ...paths.map((path, index) => {
        let name = '';
        switch (index) {
          case 0: {
            name = path.replace(/\b[a-z]/, (letter) => letter.toUpperCase());
            break;
          }
          default: {
            name = path;
          }
        }
        return {
          '@type': 'ListItem',
          position: index + 2,
          name,
          item: ['https://blog.moroo.dev', ...paths.slice(0, index + 1)].join(
            '/'
          ),
        };
      }),
    ],
  };
}

export function BreadcrumbJsonLD() {
  const [data, setData] = useState<object | undefined>(undefined);
  const { asPath } = useRouter();

  useEffect(() => {
    setData(generateBreadcrumbJsonLD(asPath));
  }, [asPath]);

  return (
    <Head>
      {data ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...data,
            }),
          }}
        />
      ) : null}
    </Head>
  );
}

export function generateArticleJsonLD(post: Post, author?: IDObject) {
  return {
    '@type': 'BlogPosting',
    name: 'Post',
    image: [post.coverImageUrl],
    url: `https://blog.moroo.dev/posts/${post.slug}`,
    headline: post.title,
    dateCreated: post.createdAt,
    dateModified: post.updatedAt,
    datePublished: post.updatedAt,
    author: author ?? generatePersonJsonLD(),
    accountablePerson: author ?? { '@id': 'https://blog.moroo.dev/#Me' },
    creator: author ?? { '@id': 'https://blog.moroo.dev/#Me' },
    publisher: author ?? { '@id': 'https://blog.moroo.dev/#Me' },
    inLanguage: 'ko-KR',
    keywords: post.tags,
    genre: [
      'Tech',
      'Technology',
      'IT',
      'QA',
      post.category.main,
      post.category.sub,
    ],
    // articleSection: post.series ?? post.category.sub,
  };
}

interface ArticleJsonLDProps {
  post: Post;
}

export function ArticleJsonLD({ post }: ArticleJsonLDProps) {
  const [data, setData] = useState<object | undefined>(undefined);

  useEffect(() => {
    setData(generateArticleJsonLD(post));
  }, [post]);

  return (
    <Head>
      {data ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...data,
            }),
          }}
        />
      ) : null}
    </Head>
  );
}

export function generateItemListJsonLD(
  name: string,
  description: string,
  posts: Post[]
) {
  return {
    '@type': 'ItemList',
    name,
    description,
    itemListElement: posts.map((post, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: generateArticleJsonLD(post, {
          '@id': 'https://blog.moroo.dev/#Me',
        }),
      };
    }),
  };
}

interface ItemListJsonLDProps {
  name: string;
  description: string;
  posts: Post[];
}

export function ItemListJsonLD({
  name,
  description,
  posts,
}: ItemListJsonLDProps) {
  const [data, setData] = useState<object | undefined>(undefined);

  useEffect(() => {
    setData(generateItemListJsonLD(name, description, posts));
  }, [name, description, posts]);

  return (
    <Head>
      {data ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...data,
            }),
          }}
        />
      ) : null}
    </Head>
  );
}

interface JsonLDProps {
  website?: boolean;
  webpage?: WebPageJsonLDProps;
  post?: Post;
  // summaryCarousel?: { name: string; {} };
  detailCarousel?: { name: string; posts: Post[] };
}
export function JsonLD({
  website,
  webpage,
  post,
  detailCarousel,
}: JsonLDProps) {
  const [data, setData] = useState<object | undefined>(undefined);
  const router = useRouter();

  console.log(router);
  useEffect(() => {
    const paths = decodeURI(router.pathname)
      .split('/')
      .filter((path) => path);

    const baseData: any = {
      '@graph': [
        generatePersonJsonLD(),
        generateBreadcrumbJsonLD(router.pathname),
        // {
        //   '@type': 'Person',
        //   '@id': '/#me',
        //   email: 'moroo.lee@gmail.com',
        //   image: ['https://blog.moroo.dev/assets/moroo.svg'],
        //   jobTitle: 'Software Quality Assurance',
        //   name: 'mroo',
        //   gender: 'male',
        //   nationality: 'Republic of Korea',
        //   url: 'https://blog.moroo.dev/profile',
        //   sameAs: [
        //     'https://github.com/morooLee',
        //     'https://www.linkedin.com/in/moroo',
        //     'https://www.facebook.com/moroo.lee',
        //   ],
        // },
        // {
        //   '@type': 'BreadcrumbList',
        //   name: 'Breadcrumb',
        //   itemListElement: [
        //     {
        //       '@type': 'ListItem',
        //       position: 1,
        //       name: 'Home',
        //       item: 'https://blog.moroo.dev',
        //     },
        //     ...paths.map((path, index) => {
        //       let name = '';
        //       switch (index) {
        //         case 0: {
        //           name = path.replace(/\b[a-z]/, (letter) =>
        //             letter.toUpperCase()
        //           );
        //           break;
        //         }
        //         default: {
        //           name = path;
        //         }
        //       }
        //       return {
        //         '@type': 'ListItem',
        //         position: index + 2,
        //         name,
        //         item: [
        //           'https://blog.moroo.dev',
        //           ...paths.slice(0, index + 1),
        //         ].join('/'),
        //       };
        //     }),
        //   ],
        // },
      ],
    };

    if (website) {
      baseData['@graph'].push(generateWebSiteJsonLD());
    }

    if (webpage) {
      baseData['@graph'].push(generateWebPageJsonLD(webpage));
    }

    if (post) {
      baseData['@graph'].push({
        '@type': 'BlogPosting',
        name: 'Post',
        image: [
          {
            url: post.coverImageUrl,
            width: 1200,
            height: 1200,
          },
        ],
        url: `https://blog.moroo.dev/posts/${post.slug}`,
        headline: post.title,
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
        author: { '@id': '/#me' },
        // author: [{ '@id': 'https://blog.moroo.dev#me' }],
        inLanguage: 'ko-KR',
        keywords: [...post.tags],
        genre: [
          'Tech',
          'Technology',
          'IT',
          'QA',
          post.category.main,
          post.category.sub,
        ],
      });
    }

    if (detailCarousel) {
      baseData['@graph'].push({
        '@type': 'ItemList',
        name: detailCarousel.name,
        itemListElement: detailCarousel.posts.map((post, index) => {
          return {
            '@type': 'ListItem',
            position: index + 1,
            item: generateArticleJsonLD(post),
          };
        }),
      });
    }

    setData(baseData);
  }, [post, detailCarousel, router, website, webpage]);

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            ...data,
          }),
        }}
      />
    </Head>
  );
}

export function generateWebSiteJsonLD() {
  // const paths = decodeURI(new URL(url).pathname)
  //   .split('/')
  //   .filter((path) => path);

  return {
    '@type': 'WebSite',
    '@id': 'https://blog.moroo.dev/#WebSite',
    url: 'https://blog.moroo.dev',
    name: 'Moroo Blog',
    description: 'Software QA 및 테스트 자동화에 대한 이야기',
    image: {
      '@type': 'ImageObject',
      '@id': 'https://blog.moroo.dev/#BlogCoverImage',
      url: 'https://blog.moroo.dev/assets/blog-cover-image.jpeg',
      width: 1200,
      height: 1200,
      caption: 'Blog Cover Image',
    },
    publisher: generatePersonJsonLD(),
    // potentialAction: [
    //   {
    //     '@type': 'SearchAction',
    //     target: {
    //       '@type': 'EntryPoint',
    //       urlTemplate: 'https://blog.moroo.dev/posts?s={search_term_string}',
    //     },
    //     'query-input': 'required name=search_term_string',
    //   },
    // ],
    inLanguage: 'ko-KR',
    copyrightHolder: { '@id': 'https://blog.moroo.dev/#Me' },
    copyrightYear: 2022,
    hasPart: [
      generateWebPageJsonLD({
        id: 'ProfileWebPage',
        name: 'Profile',
        description: '',
        url: 'https://blog.moroo.dev/profile',
        image: {
          '@id': 'https://blog.moroo.dev/#BlogCoverImage',
        },
        isPartOf: [{ '@id': 'https://blog.moroo.dev/#WebSite' }],
      }),
      generateWebPageJsonLD({
        id: 'CategoriesWebPage',
        name: 'Categories',
        description: '',
        url: 'https://blog.moroo.dev/categories',
        image: {
          '@id': 'https://blog.moroo.dev/#BlogCoverImage',
        },
        isPartOf: [{ '@id': 'https://blog.moroo.dev/#WebSite' }],
      }),
      generateWebPageJsonLD({
        id: 'SeriesWebPage',
        name: 'Series',
        description: '',
        url: 'https://blog.moroo.dev/series',
        image: {
          '@id': 'https://blog.moroo.dev/#BlogCoverImage',
        },
        isPartOf: [{ '@id': 'https://blog.moroo.dev/#WebSite' }],
      }),
      generateWebPageJsonLD({
        id: 'TagsWebPage',
        name: 'Tags',
        description: '',
        url: 'https://blog.moroo.dev/tags',
        image: {
          '@id': 'https://blog.moroo.dev/#BlogCoverImage',
        },
        isPartOf: [{ '@id': 'https://blog.moroo.dev/#WebSite' }],
      }),
      generateWebPageJsonLD({
        id: 'PostsWebPage',
        name: 'Posts',
        description: '',
        url: 'https://blog.moroo.dev/posts',
        image: {
          '@id': 'https://blog.moroo.dev/#BlogCoverImage',
        },
        isPartOf: [{ '@id': 'https://blog.moroo.dev/#WebSite' }],
      }),
    ],
  };
}

interface WebSiteJsonLDProps {}
export function WebSiteJsonLD({}: WebSiteJsonLDProps) {
  const [data, setData] = useState<object | undefined>(undefined);

  useEffect(() => {
    setData(generateWebSiteJsonLD());
  }, []);

  return (
    <Head>
      {data ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...data,
            }),
          }}
        />
      ) : null}
    </Head>
  );
}

interface WebPageJsonLDProps {
  id?: string;
  name: string;
  description: string;
  url: string;
  image: ImageObject | IDObject;
  isPartOf: (string | IDObject)[];
}

export function generateWebPageJsonLD({
  id,
  name,
  description,
  url,
  image,
  isPartOf,
}: WebPageJsonLDProps) {
  const href = decodeURI(new URL(url).href);
  const paths = decodeURI(new URL(url).pathname)
    .split('/')
    .filter((path) => path);

  return {
    '@type': 'WebPage',
    '@id': id ? 'https://blog.moroo.dev/#' + id : undefined,
    name,
    description,
    url,
    primaryImageOfPage: { '@type': 'ImageObject', ...image },
    isPartOf,
    breadcrumb: generateBreadcrumbJsonLD(decodeURI(new URL(url).pathname)),
    inLanguage: 'ko-KR',
    // isPartOf: paths.map((path) => {
    //   return {};
    // }),
  };
}

export function WebPageJsonLD({
  id,
  name,
  description,
  url,
  image,
  isPartOf,
}: WebPageJsonLDProps) {
  const [data, setData] = useState<object | undefined>(undefined);

  useEffect(() => {
    setData(
      generateWebPageJsonLD({ id, name, description, url, image, isPartOf })
    );
  }, [description, id, image, isPartOf, name, url]);

  return (
    <Head>
      {data ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...data,
            }),
          }}
        />
      ) : null}
    </Head>
  );
}

export function generateCollectionPageJsonLD(
  name: string,
  description: string,
  isPartOf: (string | IDObject)[],
  image?: ImageObject,
  posts?: Post[],
  categories?: Category[],
  series?: Series[],
  tags?: Tag[]
) {
  const genre = ['Tech', 'Technology', 'IT', 'QA'];
  const keywords: string[] = [];
  const children: any[] = [];

  if (categories) {
    categories.forEach((category) => {
      genre.push(category.name);
    });
  }

  if (posts) {
    posts.forEach((post) => {
      genre.push(post.category.main);
      genre.push(post.category.sub);
      post.tags.forEach((tag) => keywords.push(tag));
      children.push(
        generateArticleJsonLD(post, { '@id': 'https://blog.moroo.dev/#Me' })
      );
    });
  }

  if (series) {
    series.forEach((series) => genre.push(series.name));
  }

  return {
    '@type': 'CollectionPage',
    name,
    description,
    image: {
      '@type': 'ImageObject',
      url: image?.url ?? 'https://blog.moroo.dev/assets/blog-cover-image.jpeg',
      width: image?.width ?? 1200,
      height: image?.height ?? 1200,
      caption: image?.caption ?? 'Blog cover Image',
    },
    author: generatePersonJsonLD(),
    genre: [...new Set(genre)],
    keywords: [...new Set(keywords)],
    hasPart: children,
    isPartOf,
  };
}

interface CollectionPageJsonLDProps {
  name: string;
  description: string;
  isPartOf: (string | IDObject)[];
  image?: ImageObject;
  posts?: Post[];
  categories?: Category[];
  series?: Series[];
}

export function CollectionPageJsonLD({
  name,
  description,
  image,
  isPartOf,
  posts,
  categories,
  series,
}: CollectionPageJsonLDProps) {
  const [data, setData] = useState<object | undefined>(undefined);

  useEffect(() => {
    setData(
      generateCollectionPageJsonLD(name, description, isPartOf, image, posts)
    );
  }, [description, image, isPartOf, name, posts]);

  return (
    <Head>
      {data ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              ...data,
            }),
          }}
        />
      ) : null}
    </Head>
  );
}

const sd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://yoast.com/#organization',
      name: 'Yoast',
      url: 'https://yoast.com/',
      sameAs: [
        'https://www.facebook.com/yoast',
        'https://www.instagram.com/yoast/',
        'https://www.linkedin.com/company/1414157/',
        'https://www.youtube.com/yoast',
        'https://www.pinterest.com/yoast/',
        'https://en.wikipedia.org/wiki/Yoast',
        'https://twitter.com/yoast',
        'https://g.co/kgs/4H5sG2',
        'https://g.co/kgs/a9XfUu',
      ],
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://yoast.com/#logo',
        inLanguage: 'en-US',
        url: 'https://yoast.com/app/uploads/2020/09/Yoast_Icon_SocialMedia_500x500.png',
        contentUrl:
          'https://yoast.com/app/uploads/2020/09/Yoast_Icon_SocialMedia_500x500.png',
        width: 500,
        height: 500,
        caption: 'Yoast',
      },
      image: { '@id': 'https://yoast.com/#logo' },
      founder: {
        '@type': 'Person',
        name: 'Joost de Valk',
        url: 'https://yoast.com/about-us/team/joost-de-valk/',
        sameAs: 'https://yoast.com/about-us/team/joost-de-valk/',
      },
      foundingDate: '2010-05-01',
      numberOfEmployees: 142,
      slogan: 'SEO for Everyone',
      description:
        'Yoast helps you with your website optimization, whether it be through our widely used SEO software or our online SEO courses: we&#039;re here to help.',
      alternateName: 'Yoast BV',
      legalName: 'Yoast BV',
      parentOrganization: {
        '@type': 'Organization',
        name: 'Newfold Digital',
        description:
          'Newfold Digital is a leading web presence solutions provider serving millions of small-to-medium businesses globally.',
        url: 'https://newfold.com/',
        sameAs: ['https://newfold.com/'],
        logo: 'https://yoast.com/app/uploads/2022/01/newfold-logo.png',
      },
      memberOf: {
        '@type': 'Organization',
        name: 'World Wide Web Consortium (W3C)',
        description:
          'The World Wide Web Consortium (W3C) is an international community that develops open standards to ensure the long-term growth of the Web.',
        url: 'https://w3.org/',
        sameAs: ['https://w3.org/'],
        logo: 'https://www.w3.org/Icons/w3c_main.png',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://yoast.com/#website',
      url: 'https://yoast.com/',
      name: 'Yoast.com',
      description: 'SEO for everyone',
      publisher: { '@id': 'https://yoast.com/#organization' },
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://yoast.com/?s={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      ],
      inLanguage: 'en-US',
      copyrightHolder: { '@id': 'https://yoast.com/#organization' },
    },
    {
      '@type': 'ImageObject',
      '@id': 'https://yoast.com/wordpress-seo/#primaryimage',
      inLanguage: 'en-US',
      url: 'https://yoast.com/app/uploads/2021/06/wordpress_seo_definitive_guide_OG.jpg',
      contentUrl:
        'https://yoast.com/app/uploads/2021/06/wordpress_seo_definitive_guide_OG.jpg',
      width: 1200,
      height: 675,
    },
    {
      '@type': 'WebPage',
      '@id': 'https://yoast.com/wordpress-seo/#webpage',
      url: 'https://yoast.com/wordpress-seo/',
      name: 'WordPress SEO Tutorial • The Definitive Guide • Yoast',
      isPartOf: { '@id': 'https://yoast.com/#website' },
      primaryImageOfPage: {
        '@id': 'https://yoast.com/wordpress-seo/#primaryimage',
      },
      datePublished: '2021-06-17T12:00:00+00:00',
      dateModified: '2022-02-02T17:18:18+00:00',
      description:
        'Want higher rankings? This is THE tutorial you need to hugely increase your search engine traffic by improving your WordPress SEO.',
      breadcrumb: { '@id': 'https://yoast.com/wordpress-seo/#breadcrumb' },
      inLanguage: 'en-US',
      potentialAction: [
        { '@type': 'ReadAction', target: ['https://yoast.com/wordpress-seo/'] },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://yoast.com/wordpress-seo/#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://yoast.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'SEO blog',
          item: 'https://yoast.com/seo-blog/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'WordPress',
          item: 'https://yoast.com/tag/wordpress/',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'WordPress SEO: the definitive guide',
        },
      ],
    },
    {
      '@type': 'Article',
      '@id': 'https://yoast.com/wordpress-seo/#article',
      isPartOf: { '@id': 'https://yoast.com/wordpress-seo/#webpage' },
      author: {
        '@id':
          'https://yoast.com/#/schema/person/2d72f7859830ea2d4a4911795c69dfbb',
      },
      headline: 'WordPress SEO: the definitive guide',
      datePublished: '2021-06-17T12:00:00+00:00',
      dateModified: '2022-02-02T17:18:18+00:00',
      mainEntityOfPage: { '@id': 'https://yoast.com/wordpress-seo/#webpage' },
      wordCount: 11074,
      commentCount: 23,
      publisher: { '@id': 'https://yoast.com/#organization' },
      image: { '@id': 'https://yoast.com/wordpress-seo/#primaryimage' },
      thumbnailUrl:
        'https://yoast.com/app/uploads/2020/06/wordpress_seo_definitive_guide_2400x1350.png',
      keywords: [
        'Content SEO',
        'Google Analytics',
        'Mobile SEO',
        'Security',
        'Site Speed',
        'Site structure',
        'Technical SEO',
        'WordPress',
        'Yoast SEO',
      ],
      inLanguage: 'en-US',
      potentialAction: [
        {
          '@type': 'CommentAction',
          name: 'Comment',
          target: ['https://yoast.com/wordpress-seo/#respond'],
        },
      ],
      copyrightYear: '2021',
      copyrightHolder: { '@id': 'https://yoast.com/#organization' },
      accessibilityFeature: ['tableOfContents'],
    },
    {
      '@type': 'Person',
      '@id':
        'https://yoast.com/#/schema/person/2d72f7859830ea2d4a4911795c69dfbb',
      name: 'Joost de Valk',
      image: {
        '@type': 'ImageObject',
        '@id': 'https://yoast.com/#personlogo',
        inLanguage: 'en-US',
        url: 'https://yoast.com/app/uploads/2018/09/avatar_user_1_1537774226.png',
        contentUrl:
          'https://yoast.com/app/uploads/2018/09/avatar_user_1_1537774226.png',
        caption: 'Joost de Valk',
      },
      description:
        "Joost de Valk is the founder and Chief Product Officer of Yoast. He's an internet entrepreneur, who next to founding Yoast has invested in and advised several startups. His main expertise is open source software development and digital marketing.",
      sameAs: [
        'https://joost.blog/',
        'https://www.facebook.com/jdevalk',
        'https://www.instagram.com/joostdevalk/',
        'http://www.linkedin.com/in/jdevalk',
        'https://twitter.com/jdevalk',
        'https://en.wikipedia.org/wiki/Joost_de_Valk',
        'https://github.com/jdevalk',
        'https://joost.blog/about-me/',
        'https://profiles.wordpress.org/joostdevalk/',
        'https://yoast.com/about-us/team/joost-de-valk/',
      ],
      birthDate: '1982-02-16',
      gender: 'male',
      knowsAbout: ['SEO', 'digital marketing'],
      knowsLanguage: ['Dutch', 'English', 'French', 'German'],
      jobTitle: 'Founder & Chief Product Officer',
      worksFor: { '@id': 'https://yoast.com/#organization' },
      url: 'https://yoast.com/author/joost/',
    },
  ],
};
