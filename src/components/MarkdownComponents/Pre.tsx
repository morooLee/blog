import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';
import vsLight from 'prism-react-renderer/themes/vsLight';
import { useDarkModeContext } from '../../lib/DarkModeContext';

interface Props {
  children: any;
  className: string;
}
export default function Pre({ children, className }: Props) {
  const [isDarkMode] = useDarkModeContext();
  let language: Language | undefined = undefined;

  if (className) {
    language = className.replace(/language-/, '') as Language;
  }
  return (
    <Highlight
      {...defaultProps}
      theme={isDarkMode ? vsDark : vsLight}
      code={children.props.children.trim()}
      language={language ?? 'bash'}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          lang={language}
          // className={`${className} rounded-lg border my-5 overflow-y-auto`}
          // style={{
          //   ...style,
          //   padding: '1.25rem',
          //   marginTop: '1.25rem',
          //   marginBottom: '1.25rem',
          //   backgroundColor: 'var(--color-bg-inset)',
          // }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
