import fs from 'fs';
import { join } from 'path';
import Blog from './blog';
import { createBlogCoverImage } from './images';
import { generateRssFeed } from './rss';

(() => {
  Blog.init();
  const blog = Blog.getBlog();

  fs.writeFileSync(
    join(process.cwd(), 'public/blog.json'),
    JSON.stringify(blog, null, 2)
  );

  createBlogCoverImage();
  generateRssFeed(blog);
})();
