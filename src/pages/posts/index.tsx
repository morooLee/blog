import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { BreadcrumbJsonLd, CollectionPageJsonLd, NextSeo } from 'next-seo';
import MainLayout from '../../components/layouts/MainLayout';
import PostLargeCard from '../../components/PostLargeCard';
import Location from 'src/components/Location';
import SortingList from 'src/components/SortingList';
import NoDataMessage from 'src/components/NoDataMessage';
import { BreadcrumbJsonLD } from 'src/lib/JsonLD';

interface Props {
  blog: BlogData;
}
export default function Posts({ blog }: Props) {
  const router = useRouter();
  const query = router.query;

  const title = 'Posts | Moroo Blog';
  const description = 'Moroo Blog - 포스트 전체 모음';
  const url = decodeURI('https://blog.moroo.dev/posts');

  const [searchPosts, setSearchPosts] = useState<Post[]>([...blog.posts]);

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
  //     setSearchPosts([...blog.posts]);
  //   }
  // }

  // useEffect(() => {
  //   setSearchPosts([...blog.posts]);
  // }, [blog.posts]);

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
      <CollectionPageJsonLd
        name={title}
        description={description}
        hasPart={blog.posts.map((post) => {
          return {
            about: post.description ?? '',
            author: 'moroo',
            name: post.title,
            datePublished: post.updatedAt,
            audience: 'Internet',
            keywords: post.category.sub,
            thumbnailUrl: post.coverImageUrl,
            image: post.coverImageUrl,
          };
        })}
      />
      <MainLayout blog={blog}>
        <div>
          <Location title="Posts" />
        </div>
        <div className="z-10 flex flex-wrap justify-between items-center p-5 bg-canvas sticky top-16">
          <div className="grow">
            <SortingList
              defaultSortType={'recent'}
              useSortTypes={['recent', 'name']}
              data={searchPosts}
              handleDataSortingFunc={setSearchPosts}
            />
          </div>
          {/* <SearchInput
            placeholder="제목 또는 내용 검색..."
            dataList={blog.posts.map((post) => {
              return {
                key: post.slug,
                value: post.title,
                text: post.title,
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
                    <PostLargeCard post={post} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <NoDataMessage />
          )}
        </div>
      </MainLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const blog = (await import('public/blog.json')).default;

  return {
    props: {
      blog,
    },
  };
};
