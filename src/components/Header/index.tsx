import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDarkModeContext } from '../../lib/DarkModeContext';
import {
  RiFacebookBoxFill,
  RiFacebookCircleFill,
  RiFacebookFill,
  RiFileCopyFill,
  RiLinkedinBoxFill,
  RiLinkedinFill,
  RiLinksFill,
  RiMenuFill,
  RiMoonLine,
  RiRssFill,
  RiShareBoxFill,
  RiShareFill,
  RiShareLine,
  RiSunLine,
  RiTwitterFill,
} from 'react-icons/ri';
import { useRouter } from 'next/router';
import MainMenu from '../MainMenu';
import MediaQuery from '../MediaQuery';
import MorooLogo from 'public/assets/moroo.svg';
import Image from 'next/image';
import ShareSNS from '../ShareSNS';

interface Props {
  blog: BlogData;
  currentPost?: Post;
}
export default function Header({ blog, currentPost }: Props) {
  const router = useRouter();
  const [onShareList, setOnShareList] = useState<boolean>(false);
  const [isDarkMode, toggleDarkMode] = useDarkModeContext();
  const [onMobileMenu, setOnMobileMenu] = useState<boolean>(false);

  function handleMobileMenuOnclick() {
    setOnMobileMenu(!onMobileMenu);
  }

  function handleMediaQueryChange(matches: boolean) {
    if (!matches) {
      setOnMobileMenu(false);
    }
  }

  function handleOnShareButton() {
    if (onMobileMenu) {
      setOnMobileMenu(false);
    }
    setOnShareList(!onShareList);
  }

  useEffect(() => {
    function handleRouteChangeComplete() {
      setOnMobileMenu(false);
    }
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // function handleResize() {
    //   const { matches } = window.matchMedia('screen and (min-width: 1024px)');
    //   if (matches) {
    //     setOnMobileMenu(false);
    //   }
    // }

    // window.addEventListener('resize', handleResize);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      // window.removeEventListener('resize', handleResize);
    };
  }, [router.events]);

  useEffect(() => {
    if (onMobileMenu) {
      document.body.classList.add('noscroll');
      if (onShareList) {
        setOnShareList(false);
      }
    } else {
      document.body.classList.remove('noscroll');
    }
  }, [onMobileMenu]);

  return (
    <>
      <header className="z-20 fixed top-0 left-0 right-0 max-h-16 bg-header">
        <div className="h-full w-full lg:w-[63.5rem] lg:mx-auto xl:w-[79rem] 2xl:w-[88rem] mx-auto bg-header text-header-logo text-base font-semibold">
          <div className="xl:w-[63.5rem] 2xl:w-[68rem] flex flex-row items-center justify-between gap-4 px-4 py-3">
            <Link href="/" as="/">
              <a className="h-[32px] w-[32px] justify-self-start relative cursor-pointer">
                <Image
                  src={MorooLogo}
                  alt="Moroo Logo"
                  layout="fixed"
                  objectFit="cover"
                  width={32}
                  height={32}
                  priority={true}
                />
              </a>
            </Link>
            <nav className="hidden h-10 flex-auto justify-self-start sm:flex flex-row items-center gap-5">
              <Link href="/profile" as="/profile">
                <a
                  className={`inline-block ${
                    router.pathname === '/profile'
                      ? 'text-header-logo'
                      : 'text-muted'
                  }`}
                >
                  <p title="PROFILE">PROFILE</p>
                </a>
              </Link>
              <Link href="/series" as="/series">
                <a
                  className={`inline-block ${
                    router.pathname.startsWith('/series')
                      ? 'text-header-logo'
                      : 'text-muted'
                  }`}
                >
                  <p title="SERIES">SERIES</p>
                </a>
              </Link>
              <Link href="/categories" as="/categories">
                <a
                  className={`inline-block ${
                    router.pathname.startsWith('/categories')
                      ? 'text-header-logo'
                      : 'text-muted'
                  }`}
                >
                  <p title="CATEGORIES">CATEGORIES</p>
                </a>
              </Link>
              <Link href="/tags" as="/tags">
                <a
                  className={`inline-block ${
                    router.pathname.startsWith('/tags')
                      ? 'text-header-logo'
                      : 'text-muted'
                  }`}
                >
                  <p title="TAGS">TAGS</p>
                </a>
              </Link>
              <Link href="/posts" as="/posts">
                <a
                  className={`inline-block ${
                    router.pathname.startsWith('/posts')
                      ? 'text-header-logo'
                      : 'text-muted'
                  }`}
                >
                  <p title="POSTS">POSTS</p>
                </a>
              </Link>
            </nav>
            <div className="h-10 xl:w-62 2xl:w-80 pl-5 lg:px-5 flex flex-row items-center justify-end text-3xl gap-2">
              <Link href="/rss/feed.xml" as="/rss/feed.xml">
                <a>
                  <RiRssFill aria-label="Feed Subscribe" />
                </a>
              </Link>
              <button onClick={toggleDarkMode} aria-label="Expend Button">
                {isDarkMode ? (
                  <RiMoonLine aria-label="Dark Mode" />
                ) : (
                  <RiSunLine aria-label="Light Mode" />
                )}
              </button>
              <ShareSNS
                isOpen={onShareList}
                handleOnClickOpenButton={handleOnShareButton}
              />
              <button
                onClick={handleMobileMenuOnclick}
                className="block lg:hidden text-4xl align-middle"
                aria-label="Hamburger Menu Button"
              >
                <RiMenuFill className="hover:scale-100" />
              </button>
            </div>
          </div>
        </div>
      </header>
      {onMobileMenu ? (
        <MediaQuery maxWidth={1023} onChange={handleMediaQueryChange}>
          <div className="z-20 fixed w-full mx-auto">
            <div
              className="fixed left-0 top-16 right-0 bottom-0 bg-overlay/20 backdrop-blur-sm overflow-y-scroll overscroll-none"
              onClick={() => setOnMobileMenu(false)}
            />
            <div className="px-2 pt-3 mb-3 absolute w-full overflow-y-scroll overscroll-none">
              <MainMenu
                isExpand={false}
                blog={blog}
                currentPost={currentPost}
              />
            </div>
          </div>
        </MediaQuery>
      ) : null}
    </>
  );
}
