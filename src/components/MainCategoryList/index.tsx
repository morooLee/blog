import React, { useEffect, useState } from 'react';
import SubCategoryList from '../SubCategoryList';

interface Props {
  categories: Category[];
  posts: Post[];
  isAllFolding?: boolean;
}

export default function MainCategoryList({
  categories,
  posts,
  isAllFolding = false,
}: Props) {
  const [isFolding, setIsFolding] = useState<boolean>(isAllFolding);

  function toggleFolding() {
    setIsFolding(!isFolding);
  }

  useEffect(() => {
    setIsFolding(isAllFolding);
  }, [isAllFolding]);
  return (
    <ul className="flex flex-col gap-10">
      {categories
        .filter(({ parent }) => parent === null)
        .map((mainCategory) => {
          return (
            <li key={mainCategory.name}>
              {mainCategory.children.length > 0 && (
                <SubCategoryList
                  mainCategory={mainCategory}
                  posts={posts.filter((post) => {
                    return post.category.main === mainCategory.name;
                  })}
                  isAllFolding={isFolding}
                />
              )}
            </li>
          );
        })}
    </ul>
  );
}
