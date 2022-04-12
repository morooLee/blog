import React from 'react';
import { GetStaticProps } from 'next';
import MainLayout from '../../components/layouts/MainLayout';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import compiledSource from '../../lib/compiledSource';
import { NextSeo, SocialProfileJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
import Location from 'src/components/Location';
import MarkdownComponents from 'src/components/MarkdownComponents';

interface Props {
  content: MDXRemoteSerializeResult;
  blog: BlogData;
}
export default function Profile({ content, blog }: Props) {
  const router = useRouter();
  const title = 'Profile | Moroo Blog';
  // const description = "Moroo's Profile with Github";
  const url = decodeURI(`https://blog.moroo.dev${router.asPath}`);

  return (
    <>
      <NextSeo
        canonical={url}
        title={title}
        // description={description}
        openGraph={{
          type: 'profile',
          title,
          // description,
          url,
          // images,
          profile: {
            firstName: 'Soon Han',
            lastName: 'Lee',
            username: 'moroo',
            gender: 'male',
          },
        }}
      />
      <SocialProfileJsonLd
        type="Person"
        name="moroo"
        url="https://blog.moroo.dev"
        sameAs={[
          'https://github.com/morooLee',
          'https://www.linkedin.com/in/moroo',
          'mailto:moroo.lee@gmail.com',
        ]}
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
