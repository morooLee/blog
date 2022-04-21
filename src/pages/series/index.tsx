import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { BreadcrumbJsonLd, NextSeo } from 'next-seo';
import MainLayout from '../../components/layouts/MainLayout';
import PostCardList from '../../components/PostCardList';
import Location from 'src/components/Location';
import FoldingArrow from 'src/components/FoldingArrow';
import SearchInput from 'src/components/SearchInput';
import SortingList from 'src/components/SortingList';
import NoDateMessage from 'src/components/NoDataMessage';
import { BreadcrumbJsonLD, WebPageJsonLD } from 'src/lib/JsonLD';

interface Props {
  blog: BlogData;
}
export default function AllSeries({ blog }: Props) {
  const router = useRouter();
  const title = 'Series | Moroo Blog';
  const description = 'Moroo Blog - 시리즈 전체 모음';
  const url = decodeURI('https://blog.moroo.dev/series');
  const images = [
    {
      url: `https://blog.moroo.dev/assets/blog-cover-image.jpeg`,
      alt: `Moroo Blog Cover Image`,
      width: 1200,
      height: 1200,
    },
  ];

  const [searchSeries, setSearchSeries] = useState<Series[]>([...blog.series]);
  const [isAllFolding, setIsAllFolding] = useState<boolean>(false);

  function toggleAllFolding() {
    setIsAllFolding(!isAllFolding);
  }

  // function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
  //   const value = event.target.value;
  //   if (value) {
  //     const findSeries = blog.series.filter(({ name }) => {
  //       const seriesPosts = blog.posts.filter(
  //         ({ series }) => series?.name === name
  //       );
  //       const findPosts = seriesPosts.filter(
  //         ({ title, content }) =>
  //           title.includes(value) || content.includes(value)
  //       );

  //       return name.includes(value) || findPosts.length > 0;
  //     });

  //     if (findSeries.length) {
  //       setSearchSeries([...findSeries]);
  //     } else {
  //       setSearchSeries([]);
  //     }
  //   } else {
  //     setSearchSeries([...blog.series]);
  //   }
  // }

  useEffect(() => {
    setSearchSeries([...blog.series]);
  }, [blog.series]);

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
        id="Series"
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
          <Location title="Series" />
        </div>
        <div className="z-10 flex flex-wrap justify-between items-center gap-5 p-5 bg-canvas sticky top-16">
          <div className="grow">
            <SortingList
              defaultSortType={'posts'}
              useSortTypes={['posts', 'name']}
              data={searchSeries}
              handleDataSortingFunc={setSearchSeries}
            />
          </div>
          {/* <SearchInput
            placeholder="제목 또는 내용 검색..."
            dataList={blog.series.map(({ name }) => {
              return {
                key: name,
                value: name,
                text: name,
              };
            })}
            onChange={onSearchChange}
          /> */}
          <div
            onClick={toggleAllFolding}
            className="ml-auto group hover:cursor-pointer"
          >
            <span className="inline-block text-sm group-hover:text-accent">
              {isAllFolding ? '모두 펼치기' : '모두 접기'}
            </span>
            <FoldingArrow
              isFolding={isAllFolding}
              className="inline-block text-2xl group-hover:text-accent"
            />
          </div>
        </div>
        <div className="max-w-none px-5 pb-5">
          {searchSeries.length > 0 ? (
            <ul className="flex flex-col gap-5">
              {searchSeries.map((series) => {
                return (
                  <li key={series.name}>
                    <PostCardList
                      title={series.name}
                      posts={blog.posts.filter((post) => {
                        return series.postIds.includes(post.id);
                      })}
                      isAllFolding={isAllFolding}
                      href="/series/[name]"
                      as={`/series/${series.name}`}
                    />
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

export const getStaticProps: GetStaticProps = async () => {
  const blog = (await import('public/blog.json')).default;

  return {
    props: JSON.parse(
      JSON.stringify({
        blog,
      })
    ),
  };
};
