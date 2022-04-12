import React, { MouseEventHandler, ReactNode } from 'react';
import FoldingArrow from '../FoldingArrow';

interface Props {
  isFolding?: boolean;
  toggleFolding?: () => void;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export default function SectionSummary({
  isFolding,
  toggleFolding,
  children,
  onClick,
}: Props) {
  return (
    <div
      className={`w-full flex flex-row items-center justify-between p-5 gap-2 ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      {children}
      {isFolding !== undefined && toggleFolding !== undefined ? (
        <button
          onClick={toggleFolding}
          className="inline-block text-2xl"
          aria-label="Expend Button"
        >
          <FoldingArrow isFolding={isFolding} />
        </button>
      ) : null}
    </div>
  );
}
