import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Table({ children }: Props) {
  return (
    <div className="overflow-y-auto">
      {children ? <table>{children}</table> : null}
    </div>
  );
}
