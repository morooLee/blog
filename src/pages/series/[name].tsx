import React, { ChangeEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import MainLayout from '../../components/layouts/MainLayout';
import Location from 'src/components/Location';
import PostSummary from 'src/components/PostLargeCard';
import SearchInput from 'src/components/SearchInput';
import { CollectionPageJsonLd, NextSeo } from 'next-seo';
import SortingList from 'src/components/SortingList';
import NoDateMessage from 'src/components/NoDataMessage';
import Link from 'next/link';

interface Props {
  series: Series;
  posts: Post[];
  blog: BlogData;
}
export default function Series({ series, posts, blog }: Props) {
  const router = useRouter();
  const title = `Series - ${series.name} | Moroo Blog`;
  // const description = `Moroo's Blog Series - [ ${series.name} ]`;
  const url = decodeURI(`https://blog.moroo.dev${router.asPath}`);
  const images = [
    {
      url: `https://blog.moroo.dev/assets/series/${series.name}/series-cover-image.jpeg`,
      alt: `${series.name} Cover Image`,
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
        // description={description}
        openGraph={{
          title,
          images,
          // description,
          url,
        }}
      />
      <CollectionPageJsonLd
        name={title}
        hasPart={posts.map((post) => {
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
          {/* <Location title={`Series - ${series.name}`}>
            {'Series - '}
            <mark className="text-accent">{`[ ${series.name} ]`}</mark>
          </Location> */}
          <Location title="Series">
            <h1 className="font-normal">
              <mark className="font-bold pr-2">{series.name}</mark>
              series
            </h1>
          </Location>
          <details className="bg-btn border rounded-md m-5 p-5" open>
            <summary className="content-left text-3xl align-middle focus:outline-none list-none cursor-pointer">
              <span className="font-extrabold" title={series.name}>
                {series.name}
              </span>
            </summary>
            <ul className="list-decimal list-inside pt-3">
              {posts.map((post) => {
                return (
                  <li key={post.slug} className="pl-5">
                    <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
                      <a className="inline-block text-lg font-semibold ml-1">
                        <p>{post.title}</p>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </details>
        </div>
        <div className="z-10 flex justify-between items-center gap-5 p-5 bg-canvas sticky top-16">
          <SortingList
            defaultSortType={'number'}
            useSortTypes={['number', 'recent', 'name']}
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
            <NoDateMessage />
          )}
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

  const series = blog.series.find(({ name }) => {
    return name === params.name;
  });

  if (!series) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const posts = blog.posts.filter((post) => post.series?.name === series.name);

  return {
    props: {
      series,
      posts,
      blog,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blog = (await import('public/blog.json')).default;

  return {
    paths: blog.series.map((series) => {
      return {
        params: {
          name: series.name,
        },
      };
    }),
    fallback: false,
  };
};
