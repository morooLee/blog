import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  posts: Post[];
}
export default function PostList({ posts }: Props) {
  const router = useRouter();
  const slug = decodeURI(router.query.slug as string);

  return (
    <ul>
      {posts.map((post) => {
        return (
          <li
            key={post.slug}
            className={`ml-1 pl-3 border-l-2 ${
              slug === post.slug && 'border-red-500'
            }`}
          >
            <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
              <a
                className={`inline-block py-1 mr-6 text-sm text-btn ${
                  slug === post.slug && 'font-bold'
                }`}
              >
                <p title={post.title}>{post.title}</p>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
