import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  title: string;
  children?: ReactNode;
}

export default function Location({ title, children }: Props) {
  const router = useRouter();
  const paths = decodeURI(router.asPath)
    .split('#')[0]
    .split('?')[0]
    .split('/')
    .filter((path) => path);

  return (
    <>
      <nav className="px-5 flex flex-row items-center font-semibold text-sm">
        <Link href="/" as="/">
          <a>
            <p title="home" className=" text-xl">
              🏠
            </p>
          </a>
        </Link>
        {paths.map((path, index, array) => {
          if (array.length === 0) {
            return null;
          }
          const link = array.slice(0, index + 1).join('/');

          return path ? (
            <Link key={path} href={`/${link}`} as={`/${link}`}>
              <a className="before:content-['›'] before:text-muted before:mx-2">
                <p title={path} className="inline">
                  {path}
                </p>
              </a>
            </Link>
          ) : null;
        })}
      </nav>
      {children ? (
        <div className="px-5 text-3xl font-extrabold">{children}</div>
      ) : (
        <h1 className="px-5 text-3xl font-extrabold">{title}</h1>
      )}
    </>
  );
}
