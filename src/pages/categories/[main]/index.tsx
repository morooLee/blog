import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { BreadcrumbJsonLd, NextSeo } from 'next-seo';
import MainLayout from '../../../components/layouts/MainLayout';
import Location from 'src/components/Location';
import SubCategoryList from 'src/components/SubCategoryList';
import {
  BreadcrumbJsonLD,
  CollectionPageJsonLD,
  ItemListJsonLD,
  WebPageJsonLD,
} from 'src/lib/JsonLD';
import Adsense from 'src/components/Adsense';

interface Props {
  category: Category;
  posts: Post[];
  blog: BlogData;
}
export default function MainCategories({ category, posts, blog }: Props) {
  const router = useRouter();
  const title = `Main Category - ${category.name} | Moroo Blog`;
  const description = `Moroo Blog - ${category.name} 메인 카테고리의 포스트 모음`;
  const url = decodeURI(`https://blog.moroo.dev/categories/${category.name}`);
  const images = [
    {
      url: `https://blog.moroo.dev/assets/blog-cover-image.jpeg`,
      alt: `Moroo Blog Cover Image`,
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
          title,
          description,
          url,
        }}
      />
      <BreadcrumbJsonLD />
      <WebPageJsonLD
        name={title}
        description={description}
        url={url}
        image={{
          url: images[0].url,
          width: images[0].width,
          height: images[0].height,
          caption: images[0].alt,
        }}
        isPartOf={['https://blog.moroo.dev/categories']}
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
        <div className="px-5 pb-10">
          <Adsense
            style={{ display: 'block' }}
            className="px-5"
            adClient="ca-pub-5229752344777211"
            adSlot={8271717976}
            adFormat="autorelaxed"
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
    props: JSON.parse(
      JSON.stringify({
        category,
        posts,
        blog,
      })
    ),
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
