import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import fetch from 'cross-fetch';
import { getRandomPastelColor } from './utils';

interface CreatePostCoverImageOptions {
  dir: string;
  title: string;
  coverImagePath?: string | null;
  coverImageUrl?: string | null;
  coverBackgroundColor?: string | null;
  series?: {
    name: string;
    number: number;
  } | null;
}

export function createBlogCoverImage() {
  const rootDir = path.join(process.cwd(), 'public/assets');
  const blogImageFileName = 'blog-cover-image.jpeg';
  const blogImagePath = path.join(rootDir, blogImageFileName);

  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
  }
  if (!fs.existsSync(blogImagePath)) {
    sharp({
      create: {
        width: 1200,
        height: 1200,
        channels: 4,
        background: '#000000',
      },
    })
      .composite([
        {
          input: path.join(
            process.cwd(),
            'public/assets/blog-background-image.svg'
          ),
        },
      ])
      .jpeg()
      .toFile(blogImagePath)
      .then(() => {
        console.log('RESULT', blogImagePath);
      })
      .catch((error: any) => console.error(error));
  }
}
export function createSeriesCoverImage(name: string) {
  const rootDir = path.join(process.cwd(), 'public/assets/series');
  const coverImageFileName = 'series-cover-image.jpeg';
  const sourceImageFilePrefix = 'series-cover-source-image';
  const coverImagePath = path.join(rootDir, name, coverImageFileName);

  if (fs.existsSync(coverImagePath)) {
    console.log(`${name} series cover image is exists`);
    return;
  }
  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
  }
  if (!fs.existsSync(path.join(rootDir, name))) {
    fs.mkdirSync(path.join(rootDir, name));
  }

  const sourceImageFileName = fs
    .readdirSync(path.join(rootDir, name))
    .find((file) => file.split('.')[0] === sourceImageFilePrefix);

  if (sourceImageFileName) {
    sharp({
      create: {
        width: 1200,
        height: 1200,
        channels: 4,
        background: '#ffffff',
      },
    })
      .composite([
        {
          input: path.join(rootDir, name, sourceImageFileName),
        },
      ])
      .jpeg()
      .toFile(coverImagePath)
      .then(() => {
        console.log('RESULT', coverImagePath);
      })
      .catch((error: any) => console.error(error));
  } else {
    const svg = createSVG({ series: name, fontSize: 90 });

    sharp(path.join(process.cwd(), 'public/assets/moroo.png'))
      .resize(240, 240)
      .toBuffer()
      .then((logo) => {
        sharp(Buffer.from(svg))
          .composite([
            {
              input: logo,
              top: 480,
              left: 860,
            },
          ])
          .jpeg()
          .toFile(coverImagePath)
          .then(() => {
            console.log('RESULT', coverImagePath);
          })
          .catch((error: any) => console.error(error));
      });
  }
}
export default function createPostCoverImage(
  options: CreatePostCoverImageOptions
) {
  const rootDir = path.join(process.cwd(), 'public/assets/posts');
  const postDir = path.join(rootDir, options.dir);
  const postImagePath = path.join(postDir, 'post-cover-image.jpeg');

  if (options.series) {
    return;
  }

  if (fs.existsSync(postImagePath)) {
    console.log(`${options.title}'s cover image is exists`);
    return;
  }

  if (!fs.existsSync(rootDir)) {
    fs.mkdirSync(rootDir);
  }

  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir);
  }

  if (options.coverImagePath) {
    console.log(path.join(process.cwd(), options.coverImagePath));
    sharp({
      create: {
        width: 1200,
        height: 1200,
        channels: 4,
        background: options.coverBackgroundColor ?? '#ffffff',
      },
    })
      .composite([
        {
          input: path.join(process.cwd(), 'public', options.coverImagePath),
        },
      ])
      .jpeg()
      .toFile(postImagePath)
      .then(() => {
        console.log('RESULT', postImagePath);
      })
      .catch((error: any) => console.error(error));
    return;
  }

  if (options.coverImageUrl) {
    fetch(options.coverImageUrl)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const buffer = Buffer.from(new Uint8Array(arrayBuffer));

        sharp({
          create: {
            width: 1200,
            height: 1200,
            channels: 4,
            background: options.coverBackgroundColor ?? '#ffffff',
          },
        })
          .composite([
            {
              input: buffer,
            },
          ])
          .jpeg()
          .toFile(postImagePath)
          .then(() => {
            console.log('RESULT', postImagePath);
          })
          .catch((error: any) => console.error(error));
      })
      .catch((error) => console.log('error:', error));
    return;
  }

  const svg = createSVG({ title: options.title });

  sharp(path.join(process.cwd(), 'public/assets/moroo.png'))
    .resize(240, 240)
    .toBuffer()
    .then((logo) => {
      sharp(Buffer.from(svg))
        .composite([
          {
            input: logo,
            top: 480,
            left: 860,
          },
        ])
        .jpeg()
        .toFile(postImagePath)
        .then(() => {
          console.log('RESULT', postImagePath);
        })
        .catch((error: any) => console.error(error));
    })
    .catch((error: any) => console.error(error));
}

