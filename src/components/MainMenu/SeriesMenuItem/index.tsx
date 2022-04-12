import React, { useEffect, useState, MouseEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SectionContent from 'src/components/SectionContent';
import SectionSummary from 'src/components/SectionSummary';

interface Props {
  expand: boolean;
  seriesList: Series[];
  currentPost?: Post;
}

export default function SeriesMenuItem({
  expand,
  seriesList,
  currentPost,
}: Props) {
  const router = useRouter();
  const { series } = router.query;
  const [isFolding, handleFolding] = useState<boolean>(!expand);

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
        <Link href="/series" as="/series">
          <a className="text-accent text-xl font-semibold">
            <p title="시리즈 전체">시리즈 전체</p>
          </a>
        </Link>
      </SectionSummary>
      <SectionContent isFolding={isFolding}>
        <ul className="list-none p-5 flex flex-col">
          {seriesList.map(({ name }) => {
            return (
              <li key={name} className="group">
                <Link href="/series/[name]" as={`/series/${name}`}>
                  <a
                    className={`block py-2 leading-none text-xl font-bold${
                      name === series || name === currentPost?.series?.name
                        ? ' text-red-500'
                        : ''
                    }`}
                  >
                    <p title={name}>{`${name}`}</p>
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
