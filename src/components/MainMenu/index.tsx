import React from 'react';
import CategoriesMenuItem from './CategoriesMenuItem';
import PostsMenuItem from './PostsMenuItem';
import SeriesMenuItem from './SeriesMenuItem';
import TagsMenuItem from './TagsMenuItem';
import ProfileMenuItem from './ProfileMenuItem';

interface Props {
  isExpand: boolean;
  blog: BlogData;
  currentPost?: Post;
}

export default function MainMenu({ isExpand, blog, currentPost }: Props) {
  return (
    <div className="main-menu w-full lg:py-5 flex flex-col gap-2 z-20 md:z-0">
      <ProfileMenuItem expand={true} />
      <CategoriesMenuItem
        expand={isExpand}
        categories={blog.categories}
        posts={blog.posts}
      />
      <SeriesMenuItem
        expand={isExpand}
        seriesList={blog.series}
        currentPost={currentPost}
      />
      <TagsMenuItem
        expand={isExpand}
        tags={blog.tags}
        currentTags={currentPost?.tags}
      />
      <PostsMenuItem />
    </div>
  );
}
