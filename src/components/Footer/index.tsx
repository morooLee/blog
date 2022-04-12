import React from 'react';
import Link from 'next/link';
import ContactList from '../ContactList';
import Image from 'next/image';
// import Img from 'react-optimized-image';
import MorooLogo from 'public/assets/moroo.svg';

export default function Footer() {
  return (
    <footer className="w-full lg:w-[63.5rem] lg:mx-auto xl:w-[79rem] 2xl:w-[88rem]">
      <div className="h-full lg:max-w-[63.5rem] 2xl:max-w-[68rem] flex flex-row justify-end items-center gap-3 mr-auto p-5">
        <ContactList />
        <p>@moroo</p>
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
    </footer>
  );
}
