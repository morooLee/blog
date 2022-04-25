import React, { ReactNode } from 'react';
import MainMenu from '../../MainMenu';
import Footer from '../../Footer';
import Header from '../../Header';
import TocAside from '../../TocAside';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import ScrollProgressBar from '../../ScrollProgressBar';
import { RiArrowUpCircleLine, RiCloseFill } from 'react-icons/ri';

interface Props {
  children: ReactNode;
  toc: MDXRemoteSerializeResult | undefined;
  activeHeadingId: string | undefined;
  blog: BlogData;
  currentPost: Post;
}
export default function PostLayout({
  children,
  blog,
  toc,
  activeHeadingId,
  currentPost,
}: Props) {
  function handleOnclickTopButton() {
    window.scrollTo(0, 0);
  }
  return (
    <>
      <Header blog={blog} currentPost={currentPost} />
      <ScrollProgressBar />
      <div className="mt-16 w-full lg:w-[63.5rem] lg:mx-auto xl:w-[79rem] 2xl:w-[88rem] flex flex-col">
        <div className="hidden lg:block fixed w-full mx-auto">
          <aside className="absolute w-full lg:w-62 lg:left-0 2xl:w-80 overflow-y-scroll scrollbar-hide">
            <MainMenu isExpand={true} blog={blog} currentPost={currentPost} />
          </aside>
        </div>
        <main
          id="main"
          className="max-w-screen mx-auto lg:w-3xl lg:ml-auto lg:mr-0 xl:mx-auto pt-5"
        >
          {children}
        </main>
        <div className="hidden xl:block fixed lg:w-[79rem] lg:mx-auto xl:mx-auto 2xl:w-[88rem]">
          <aside className="absolute w-full lg:w-62 lg:right-0 2xl:w-80 h-aside overflow-y-scroll scrollbar-hide">
            <TocAside toc={toc} activeHeadingId={activeHeadingId} />
          </aside>
        </div>
        <div className="fixed xl:hidden z-10 right-5 bottom-5">
          <button
            onClick={handleOnclickTopButton}
            className="bg-btn border rounded-full rounded-tl-full rounded-tr-full rounded-bl-full px-3 py-2"
          >
            <RiArrowUpCircleLine className="text-2xl inline-block mr-2" />
            <span>TOP</span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
