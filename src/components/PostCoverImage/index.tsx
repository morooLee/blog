import React, { useEffect } from 'react';
import Image from 'next/image';
// import Img from 'react-optimized-image';
// import createSVGCoverImage from 'src/lib/createSVGCoverImage';

interface Props {
  isLarge: boolean;
  title: string;
  coverImageUrl: string;
  coverBackgroundColor?: string;
}

const LARGE_WIDTH = 686;
const LARGE_HEIGHT = 361;
const DEFAULT_WIDTH = 246;
const DEFAULT_HEIGHT = 129;

export default function PostCoverImage({
  isLarge,
  coverImageUrl,
  coverBackgroundColor,
  title,
}: Props) {
  const fontSizeForRem = isLarge ? 2.25 : 0.875;
  const width = isLarge ? LARGE_WIDTH : DEFAULT_WIDTH;
  const height = isLarge ? LARGE_HEIGHT : DEFAULT_HEIGHT;
  const words = title.split(' ');
  const coverWords: string[] = [];

  words.reduce((pre: string, cur: string, index, array) => {
    const merge = (pre ? pre + ' ' : '') + cur;

    if (merge.length > 16) {
      coverWords.push(pre + ' ');
      if (array.length - 1 === index) {
        coverWords.push(cur);
      }
      return cur;
    } else {
      if (array.length - 1 === index) {
        coverWords.push(merge);
      }
      return merge;
    }
  }, '');

  const path = require(`${coverImageUrl}?width=686&height=361`);
  const source = require(`${coverImageUrl}?width=686&height=361`);

  return (
    <div className="rounded-md">
      <Image
        src={coverImageUrl}
        alt={`${title} Cover Image`}
        className={`object-cover`}
        width={width}
        height={height}
        priority={true}
        quality={80}
      />
      {/* <Img
        src={require(`../../public/assets/posts/${source}`)}
        width={width}
        height={height}
      /> */}
      {/* <img
        src={`${coverImageUrl}?width=${width}&height=${height}`}
        alt={`${title} Cover Image`}
        width={width}
        height={height}
      /> */}
    </div>
    // <img
    //   src={coverImageUrl}
    //   alt={`${title} Cover Image`}
    //   className={`object-fill rounded-md`}
    //   // style={{ width, height }}
    //   width={width}
    //   height={height}
    // />
  );
}
