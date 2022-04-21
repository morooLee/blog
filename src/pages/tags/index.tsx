import React, { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { BreadcrumbJsonLd, NextSeo } from 'next-seo';
import MainLayout from '../../components/layouts/MainLayout';
import PostCardList from '../../components/PostCardList';
import FoldingArrow from '../../components/FoldingArrow';
import Location from 'src/components/Location';
import SearchInput from 'src/components/SearchInput';
import SortingList from 'src/components/SortingList';
import NoDateMessage from 'src/components/NoDataMessage';
import { BreadcrumbJsonLD, JsonLD, WebPageJsonLD } from 'src/lib/JsonLD';
import Adsense from 'src/components/Adsense';

interface Props {
  blog: BlogData;
}

export default function Tags({ blog }: Props) {
  const router = useRouter();
  const query = router.query;

  const title = 'Tags | Moroo Blog';
  const description = 'Moroo Blog - 태그 전체 모음';
  const url = decodeURI('https://blog.moroo.dev/tags');
  const images = [
    {
      url: `https://blog.moroo.dev/assets/blog-cover-image.jpeg`,
      alt: `Moroo Blog Cover Image`,
      width: 1200,
      height: 1200,
    },
  ];

  const [isAll, setIsAll] = useState<boolean>(false);
  const [currentTags, setCurrentTags] = useState<Tag[]>([...blog.tags]);
  const [isAllFolding, setIsAllFolding] = useState<boolean>(false);

  function handleAllTagButtonOnClick() {
    if (isAll) {
      setCurrentTags([]);
      setIsAll(false);
    } else {
      setCurrentTags([...blog.tags]);
      setIsAll(true);
    }
  }

  function handleTagOnclick(event: MouseEvent<HTMLButtonElement>) {
    const value = event.currentTarget.value;

    if (value) {
      const findTag = blog.tags.find(({ name }) => name === value);
      const index = currentTags.findIndex(({ name }) => name === value);

      if (index >= 0) {
        const temp = [...currentTags];
        temp.splice(index, 1);
        setCurrentTags(temp);
        setIsAll(false);
      } else {
        if (findTag) {
          setCurrentTags([...currentTags.concat(findTag)]);
          setIsAll(false);
        }
      }
    }
  }
  function handleAllFoldingButtonOnClick() {
    setIsAllFolding(!isAllFolding);
  }

  function onSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value) {
      const findTag = blog.tags.find(({ name }) => name === value);
      if (findTag) {
        setCurrentTags([findTag]);
      } else {
        setCurrentTags([]);
      }
      setIsAll(false);
    } else {
      setCurrentTags([...blog.tags]);
      setIsAll(true);
    }
  }

  useEffect(() => {
    if (query.tag) {
      const findTag = blog.tags.find(({ name }) => name === query.tag);
      if (findTag) {
        setCurrentTags([findTag]);
      } else {
        setCurrentTags([...blog.tags]);
      }
    } else {
      setCurrentTags([]);
    }
  }, [blog.tags, query.tag]);

  useEffect(() => {
    if (currentTags.length === blog.tags.length) {
      setIsAll(true);
    } else {
      setIsAll(false);
    }
  }, [blog.tags.length, currentTags]);

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
      {/* <JsonLD
        webpage={{
          id: 'TagsWebPage',
          name: 'Tags',
          description: '',
          url: 'https://blog.moroo.dev/tags',
          image: {
            url: 'https://blog.moroo.dev/assets/blog-cover-image.jpeg',
            width: 1200,
            height: 1200,
            caption: 'Blog Cover Image',
          },
        }}
      /> */}
      <BreadcrumbJsonLD />
      <WebPageJsonLD
        id="Tags"
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
          <Location title="Tags" />
        </div>
        <div className="sticky top-16 z-10 bg-canvas px-5 pb-5">
          <div className="py-5 flex flex-row items-center gap-2">
            <p className="flex-auto text-accent text-xl font-semibold">
              Filter
            </p>
            <SearchInput
              placeholder="태그명 검색..."
              dataList={blog.tags.map((tag) => {
                return {
                  key: tag.name,
                  value: tag.name,
                  text: tag.name,
                };
              })}
              onChange={onSearchChange}
            />
          </div>
          <ul className="max-h-[8rem] flex flex-row flex-wrap gap-2 overflow-y-auto p-1">
            <li
              key="all"
              className="transform transition-transform duration-200 hover:scale-110"
            >
              <button
                value="all"
                className={`rounded-full px-3 py-2 text-center align-middle ${
                  isAll ? 'bg-btn border-red-500' : 'bg-canvas border-btn'
                } hover:bg-btn-hover hover:cursor-pointer border text-btn text-xs font-semibold subpixel-antialiase leading-none`}
                onClick={handleAllTagButtonOnClick}
                aria-label="Expend All Button"
              >
                All
              </button>
            </li>
            {blog.tags.map((tag) => {
              return (
                <li
                  key={tag.name}
                  className="transform transition-transform duration-200 hover:scale-105"
                >
                  <button
                    value={tag.name}
                    className={`rounded-full px-3 py-2 text-center align-middle ${
                      currentTags.includes(tag)
                        ? 'bg-btn border-red-500'
                        : 'bg-canvas border-btn'
                    } hover:bg-btn-hover hover:cursor-pointer border text-btn text-xs font-semibold subpixel-antialiase leading-none`}
                    onClick={handleTagOnclick}
                    aria-label="Tag Link Button"
                  >
                    {tag.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="sticky top-[17.5rem] z-10 flex flex-wrap justify-between items-center gap-5 px-5 pb-5 bg-canvas">
          <div className="grow">
            <SortingList
              defaultSortType={'posts'}
              useSortTypes={['posts', 'name']}
              data={currentTags}
              handleDataSortingFunc={setCurrentTags}
            />
          </div>
          <div
            onClick={handleAllFoldingButtonOnClick}
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
        <div className="px-5 pb-10">
          {currentTags.length > 0 ? (
            <ul className="flex flex-col gap-5">
              {currentTags.map((tag) => {
                return (
                  <li key={tag.name}>
                    <PostCardList
                      title={tag.name}
                      posts={blog.posts.filter((post) => {
                        return post.tags.includes(tag.name);
                      })}
                      isAllFolding={isAllFolding}
                      href={{
                        pathname: '/tags',
                        query: { tag: tag.name },
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <NoDateMessage />
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
