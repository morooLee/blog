import React from 'react';

export interface TocItemProps {
  className: string;
  children: JSX.Element | JSX.Element[];
}
export function TocItem({ className, children }: TocItemProps) {
  const key: string = Array.isArray(children)
    ? children[0].props.href
    : children.props.href;
  return (
    <li key={key.replace('#', '')} className={`${className} text-sm`}>
      {children}
    </li>
  );
}
