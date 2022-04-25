import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  RiFacebookFill,
  RiFileCopyFill,
  RiLinkedinFill,
  RiMenuFill,
  RiMoonLine,
  RiRssFill,
  RiShareBoxFill,
  RiSunLine,
  RiTwitterFill,
} from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useDarkModeContext } from 'src/lib/DarkModeContext';
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from 'react-share';

interface Props {
  isOpen: boolean;
  handleOnClickOpenButton: () => void;
}
export default function ShareSNS({ isOpen, handleOnClickOpenButton }: Props) {
  const router = useRouter();
  const [isDarkMode] = useDarkModeContext();
  const url = decodeURI(`https://blog.moroo.dev${router.asPath}`);

  function handleOnclickTwitterButton() {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}`,
      '_blank'
    );
  }
  function handleOnclickClipboardButton() {
    navigator.clipboard.writeText(
      decodeURI(`https://blog.moroo.dev${router.asPath}`)
    );
    toast.success(
      <>
        <p>Copied link to clipboard!</p>
        <p>{url}</p>
      </>,
      {
        position: toast.POSITION.TOP_CENTER,
        theme: isDarkMode ? 'dark' : 'light',
        autoClose: 3000,
        className: 'bg-btn border text-accent',
      }
    );
    handleOnClickOpenButton();
  }
  return (
    <div className="leading-[0px] relative">
      <button onClick={handleOnClickOpenButton}>
        <RiShareBoxFill aria-label="SNS Share" />
      </button>
      {isOpen ? (
        <div className="w-36 bg-header text-header-logo absolute top-12 -left-16 flex flex-col gap-3 lg:gap-2 content-center justify-start justify-items-start p-2 border rounded-md">
          <FacebookShareButton
            className="group inline-block text-left"
            url={url}
          >
            <RiFacebookFill
              aria-label="Share Facebook"
              className="inline-block group-hover:text-link-accent"
            />
            <span className="align-middle text-base group-hover:text-link-accent ml-2">
              Facebook
            </span>
          </FacebookShareButton>
          {/* <button className="group inline-block text-left">
            <RiFacebookFill
              aria-label="Share Facebook"
              className="inline-block group-hover:text-link-accent"
            />
            <span className="align-middle text-base group-hover:text-link-accent ml-2">
              Facebook
            </span>
          </button> */}
          <TwitterShareButton
            className="group inline-block text-left"
            url={encodeURI(url)}
          >
            <RiTwitterFill
              aria-label="Share Twitter"
              className="inline-block group-hover:text-link-accent"
            />
            <span className="align-middle text-base group-hover:text-link-accent ml-2">
              Twitter
            </span>
          </TwitterShareButton>
          <LinkedinShareButton
            className="group inline-block text-left"
            url={url}
            title="타이틀"
            summary="설명"
            source="https://blog.moroo.dev"
          >
            <RiLinkedinFill
              aria-label="Share Linkedin"
              className="inline-block group-hover:text-link-accent"
            />
            <span className="align-middle text-base group-hover:text-link-accent ml-2">
              Linkedin
            </span>
          </LinkedinShareButton>
          {/* <button
            className="group inline-block text-left"
            onClick={handleOnclickTwitterButton}
          >
            <RiLinkedinFill
              aria-label="Share Linkedin"
              className="inline-block group-hover:text-link-accent"
            />
            <span className="align-middle text-base group-hover:text-link-accent ml-2">
              Linkedin
            </span>
          </button> */}
          <button
            className="group inline-block text-left"
            onClick={handleOnclickClipboardButton}
          >
            <RiFileCopyFill
              aria-label="Copy Clipboard"
              className="inline-block group-hover:text-link-accent"
            />
            <span className="inline-block text-base group-hover:text-link-accent ml-2">
              Clipboard
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
