import React from 'react';
import type { GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  CollectionPageJsonLd,
  LogoJsonLd,
  NextSeo,
  SiteLinksSearchBoxJsonLd,
  SocialProfileJsonLd,
} from 'next-seo';
import MainLayout from 'src/components/layouts/MainLayout';
import Location from 'src/components/Location';
import PostCard from 'src/components/PostCard';
import PostLargeCard from 'src/components/PostLargeCard';
import Link from 'next/link';
import BlogCoverImage from 'public/assets/blog-cover-image.jpeg';
import { BreadcrumbJsonLD, JsonLD, WebSiteJsonLD } from 'src/lib/JsonLD';

interface Props {
  blog: BlogData;
}
export default function Home({ blog }: Props) {
  const router = useRouter();
  const title = 'Home | Moroo Blog';
  const url = 'https://blog.moroo.dev';
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
        openGraph={{
          title,
          url,
          images,
        }}
      />
      <BreadcrumbJsonLD />
      <WebSiteJsonLD />
      <MainLayout blog={blog}>
        <div className="pb-10">
          <Location title="hello">
            <h1 className="text-5xl font-bold">
              Hello! 👋
              <span className="block text-3xl font-normal">
                Welcome to the <mark className="font-bold">Moroo Blog</mark>
              </span>
            </h1>
            <div className="mt-5 border">
              <Image
                src={BlogCoverImage}
                alt="#moroo Software Quality Assurance Test Automation Engineer"
                layout="responsive"
                objectFit="cover"
                width={726}
                height={255}
                quality={80}
                placeholder="blur"
                priority={true}
              />
            </div>
          </Location>
        </div>
        <div className="px-5 pb-10">
          <p className="text-3xl font-bold">Latest Post</p>
          <div className="py-5">
            <PostLargeCard post={blog.posts[0]} />
          </div>
        </div>
        <div className="px-5 pb-10">
          <p className="text-3xl font-bold">Posts</p>
          <ul className="py-5 flex gap-5 overflow-y-auto snap-x">
            {blog.posts.map((post) => {
              return (
                <li key={post.slug} className="snap-start scroll-ml-5">
                  <PostCard post={post} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="px-5 pb-10">
          <p className="text-3xl font-bold">Series</p>
          <ul className="py-5 flex flex-row gap-5">
            {blog.series.map((series) => {
              return (
                <li key={series.name}>
                  <Link href="/series/[name]" as={`/series/${series.name}`}>
                    <a className="block text-xl font-semibold bg-btn p-2 border rounded-md transform transition-transform duration-200 hover:scale-105 hover:text-accent">
                      <span title={series.name}>{series.name}</span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="px-5 pb-10">
          <p className="text-3xl font-bold">Categories</p>
          <ul className="py-5 flex flex-row flex-wrap gap-10">
            {blog.categories
              .filter(({ parent }) => {
                return parent === null;
              })
              .map((mainCategory) => {
                return (
                  <li key={mainCategory.name}>
                    <Link
                      href="/categories/[main]"
                      as={`/categories/${mainCategory.name}`}
                    >
                      <a className="block text-xl font-bold pb-2">
                        <p title={mainCategory.name}>{mainCategory.name}</p>
                      </a>
                    </Link>
                    <ul>
                      {blog.categories
                        .filter(({ parent }) => {
                          return parent === mainCategory.name;
                        })
                        .map((subCategory) => {
                          return (
                            <li
                              className="ml-1 pl-2 border-l-2"
                              key={subCategory.name}
                            >
                              <Link
                                href="/categories/[main]/[sub]"
                                as={`/categories/${mainCategory.name}/${subCategory.name}`}
                              >
                                <a className="block text-lg">
                                  <p title={subCategory.name}>
                                    {subCategory.name}
                                  </p>
                                </a>
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="px-5 pb-10">
          <p className="text-3xl font-bold">Tags</p>
          <ul className="list-none py-5 flex flex-row flex-wrap gap-2">
            {blog.tags.map((tag) => {
              return (
                <li key={tag.name} className="group">
                  <Link href={{ pathname: '/tags', query: { tag: tag.name } }}>
                    <a
                      className={`inline-block rounded-full px-3 py-2 text-center align-middle bg-btn border-red-500 group-hover:border-btn-hover group-hover:bg-btn-hover border text-btn text-xs font-semibold leading-none`}
                    >
                      <p title={tag.name}>{tag.name}</p>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
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
