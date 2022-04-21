import React, { useEffect, useRef, useState } from 'react';

type Type =
  | 'pathname'
  | 'url'
  | 'title'
  | 'og:title'
  | 'specific-term'
  | 'issue-number';

type Theme =
  | 'github-light'
  | 'github-dark'
  | 'preferred-color-scheme'
  | 'github-dark-orange'
  | 'icy-dark'
  | 'dark-blue'
  | 'photon-dark'
  | 'boxy-light'
  | 'gruvbox-dark';

interface Props {
  className?: string;
  src?: string;
  repo: string;
  type: Type;
  specificTerm?: string;
  issueNumber?: number;
  label?: string;
  theme: Theme;
  crossorigin?: 'anonymous';
  async?: boolean;
}

export default function ReactUtterances(props: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const scriptRef = useRef<HTMLDivElement>(null);
  const {
    className,
    src,
    repo,
    theme,
    crossorigin,
    async,
    type,
    specificTerm,
    issueNumber,
  } = props;

  useEffect(() => {
    const rootElement = scriptRef.current;
    const scriptElement = document.createElement('script');
    scriptElement.src = src ?? 'https://utteranc.es/client.js';
    scriptElement.async = async ?? true;
    scriptElement.setAttribute('repo', repo);
    scriptElement.setAttribute('theme', theme);
    scriptElement.setAttribute('crossorigin', crossorigin ?? 'anonymous');

    switch (type) {
      case 'issue-number': {
        if (issueNumber === undefined) {
          throw new Error('');
        }
        scriptElement.setAttribute('issue-number', String(issueNumber));
        break;
      }
      case 'specific-term': {
        if (specificTerm === undefined) {
          throw new Error('');
        }
        scriptElement.setAttribute('issue-term', specificTerm);
        break;
      }
      default: {
        scriptElement.setAttribute('issue-term', type);
      }
    }
    scriptElement.onload = () => {
      const iframe =
        document.querySelector<HTMLIFrameElement>('.utterances-frame');

      if (iframe) {
        iframe.onload = () => {
          setIsLoading(false);
        };
      }
    };
    if (rootElement) {
      rootElement.appendChild(scriptElement);
    }

    return () => {
      if (!isLoading && rootElement && rootElement.firstChild) {
        rootElement.firstChild.remove();
      }
      // if (rootElement?.children) {
      //   for (const child of rootElement?.children) {
      //     child.remove();
      //   }
      // }
      // const container = document.querySelector<HTMLDivElement>('.utterances');
      // if (container) {
      //   console.log(container);
      //   container.remove();
      // }
    };
  }, []);

  useEffect(() => {
    const changeTheme = (theme: Theme = 'github-light') => {
      const iframe =
        document.querySelector<HTMLIFrameElement>('.utterances-frame');

      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          { type: 'set-theme', theme },
          'https://utteranc.es'
        );
      }
    };

    if (!isLoading) {
      changeTheme(theme);
    }
  }, [theme, isLoading]);

  return (
    <div
      className={
        className
          ? `react-utterances ${theme} ${className}`
          : `react-utterances ${theme}`
      }
      ref={scriptRef}
    >
      {isLoading ? <div>Loading script...</div> : null}
    </div>
  );
}
