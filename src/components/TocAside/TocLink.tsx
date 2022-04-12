import React, { ReactNode, MouseEvent } from 'react';
import Link from 'next/link';
import { UrlObject } from 'url';

interface Props {
  isActive?: boolean;
  href: string | UrlObject;
  as?: string & (string | UrlObject);
  className?: string;
  children: ReactNode;
}
export function TocLink({ isActive, href, as, className, children }: Props) {
  function handleOnClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    const hash = decodeURI(event.currentTarget.hash);
    document.querySelector(hash)?.scrollIntoView({
      behavior: 'smooth',
    });
  }
  return (
    <Link href={href} as={as}>
      <a
        onClick={handleOnClick}
        className={`${className ?? ''} inline-block pl-2 align-top text-muted ${
          isActive ? 'active' : ''
        }`}
      >
        <p title={children as string} className="text-ellipsis overflow-hidden">
          {children}
        </p>
      </a>
    </Link>
  );
}
