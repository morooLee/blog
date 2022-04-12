import React, { ReactNode } from 'react';

interface Props {
  isFolding: boolean;
  children: ReactNode;
}
export default function SectionContent({ isFolding, children }: Props) {
  return !isFolding ? (
    <>
      <hr className="mx-5" />
      {children}
    </>
  ) : null;
}
