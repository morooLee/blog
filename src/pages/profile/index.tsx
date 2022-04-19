import React from 'react';
import { GetStaticProps } from 'next';
import MainLayout from '../../components/layouts/MainLayout';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import compiledSource from '../../lib/compiledSource';
import { BreadcrumbJsonLd, NextSeo, SocialProfileJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
import Location from 'src/components/Location';
import MarkdownComponents from 'src/components/MarkdownComponents';
import { BreadcrumbJsonLD, PersonJsonLD, WebPageJsonLD } from 'src/lib/JsonLD';

interface Props {
  content: MDXRemoteSerializeResult;
  blog: BlogData;
}
export default function Profile({ content, blog }: Props) {
  const router = useRouter();
  const title = 'Profile | Moroo Blog';
  const description = 'Moroo Profile with Github';
  const url = decodeURI('https://blog.moroo.dev/profile');
  const images = [
    {
      url: `https://blog.moroo.dev/assets/profile-image.jpeg`,
      alt: `Moroo Profile Image`,
      width: 1200,
      height: 1200,
    },
  ];

  return (
    <>
      <NextSeo
        canonical={url}
        title={title}
        description={description}
        openGraph={{
          type: 'profile',
          title,
          description,
          url,
          images,
          profile: {
            firstName: 'Soon Han',
            lastName: 'Lee',
            username: 'moroo',
            gender: 'male',
          },
        }}
      />
      <PersonJsonLD />
      <BreadcrumbJsonLD />
      <WebPageJsonLD
        id="Profile"
        name={title}
        description={description}
        url={url}
        image={{
          url: images[0].url,
          width: images[0].width,
          height: images[0].height,
          caption: images[0].alt,
        }}
        isPartOf={['https://blog.moroo.dev']}
      />
      <MainLayout blog={blog}>
        <div>
          <Location title="Profile" />
        </div>
        <div
          id="profile-content"
          className="markdown dark:markdown-invert max-w-none px-5 pb-5"
        >
          <MDXRemote {...content} components={MarkdownComponents} />
        </div>
      </MainLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blog = (await import('public/blog.json')).default;

  const response = await fetch(
    'https://raw.githubusercontent.com/morooLee/morooLee/main/README.md'
  );
  const source = await response.text();
  const { content } = await compiledSource(source, {
    isAutoLinkHeading: false,
  });

  return {
    props: {
      content,
      blog,
    },
  };
};
