// import { createMedia } from '@artsy/fresnel';

// const ExampleAppMedia = createMedia({
//   breakpoints: {
//     xs: 0,
//     sm: 640,
//     md: 768,
//     lg: 1024,
//     xl: 1280,
//     '2xl': 1536,
//   },
// });

// // Generate CSS to be injected into the head
// export const mediaStyles = ExampleAppMedia.createMediaStyle();
// export const { Media, MediaContextProvider } = ExampleAppMedia;

import dynamic from 'next/dynamic';

const MediaQuery = dynamic(
  () => {
    return import('react-responsive');
  },
  { ssr: false }
);

export default MediaQuery;
