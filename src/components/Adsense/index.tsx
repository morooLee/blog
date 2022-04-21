import { useRouter } from 'next/router';
import Script from 'next/script';
import React, {
  ChangeEvent,
  CSSProperties,
  DetailedHTMLProps,
  InsHTMLAttributes,
  useEffect,
  useState,
} from 'react';

declare global {
  interface Window {
    adsbygoogle: { [key: string]: unknown }[];
  }
}

type AdFormatType =
  | 'auto'
  | 'fluid'
  | 'rectangle'
  | 'vertical'
  | 'horizontal'
  | 'autorelaxed';
type AdLayoutType = 'in-article';

interface Props {
  id?: string;
  className?: string;
  style?: CSSProperties;
  adClient: string;
  adSlot: string | number;
  adLayout?: AdLayoutType;
  adLayoutKey?: string;
  adFormat?: AdFormatType;
  fullWidthResponsive?: boolean;
}

export default function Adsense({
  id,
  className,
  style,
  adClient,
  adSlot,
  adLayout,
  adLayoutKey,
  adFormat,
  fullWidthResponsive,
}: Props) {
  const router = useRouter();

  function pushAds(event: ChangeEvent<HTMLModElement>) {
    const element = event.target;
    if (element.style.display === 'block') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error: any) {
        console.error(error);
      }
    }
  }
  useEffect(() => {
    const asideAd = document.getElementById('aside-ad-slot');

    if (asideAd) {
      const compStyles = window.getComputedStyle(asideAd);

      console.log(compStyles.getPropertyValue('display'));

      if (compStyles.getPropertyValue('display') !== 'none') {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error: any) {
          console.error(error);
        }
      }
    }
  }, []);

  return (
    <ins
      id={id}
      key={router.asPath.split('?')[0]}
      className={className ? `adsbygoogle ${className}` : 'adsbygoogle'}
      style={style ?? { width: '100%' }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-layout={adLayout}
      data-ad-layout-key={adLayoutKey}
      data-ad-format={adFormat ?? 'auto'}
      data-full-width-responsive={fullWidthResponsive ?? 'true'}
    ></ins>
  );
}
