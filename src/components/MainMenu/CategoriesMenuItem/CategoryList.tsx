import React, { useState } from 'react';
import CategoryTitle from './CategoryTitle';
import PostList from './PostList';

interface Props {
  category: Category;
  categories: Category[];
  posts: Post[];
}
export default function CategoryList({ category, categories, posts }: Props) {
  const isParent = category.parent === null ? true : false;
  const [isFolding, handleFolding] = useState(false);

  const childCategories = categories.filter(({ parent }) => {
    return parent === category.name;
  });
  const postsInCategory = posts.filter((post) => {
    return isParent
      ? post.category.main === category.name
      : post.category.sub === category.name;
  });
  function toggleFolding() {
    handleFolding(!isFolding);
  }

  return (
    <ul
      className={`${
        isParent
          ? 'list-none flex flex-col'
          : 'list-none pl-2 lg:ml-1 lg:pl-1 2xl:ml-2 2xl:pl-2'
      }`}
    >
      <li key={category.name}>
        <CategoryTitle
          category={category}
          isFolding={isFolding}
          toggleFolding={toggleFolding}
        />
        {!isFolding ? (
          childCategories.length > 0 ? (
            childCategories.map((childCategory) => {
              return (
                <CategoryList
                  key={childCategory.name}
                  category={childCategory}
                  categories={categories}
                  posts={posts}
                />
              );
            })
          ) : (
            <PostList posts={postsInCategory} />
          )
        ) : null}
      </li>
    </ul>
  );
}
