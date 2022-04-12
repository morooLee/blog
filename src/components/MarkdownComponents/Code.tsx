import React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';
import vsLight from 'prism-react-renderer/themes/vsLight';
import { useDarkModeContext } from '../../lib/DarkModeContext';

interface Props {
  children: any;
  className: string;
}
export default function Code({ children, className }: Props) {
  return <code className={'inline-code ' + className}>{children}</code>;
}
