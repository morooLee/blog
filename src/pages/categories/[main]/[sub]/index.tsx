import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { BreadcrumbJsonLd, CollectionPageJsonLd, NextSeo } from 'next-seo';
import MainLayout from '../../../../components/layouts/MainLayout';
import Location from 'src/components/Location';
import PostSummary from 'src/components/PostLargeCard';
import SearchInput from 'src/components/SearchInput';
import SortingList from 'src/components/SortingList';
import NoDataMessage from 'src/components/NoDataMessage';
import {
  BreadcrumbJsonLD,
  CollectionPageJsonLD,
  ItemListJsonLD,
} from 'src/lib/JsonLD';
import Adsense from 'src/components/Adsense';

interface Props {
  category: Category;
  posts: Post[];
  blog: BlogData;
}
export default function SubCategories({ category, posts, blog }: Props) {
  const router = useRouter();
  const title = `Sub Category - ${category.name} | Moroo Blog`;
  const description = `Moroo's Blog Sub Category - [ ${category.name} ]`;
  const url = decodeURI(
    `https://blog.moroo.dev/categories/${category.parent}/${category.name}`
  );
  const images = [
    {
      url: `https://blog.moroo.dev/assets/blog-cover-image.jpeg`,
      alt: `Moroo Blog Cover Image`,
      width: 1200,
      height: 1200,
    },
  ];

  const [searchPosts, setSearchPosts] = useState<Post[]>([...posts]);

  // function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
  //   const value = event.target.value;
  //   if (value) {
  //     const findPosts = blog.posts.filter(
  //       ({ title, content }) => title.includes(value) || content.includes(value)
  //     );

  //     if (findPosts.length) {
  //       setSearchPosts([...findPosts]);
  //     } else {
  //       setSearchPosts([]);
  //     }
  //   } else {
  //     setSearchPosts([...posts]);
  //   }
  // }

  useEffect(() => {
    setSearchPosts([...posts]);
  }, [posts]);

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
      <CollectionPageJsonLD
        name={title}
        description={description}
        isPartOf={[
          'https://blog.moroo.dev/categories',
          `https://blog.moroo.dev/categories/${category.parent}`,
        ]}
        posts={posts}
      />
      <ItemListJsonLD name={title} description={description} posts={posts} />
      <MainLayout blog={blog}>
        <div>
          <Location title="Sub Category">
            <h1>
              <span className="block">Sub Category</span>
              <mark>{category.name}</mark>
            </h1>
          </Location>
        </div>
        <div className="z-10 p-5 bg-canvas sticky top-16 flex justify-between items-center gap-5">
          <SortingList
            defaultSortType={'recent'}
            useSortTypes={['recent', 'name']}
            data={searchPosts}
            handleDataSortingFunc={setSearchPosts}
          />
          {/* <SearchInput
            placeholder="제목 또는 내용 검색..."
            dataList={posts.map(({ slug, title }) => {
              return {
                key: slug,
                value: title,
                text: title,
              };
            })}
            onChange={onSearchChange}
          /> */}
        </div>
        <div className="max-w-none px-5 pb-5">
          {searchPosts.length > 0 ? (
            <ul className="flex flex-col gap-10">
              {searchPosts.map((post) => {
                return (
                  <li key={post.slug}>
                    <PostSummary post={post} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <NoDataMessage />
          )}
        </div>
        <div className="px-5 pb-5">
          <Adsense
            style={{ display: 'block' }}
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
    return name === params.sub;
  });

  const posts = blog.posts.filter((post) => {
    return post.category.sub === params.sub;
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
      .map((main) => {
        return main.children.map((sub) => {
          return {
            params: {
              main: main.name,
              sub: sub,
            },
          };
        });
      })
      .flat(),
    fallback: false,
  };
};
