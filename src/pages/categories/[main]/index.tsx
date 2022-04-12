import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import MainLayout from '../../../components/layouts/MainLayout';
import Location from 'src/components/Location';
import SubCategoryList from 'src/components/SubCategoryList';

interface Props {
  category: Category;
  posts: Post[];
  blog: BlogData;
}
export default function MainCategories({ category, posts, blog }: Props) {
  const router = useRouter();
  const title = `Main Category - ${category.name} | Moroo Blog`;
  // const description = `Moroo's Blog Main Category - [ ${category.name} ]`;
  const url = decodeURI(`https://blog.moroo.dev${router.asPath}`);

  return (
    <>
      <NextSeo
        canonical={url}
        title={title}
        // description={description}
        openGraph={{
          title,
          // description,
          url,
        }}
      />
      <MainLayout blog={blog}>
        <div>
          <Location title="Main Category" />
        </div>
        <div className="max-w-none px-5 pb-5">
          <SubCategoryList
            mainCategory={category}
            posts={posts}
            isAllFolding={false}
            hasLink={false}
          />
        </div>
      </MainLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blog = (await import('public/blog.json')).default;

  if (!params) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const category = blog.categories.find(({ name }) => {
    return name === params.main;
  });

  const posts = blog.posts.filter((post) => {
    return post.category.main === params.main;
  });

  return {
    props: {
      category,
      posts,
      blog,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blog = (await import('public/blog.json')).default;

  return {
    paths: blog.categories
      .filter(({ parent }) => parent == null)
      .map((category) => {
        return {
          params: {
            main: category.name,
          },
        };
      }),
    fallback: false,
  };
};
