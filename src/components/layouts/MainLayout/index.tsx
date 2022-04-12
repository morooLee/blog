import React, { ReactNode } from 'react';
import MainMenu from '../../MainMenu';
import Footer from '../../Footer';
import Header from '../../Header';
import { Media } from 'src/components/Media';
import SectionSummary from 'src/components/SectionSummary';
import SectionContent from 'src/components/SectionContent';
import Adsense from 'src/components/Adsense';

interface Props {
  children: ReactNode;
  blog: BlogData;
}
export default function MainLayout({ children, blog }: Props) {
  return (
    <>
      {/* <Header blog={blog} />
      <div className="mt-16 w-full lg:w-[63.5rem] lg:mx-auto 2xl:w-[68rem] flex flex-col">
        <div className="hidden lg:block fixed w-full mx-auto">
          <aside className="absolute w-full lg:w-62 lg:left-0 2xl:w-80 overflow-y-scroll scrollbar-hide">
            <MainMenu isExpand={true} blog={blog} />
          </aside>
        </div>
        <main className="w-full mx-auto lg:w-3xl lg:ml-auto lg:mr-0 pt-5">
          {children}
        </main>
      </div>
      <Footer /> */}

      <Header blog={blog} />
      <div className="mt-16 w-full lg:w-[63.5rem] lg:mx-auto xl:w-[79rem] 2xl:w-[88rem] flex flex-col">
        <div className="hidden lg:block fixed w-full mx-auto">
          <aside className="absolute w-full lg:w-62 lg:left-0 2xl:w-80 overflow-y-scroll scrollbar-hide">
            <MainMenu isExpand={true} blog={blog} />
          </aside>
        </div>
        <main
          id="main"
          className="max-w-screen mx-auto lg:w-3xl lg:ml-auto lg:mr-0 xl:mx-auto pt-5"
        >
          {children}
        </main>
        <div className="hidden lg:fixed lg:w-[79rem] lg:mx-auto xl:mx-auto 2xl:w-[88rem]">
          <aside className="absolute w-full lg:w-62 lg:right-0 2xl:w-80 h-aside overflow-y-scroll scrollbar-hide">
            <div className="w-full lg:py-5 flex flex-col gap-2">
              {/* <section className="bg-canvas border rounded-md">
                <SectionSummary isFolding={false}>
                  <p className="text-accent text-xl font-semibold inline-block cursor-text">
                    AD
                  </p>
                </SectionSummary>
                <SectionContent isFolding={false}>
                  <div className="p-5">
                    <Adsense
                      adClient="ca-pub-5229752344777211"
                      adSlot={9218864958}
                    />
                  </div>
                </SectionContent>
              </section> */}
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}
