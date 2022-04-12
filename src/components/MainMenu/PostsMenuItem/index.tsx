import React from 'react';
import Link from 'next/link';
import SectionSummary from 'src/components/SectionSummary';
import { useRouter } from 'next/router';

interface Props {}
export default function PostsMenuItem({}: Props) {
  const route = useRouter();

  function handleOnClick() {
    route.push('/posts');
  }
  return (
    <div className="lg:hidden w-full lg:w-62 2xl:w-80 bg-canvas border rounded-md">
      <SectionSummary onClick={handleOnClick}>
        <div className="group w-full -m-5 p-5">
          <Link href="/posts" as="/posts">
            <a className="text-accent text-xl font-semibold">
              <p title="포스트 전체">포스트 전체</p>
            </a>
          </Link>
        </div>
      </SectionSummary>
    </div>
  );
}
