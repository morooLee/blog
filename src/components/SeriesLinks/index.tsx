import React, { useEffect } from 'react';
import Link from 'next/link';
import { RiArrowLeftCircleLine, RiArrowRightCircleLine } from 'react-icons/ri';

interface Props {
  series?: Series;
  previous?: Post;
  next?: Post;
}

export default function SeriesPostLinks({ series, previous, next }: Props) {
  const gridRowCount = previous && next ? 2 : 1;
  return (
    <div
      className={`pt-5 grid grid-flow-col grid-rows-${gridRowCount} sm:grid-rows-1 grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-5 justify-between items-center flex-wrap sm:flex-nowrap`}
    >
      {previous ? (
        <Link href="/posts/[slug]" as={`/posts/${previous.slug}`}>
          <a className="sm:col-start-1 series group flex-1 flex flex-row gap-1 justify-start items-center py-2 px-5 bg-btn border rounded-md">
            <RiArrowLeftCircleLine className="no-scale text-4xl transform transition-transform duration-200 group-hover:-translate-x-3" />
            <div className="text-left">
              <p className="text-xs">이전 포스트</p>
              <p className="font-bold group-hover:underline group-hover:text-link-accent">
                {previous.title}
              </p>
            </div>
          </a>
        </Link>
      ) : null}
      {next ? (
        <Link href="/posts/[slug]" as={`/posts/${next.slug}`}>
          <a className="sm:col-start-2 series group flex-1 flex flex-row gap-1 justify-end items-center py-2 px-5 bg-btn border rounded-md">
            <div className="text-right">
              <p className="text-xs">다음 포스트</p>
              <p className="font-bold group-hover:underline group-hover:text-link-accent">
                {next.title}
              </p>
            </div>
            <RiArrowRightCircleLine className="no-scale text-4xl transform transition-transform duration-200 group-hover:translate-x-3" />
          </a>
        </Link>
      ) : null}
    </div>
  );
}
