import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import ReactUtterances from '../../components/ReactUtterances';
import { useDarkModeContext } from '../../lib/DarkModeContext';
import PostLayout from '../../components/layouts/PostLayout';
import PostLargeCard from '../../components/PostLargeCard';
import compiledSource from '../../lib/compiledSource';
import { ArticleJsonLd, BreadcrumbJsonLd, NextSeo } from 'next-seo';
import Location from 'src/components/Location';
import SeriesPostLinks from 'src/components/SeriesLinks';
import Link from 'next/link';
import Adsense from 'src/components/Adsense';
import Blog from 'src/lib/blog';
import MarkdownComponents from 'src/components/MarkdownComponents';
import { TocItem } from 'src/components/TocAside/TocItem';
import { TocLink } from 'src/components/TocAside/TocLink';
import { JsonLd } from 'next-seo/lib/jsonld/jsonld';
import {
  ArticleJsonLD,
  BreadcrumbJsonLD,
  ItemListJsonLD,
} from 'src/lib/JsonLD';
import PostCard from 'src/components/PostCard';
import PostCardList from 'src/components/PostCardList';
import {
  RiFacebookFill,
  RiFileCopyFill,
  RiLinkedinFill,
  RiShareBoxFill,
  RiTwitterFill,
} from 'react-icons/ri';

