import React, { MouseEventHandler } from 'react';
import FoldingArrow from '../FoldingArrow';

interface Props {
  onClick: MouseEventHandler<HTMLDivElement>;
  isFolding: boolean;
}

export default function AllFoldingButton({ onClick, isFolding }: Props) {
  return (
    <div onClick={onClick} className="group hover:cursor-pointer">
      <span className="inline-block text-sm group-hover:text-accent">
        {isFolding ? '모두 펼치기' : '모두 접기'}
      </span>
      <FoldingArrow
        isFolding={isFolding}
        className="inline-block text-2xl group-hover:text-accent"
      />
    </div>
  );
}
