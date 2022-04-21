import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CardSummary from '../SectionSummary';
import PostCard from '../PostCard';
import CardDetail from '../SectionContent';
import { UrlObject } from 'url';

interface Props {
  title: string;
  posts: Post[];
  isAllFolding?: boolean;
  href?: string | UrlObject;
  as?: string & (string | UrlObject);
}
export default function PostCardList({
  title,
  posts,
  isAllFolding,
  href,
  as,
}: Props) {
  const [isFolding, handleFolding] = useState(isAllFolding);

  function toggleFolding() {
    handleFolding(!isFolding);
  }

  useEffect(() => {
    handleFolding(isAllFolding);
  }, [isAllFolding]);

  return (
    <div className="w-full bg-canvas border rounded-md">
      <CardSummary isFolding={isFolding} toggleFolding={toggleFolding}>
        {href ? (
          <Link href={href} as={as}>
            <a className="text-accent text-xl font-semibold inline-block">
              <p title={title}>{`${title} (${posts.length})`}</p>
            </a>
          </Link>
        ) : (
          <p
            className="text-accent text-xl font-semibold inline-block"
            title={title}
          >{`${title} (${posts.length})`}</p>
        )}
      </CardSummary>
      <CardDetail isFolding={isFolding ?? false}>
        <ul className="p-5 flex gap-5 overflow-y-auto snap-x">
          {posts.map((post) => {
            return (
              <li key={post.slug} className="snap-start scroll-ml-5">
                <PostCard post={post} />
              </li>
            );
          })}
        </ul>
      </CardDetail>
    </div>
  );
}