interface Props {
  post: Post;
  series?: Series;
  content: MDXRemoteSerializeResult;
  toc: MDXRemoteSerializeResult | undefined;
  blog: BlogData;
}
export default function Post({ post, series, content, toc, blog }: Props) {
  const router = useRouter();
  const title = `${post.title} | Moroo Blog`;
  const description = post.description;
  const url = decodeURI(`https://blog.moroo.dev/posts/${post.slug}`);
  const images = [
    {
      url: 'https://blog.moroo.dev' + post.coverImageUrl,
      alt: `${post.title} Post Cover Image`,
      width: 1200,
      height: 1200,
    },
  ];

  const [isDarkMode] = useDarkModeContext();

  const intersectingListRef = useRef<Map<string, IntersectionObserverEntry>>(
    new Map()
  );
  const [activeHeadingId, setActiveHeadingId] = useState<string | undefined>(
    undefined
  );
  const [onShareList, setOnShareList] = useState<boolean>(false);

  function handleOnShareButton() {
    setOnShareList(!onShareList);
  }

  useEffect(() => {
    const rootElement = document.getElementById('post-article');

    if (rootElement === null) {
      return;
    }

    const headingElements = Array.from(
      (rootElement ?? document).querySelectorAll(
        'h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]'
      )
    );

    const intersectingList = intersectingListRef.current;
    const callback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[]
    ) => {
      entries.forEach((entry) => {
        intersectingList.set(entry.target.id, entry);
      });

      const visibleHeadings: IntersectionObserverEntry[] = [];
      intersectingList.forEach((value) => {
        if (value.isIntersecting) {
          visibleHeadings.push(value);
        }
      });

      if (visibleHeadings.length > 0) {
        setActiveHeadingId(visibleHeadings[0].target.id);
      }
    };

    const rem = Number(
      window
        .getComputedStyle(document.documentElement)
        .fontSize.replace('px', '')
    );

    const observer: IntersectionObserver = new IntersectionObserver(callback, {
      // root: postContentElement,
      rootMargin: `${-(rem * 4)}px 0px 0px 0px`,
      threshold: 1,
    });

    headingElements.forEach((element) => observer.observe(element));
    return () => {
      observer.disconnect();
      intersectingList.clear();
    };
  }, [toc]);

  return (
    <>
      <NextSeo
        canonical={url}
        title={title}
        description={description}
        openGraph={{
          type: 'article',
          title,
          description,
          url,
          images,
          article: {
            authors: ['https://blog.moroo.dev/profile'],
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            section: post.category.sub,
            tags: post.tags,
          },
        }}
      />
      <BreadcrumbJsonLD />
      <ArticleJsonLD post={post} />
      <ItemListJsonLD
        name={`${post.category.sub} Category`}
        description={`${post.title} ???????????? ${post.category.sub} ???????????? ??????`}
        posts={blog.posts.filter(
          ({ category }) => category.sub === post.category.sub
        )}
      />
      {series ? (
        <ItemListJsonLD
          name={`${post.series} Series`}
          description={`${post.title} ???????????? ????????? ??????`}
          posts={blog.posts.filter(
            ({ series }) => series?.name === post.series?.name
          )}
        />
      ) : null}
      {/* <JsonLd
        type="Article"
        url={url}
        title={title}
        images={images ? images.map((image) => image.url) : []}
        datePublished={post.updatedAt}
        dateModified={post.updatedAt}
        authorName={['moroo']}
        publisherName="moroo"
        publisherLogo="https://blog.moroo.dev/assets/moroo.svg"
        description={description}
      /> */}
      <PostLayout
        blog={blog}
        currentPost={post}
        toc={toc}
        activeHeadingId={activeHeadingId}
      >
        <div>
          <Location title="Post">Post</Location>
          {toc ? (
            <details className="lg:hidden bg-btn border rounded-md m-5 p-5">
              <summary className="content-right list-none flex justify-between items-center text-2xl align-middle focus:outline-none cursor-pointer">
                <span className="font-extrabold" title="??????">
                  ??????
                </span>
              </summary>
              <MDXRemote
                {...toc}
                components={{
                  li: (props: any) => {
                    if (Array.isArray(props.children)) {
                      return (
                        <li {...props}>
                          <details>
                            <summary className="content-right list-none flex justify-between">
                              {props.children[0]}
                            </summary>
                            {props.children[1]}
                          </details>
                        </li>
                      );
                    } else {
                      return <li {...props} />;
                    }
                  },
                  a: (props: any) => <TocLink {...props} />,
                }}
              />
            </details>
          ) : null}
        </div>
        <div className="mx-5 mt-5 mb-10">
          <PostLargeCard post={post} />
        </div>
        <article
          id="post-article"
          className="daum-wm-content markdown dark:markdown-invert max-w-none p-5"
        >
          <Adsense
            // style={{ display: 'block' }}
            adClient="ca-pub-5229752344777211"
            adSlot={3625286179}
            adLayout="in-article"
            adFormat="fluid"
          />
          <MDXRemote {...content} components={MarkdownComponents} />
          <Adsense
            className="pt-10 pb-10"
            // style={{ display: 'block' }}
            adClient="ca-pub-5229752344777211"
            adSlot={3257760132}
            adLayout="in-article"
            adFormat="fluid"
          />
        </article>

        {post.series ? (
          <div className="mx-5 pt-5 mb-10 border-t">
            <Link href="/series/[name]" as={`/series/${post.series.name}`}>
              <a className="inline-block text-3xl font-bold">
                <p>{post.series.name}</p>
              </a>
            </Link>
            <p className="inline-block ml-2 text-3xl font-thin">series</p>
            <SeriesPostLinks
              series={series}
              previous={blog.posts.find(
                ({ id }) => id === series?.postIds[post.series!.number - 1 - 1]
              )}
              next={blog.posts.find(
                ({ id }) => id === series?.postIds[post.series!.number - 1 + 1]
              )}
            />
          </div>
        ) : null}
        <div className="px-5 pb-10">
          <p className="text-3xl font-bold pb-5">Comments</p>
          <ReactUtterances
            repo="morooLee/blog"
            type="specific-term"
            specificTerm={post.title}
            label="comments"
            theme={isDarkMode ? 'github-dark' : 'github-light'}
            async={true}
          />
        </div>
        <div className="px-5 pb-10">
          <p className="text-3xl font-bold pb-5">Sub Category</p>
          <PostCardList
            title={post.category.sub}
            posts={blog.posts.filter(
              ({ category }) => category.sub === post.category.sub
            )}
            // isAllFolding={false}
            href="/categories/[main]/[sub]"
            as={`/categories/${post.category.main}/${post.category.sub}`}
          />
          {/* <ul className="py-5 flex gap-5 overflow-y-auto snap-x">
            {blog.posts
              .filter(({ category }) => category.sub === post.category.sub)
              .map((post) => {
                return (
                  <li key={post.slug} className="snap-start scroll-ml-5">
                    <PostCard post={post} />
                  </li>
                );
              })}
          </ul> */}
        </div>
        <div className="px-5 pt-10 pb-5">
          <Adsense
            style={{ display: 'block' }}
            adClient="ca-pub-5229752344777211"
            adSlot={8271717976}
            adFormat="autorelaxed"
          />
        </div>
      </PostLayout>
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

  const post = blog.posts.find(({ slug }) => {
    return slug === params.slug;
  });

  if (!post) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const source = Blog.getPostContent(post.slug);

  const series = blog.series.find(({ name }) => name === post.series?.name);

  if (!source) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const { content, toc } = await compiledSource(source, {
    isAutoLinkHeading: true,
  });

  return {
    props: JSON.parse(
      JSON.stringify({
        post,
        series,
        content,
        toc,
        blog,
      })
    ),
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blog = (await import('public/blog.json')).default;

  return {
    paths: blog.posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};
