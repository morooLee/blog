import Link from 'next/link';
import React from 'react';
import {
  RiFacebookBoxFill,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiMailFill,
  RiRssFill,
} from 'react-icons/ri';

interface Props {
  className?: string;
}
export default function ContactList({ className }: Props) {
  return (
    <address className={className}>
      <ul className="list-none flex flex-row gap-1 items-center text-2xl">
        <li className="list-none text-icon">
          <a
            href="https://github.com/morooLee"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiGithubFill aria-label="Github Link" />
          </a>
        </li>
        <li className="list-none text-icon">
          <a
            href="https://www.linkedin.com/in/moroo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiLinkedinBoxFill aria-label="Linkedin Link" />
          </a>
        </li>
        {/* <li className="list-none text-icon">
          <Link href="/rss/feed.xml" as="/rss/feed.xml">
            <a>
              <RiRssFill aria-label="Feed Subscribe" />
            </a>
          </Link>
        </li> */}
        <li className="list-none text-icon">
          <a
            href="https://www.facebook.com/moroo.lee"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiFacebookBoxFill aria-label="Feed Subscribe" />
          </a>
        </li>
        <li className="list-none text-icon">
          <a href="mailto:moroo.lee@gmail.com">
            <RiMailFill aria-label="G-Mail Address" />
          </a>
        </li>
      </ul>
    </address>
  );
}
