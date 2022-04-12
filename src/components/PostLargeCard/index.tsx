import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { RiArrowRightSLine, RiCalendar2Line } from 'react-icons/ri';
import { useRouter } from 'next/router';
import PostCoverImage from '../PostCoverImage';
// import Img from 'react-optimized-image';

interface Props {
  post: Post;
}
export default function PostLargeCard({ post }: Props) {
  const { query } = useRouter();

  return (
    <div className="w-full bg-btn rounded-md border p-5">
      <div className="border rounded-md">
        <Image
          src={post.coverImageUrl}
          alt={`${post.title} Cover Image`}
          width={686}
          height={361}
          priority={true}
          objectFit="cover"
          layout="responsive"
          className="rounded-md"
          quality={80}
        />
      </div>
      <div className="mt-8 text-lg font-semibold">
        <Link
          href="/categories/[main]"
          as={`/categories/${post.category.main}`}
        >
          <a className="inline-block">
            <p>{post.category.main}</p>
          </a>
        </Link>
        <RiArrowRightSLine className="mx-1 inline-block" />
        <Link
          href="/categories/[main]/[sub]"
          as={`/categories/${post.category.main}/${post.category.sub}`}
        >
          <a className="inline-block">
            <p>{post.category.sub}</p>
          </a>
        </Link>
      </div>
      {query.slug === post.slug ? (
        <h1 className="daum-wm-title py-2 text-4xl font-bold">{post.title}</h1>
      ) : (
        <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
          <a className="inline-block py-2 text-4xl font-bold">
            <p>{post.title}</p>
          </a>
        </Link>
      )}

      <div className="flex flex-col md:flex-row items-start md:items-center gap-x-3">
        {/* <RiCalendar2Line className="text-lg" /> */}
        <div className="flex flex-row items-center gap-1">
          <RiCalendar2Line className="text-lg" />
          <label className="text-md" title="포스트 작성일">
            포스트 생성 :
          </label>
          {/* <RiCalendar2Line className="text-lg" /> */}
          <p className="text-md font-semibold" title={post.createdAt}>
            {post.createdAt}
          </p>
        </div>
        <div className="hidden md:block">|</div>
        <div className="flex flex-row items-center gap-1">
          <RiCalendar2Line className="text-lg" />
          <label className="text-md" title="최근 수정일">
            최근 수정일 :
          </label>
          {/* <RiCalendar2Line className="text-lg" /> */}
          <p
            className="daum-wm-datetime text-md font-semibold"
            title={post.updatedAt}
          >
            {post.updatedAt}
          </p>
        </div>
      </div>
      {post.tags.length > 0 ? (
        <div className="mt-5">
          <ul className="list-none flex flex-row flex-wrap gap-2">
            {post.tags.map((tag) => {
              return (
                <li key={tag}>
                  <Link href={{ pathname: '/tags', query: { tag } }}>
                    <a>
                      <p
                        className="rounded-xl md:rounded-2xl px-2 py-1 text-center align-middle bg-btn border-red-500 hover:border-btn-hover hover:bg-btn-hover border text-btn text-xs md:text-base lg:text-sm font-semibold leading-none"
                        title={tag}
                      >
                        {tag}
                      </p>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      {post.series ? (
        <div className="text-2xl text-right mt-5">
          <Link href="/series/[name]" as={`/series/${post.series.name}`}>
            <a className="inline-block font-bold">
              <p>{post.series.name}</p>
            </a>
          </Link>
          <p className="inline-block pl-2 font-thin">series</p>
        </div>
      ) : null}
    </div>
  );
}
