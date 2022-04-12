import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PostCoverImage from '../PostCoverImage';
import { RiCalendar2Line } from 'react-icons/ri';
// import Img from 'react-optimized-image';

interface Props {
  post: Post;
}
export default function PostCard({ post }: Props) {
  function ellipsisText(text: string) {
    return sliceByByte(text, 190);
  }
  function sliceByByte(str: string, maxByte: number) {
    let buffer = 0;
    let index = 0;

    for (index; index < str.length; index++) {
      buffer += str.charCodeAt(index) > 127 ? 2 : 1;

      if (buffer >= maxByte) {
        return str.substring(0, index) + '...';
      }
    }

    return str;
  }

  return (
    <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
      <a className="card group relative w-full flex flex-col min-w-[18rem] max-w-[18rem] min-h-[23.25rem] max-h-[23.25rem] bg-btn border rounded-md px-5 pt-5 pb-3">
        {/* {post.series ? (
          <p className="absolute top-0 right-0" title={post.series.name}>
            {post.series.name}
          </p>
        ) : null} */}
        <div className="flex items-center text-xs pb-1 border-b">
          <p className="inline-block" title={post.category.main}>
            {post.category.main}
          </p>
          <p className="inline-block text-muted mx-1">›</p>
          <p className="inline-block" title={post.category.sub}>
            {post.category.sub}
          </p>
        </div>
        <p
          className="text-lg text-accent font-semibold truncate pt-1 pb-1"
          title={post.title}
        >
          {post.title}
        </p>
        {/* <PostCoverImage
          isLarge={false}
          title={post.title}
          coverImageUrl={post.coverImageUrl}
        /> */}
        <div className="border rounded-md">
          <Image
            src={post.coverImageUrl}
            alt={`${post.title} Cover Image`}
            width={246}
            height={129}
            priority={true}
            objectFit="cover"
            layout="responsive"
            className="rounded-md"
            quality={80}
          />
        </div>
        {/* <img
          src={require(`/assets/posts/${post.slug}/post-cover-image.jpeg`)}
          alt="sd"
        /> */}
        <p
          className="flex-1 text-sm text-muted h-32 mt-2 mb-4 line-clamp-5"
          title={post.description || post.title}
        >
          {/* {post.description || post.title} */}
          {ellipsisText(post.description)}
        </p>
        <div className="flex flex-row gap-1 justify-end items-center pt-3 border-t">
          <RiCalendar2Line className="text-md" />
          <p className="text-xs" title="최근 수정일">
            최근 수정일 :
          </p>
          <p className="text-xs font-semibold" title={post.updatedAt}>
            {post.updatedAt}
          </p>
        </div>
      </a>
    </Link>
  );
}
