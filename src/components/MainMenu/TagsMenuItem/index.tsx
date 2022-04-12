import React, { useEffect, useState, MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SectionSummary from 'src/components/SectionSummary';
import SectionContent from 'src/components/SectionContent';

interface Props {
  expand: boolean;
  tags: Tag[];
  currentTags?: string[];
}
export default function TagsMenuItem({
  expand,
  tags,
  currentTags = [],
}: Props) {
  const [isFolding, handleFolding] = useState(!expand);
  const { query } = useRouter();

  function toggleFolding() {
    handleFolding(!isFolding);
  }

  function handleOnClick(event: MouseEvent<HTMLDivElement>) {
    const { target, currentTarget } = event;

    if (target === currentTarget) {
      toggleFolding();
    }
  }

  useEffect(() => {
    handleFolding(!expand);
  }, [expand]);

  return (
    <div className="w-full xl:w-62 2xl:w-80 bg-canvas border rounded-md">
      <SectionSummary
        isFolding={isFolding}
        toggleFolding={toggleFolding}
        onClick={handleOnClick}
      >
        <Link href="/tags" as="/tags">
          <a className="text-accent text-xl font-semibold">
            <p title="태그 전체">태그 전체</p>
          </a>
        </Link>
      </SectionSummary>
      <SectionContent isFolding={isFolding}>
        <ul className="list-none p-5 flex flex-row flex-wrap gap-2">
          {tags.map((tag) => {
            return (
              <li key={tag.name} className="group">
                <Link
                  href={{ pathname: '/tags', query: { tag: tag.name } }}
                  // href="/tags/[tag]" as={`/tags/${tag.name}`}
                >
                  <a
                    className={`inline-block rounded-full px-3 py-2 text-center align-middle ${
                      currentTags.includes(tag.name) || tag.name === query.tag
                        ? 'bg-btn border-red-500'
                        : 'bg-canvas border-btn'
                    } group-hover:border-btn-hover group-hover:bg-btn-hover border text-btn text-xs font-semibold leading-none`}
                  >
                    <p title={tag.name}>{tag.name}</p>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </SectionContent>
    </div>
  );
}
