import React from 'react';
import Anchor from './Anchor';
import Button from './Button';
import Code from './Code';
import Pre from './Pre';
import Table from './Table';

const MarkdownComponents = {
  pre: (props: any) => <Pre {...props} />,
  // code: (props: any) => <Code {...props} />,
  inlineCode: (props: any) => <Code {...props} />,
  table: (props: any) => <Table {...props} />,
  a: (props: any) => <Anchor {...props} />,
  button: (props: any) => <Button {...props} />,
  blockquote: (props: any) => <blockquote className="break-all" {...props} />,
};
export default MarkdownComponents;
