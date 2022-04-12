import React, { useEffect, useState, MouseEvent } from 'react';
import Link from 'next/link';
import SectionSummary from 'src/components/SectionSummary';
import SectionContent from 'src/components/SectionContent';
import CategoryList from './CategoryList';

interface Props {
  expand: boolean;
  categories: Category[];
  posts: Post[];
}
export default function CategoriesMenuItem({
  expand,
  categories,
  posts,
}: Props) {
  const [isFolding, handleFolding] = useState<boolean>(!expand);

  const parentCategories = categories.filter(({ parent }) => parent === null);

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
        <Link href="/categories" as="/categories">
          <a className="text-accent text-xl font-semibold">
            <p title="카테고리 전체">카테고리 전체</p>
          </a>
        </Link>
      </SectionSummary>
      <SectionContent isFolding={isFolding}>
        <nav className="p-5">
          {parentCategories.map((category) => {
            return (
              <CategoryList
                key={category.name}
                category={category}
                categories={categories}
                posts={posts}
              />
            );
          })}
        </nav>
      </SectionContent>
    </div>
  );
}
