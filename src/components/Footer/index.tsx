import React from 'react';
import Link from 'next/link';
import ContactList from '../ContactList';
import Image from 'next/image';
// import Img from 'react-optimized-image';
import MorooLogo from 'public/assets/moroo.svg';

export default function Footer() {
  return (
    // <footer className="w-full lg:w-[63.5rem] lg:mx-auto xl:w-[79rem] 2xl:w-[88rem]">
    <footer className="w-full lg:w-[63.5rem] lg:mx-auto xl:w-[79rem] 2xl:w-[88rem] mt-10">
      <div className="max-w-screen mx-auto lg:w-3xl lg:ml-auto lg:mr-0 xl:mx-auto px-5">
        <hr className="w-full mb-10" />
        <div className="flex flex-row flex-wrap gap-5 justify-between items-center">
          <div className="grow flex flex-row gap-5 text-base text-btn font-semibold justify-center">
            <Link href="/profile" as="/profile">
              <a>
                <p>Profile</p>
              </a>
            </Link>
            <Link href="/series" as="/series">
              <a>
                <p>Series</p>
              </a>
            </Link>
            <Link href="/categories" as="/categories">
              <a>
                <p>Categories</p>
              </a>
            </Link>
            <Link href="/tags" as="/tags">
              <a>
                <p>Tags</p>
              </a>
            </Link>
            <Link href="/posts" as="/posts">
              <a>
                <p>Posts</p>
              </a>
            </Link>
          </div>
          <div className="grow flex flex-row justify-center items-center gap-3">
            <ContactList className=" text-2xl" />
            <Link href="/" as="/">
              <a className="h-[32px] w-[32px] cursor-pointer">
                <Image
                  src={MorooLogo}
                  alt="Moroo Logo"
                  layout="fixed"
                  objectFit="cover"
                  width={32}
                  height={32}
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="w-full text-center px-5 my-10">
          <span className="">© 2022 </span>
          <Link href="/profile" as="/profile">
            <a className="">moroo</a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