interface IOptions {
  title?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  series?: string;
}

export function createSVG({
  title,
  width = 1200,
  height = 1200,
  fontSize = 60,
  series,
}: IOptions) {
  const lineBreaksForWords: string[] = [];

  if (series) {
    lineBreaksForWords.push('SERIES');
  }

  const words = series ? series.split(' ') : title?.split(' ');

  if (words) {
    words.reduce((pre: string, cur: string, index, array) => {
      const merge = (pre ? pre + ' ' : '') + cur;

      if (merge.length > 16) {
        lineBreaksForWords.push(pre + ' ');
        if (array.length - 1 === index) {
          lineBreaksForWords.push(cur);
        }
        return cur;
      } else {
        if (array.length - 1 === index) {
          lineBreaksForWords.push(merge);
        }
        return merge;
      }
    }, '');
  }

  const textSpanList = lineBreaksForWords.map((word, index, array) => {
    const isEven = array.length % 2 === 0;
    const middleIndex = Math.ceil(array.length / 2) - 1;
    const lineBreakIndex = -(middleIndex - index);
    const fontHeight = fontSize;
    let dy = 0;

    if (isEven) {
      switch (true) {
        case lineBreakIndex < 0: {
          dy = -(fontHeight / 2) + lineBreakIndex * fontHeight;
          break;
        }
        case lineBreakIndex === 0: {
          dy = -(fontHeight / 2);
          break;
        }
        case lineBreakIndex === 1: {
          dy = fontHeight / 2;
          break;
        }
        case lineBreakIndex > 1: {
          dy = fontHeight / 2 + (lineBreakIndex - 1) * fontHeight;
          break;
        }
      }
    } else {
      dy = lineBreakIndex * fontHeight;
    }
    return series
      ? `<tspan x="68%" y="52%" dy="${
          dy + 'px'
        }" text-anchor="end" alignment-baseline="middle" class="${
          index === 0 ? 'series-label' : 'series-name'
        } font-sans">${word}</tspan>`
      : `<tspan x="68%" y="52%" dy="${
          dy + 'px'
        }" text-anchor="end" alignment-baseline="middle" class="title font-sans">${word}</tspan>`;
  });

  const svg = `
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${width} ${height}">
    <style>
      .font-sans { font-family: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"; }
      .title { fill: #21262d; font-size: ${fontSize}px; font-weight: 900;}
      .series-label { fill: #21262d; font-size: ${
        (fontSize / 3) * 2
      }px; font-weight: 100;}
      .series-name { fill: #000000; font-size: ${fontSize}px; font-weight: 900;}
    </style>
    <rect x="0" y="0" width="${width}" height="${height}" fill="${getRandomPastelColor()}"></rect>
    <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle">${textSpanList.join(
      ''
    )}</text>
  </svg>
  `;
  return svg;
}

interface CreateImageOptions {
  width: number;
  height: number;
  backgroundColor: string;
  backgroundImage: {
    path: string;
    width: number;
    height: number;
    positionX: number;
    positionY: number;
  };
  lineBreakeNumber: number;
  title: {
    text: string;
    style: React.CSSProperties;
    className: string;
  }[];
}
