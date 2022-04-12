import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import FoldingArrow from '../FoldingArrow';
import PostCardList from '../PostCardList';

interface Props {
  mainCategory: Category;
  posts: Post[];
  isAllFolding: boolean;
  hasLink?: boolean;
}

export default function SubCategoryList({
  mainCategory,
  posts,
  isAllFolding,
  hasLink = true,
}: Props) {
  const [isFolding, setIsFolding] = useState<boolean>(false);

  function toggleFolding() {
    setIsFolding(!isFolding);
  }

  useEffect(() => {
    setIsFolding(isAllFolding);
  }, [isAllFolding]);

  return (
    <>
      <div className="pb-5 flex flex-row items-center justify-between">
        {hasLink ? (
          <Link
            href="/categories/[main]"
            as={`/categories/${mainCategory.name}`}
          >
            <a>
              <p
                title={mainCategory.name}
                className="flex-auto text-accent text-3xl font-bold"
              >
                {mainCategory.name}
              </p>
            </a>
          </Link>
        ) : (
          <p
            title={mainCategory.name}
            className="flex-auto text-accent text-3xl font-bold"
          >
            {mainCategory.name}
          </p>
        )}
        <div onClick={toggleFolding} className="group hover:cursor-pointer">
          <span className="inline-block text-sm group-hover:text-accent">
            {isFolding ? '펼치기' : '접기'}
          </span>
          <FoldingArrow
            isFolding={isFolding}
            className="inline-block text-2xl group-hover:text-accent"
          />
        </div>
      </div>
      <ul className="flex flex-col gap-5">
        {mainCategory.children.map((subCategory) => {
          return (
            <li key={subCategory}>
              <PostCardList
                title={subCategory}
                posts={posts.filter((post) => {
                  return post.category.sub === subCategory;
                })}
                isAllFolding={isFolding}
                href="/categories/[main]/[sub]"
                as={`/categories/${mainCategory.name}/${subCategory}`}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
