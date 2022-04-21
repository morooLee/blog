import { useRouter } from 'next/router';
import React, { CSSProperties, useEffect } from 'react';

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

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error: any) {
      console.error(error);
    }
  }, []);

  return (
    <div key={router.asPath.split('?')[0]}>
      <ins
        className={className ? `adsbygoogle ${className}` : 'adsbygoogle'}
        style={style ?? { display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-layout={adLayout}
        data-ad-layout-key={adLayoutKey}
        data-ad-format={adFormat ?? 'auto'}
        data-full-width-responsive={fullWidthResponsive ?? 'true'}
      ></ins>
    </div>
  );
}
