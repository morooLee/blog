import React from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

interface Props {
  isFolding: boolean;
  className?: string;
}
export default function FoldingArrow({ isFolding, className }: Props) {
  return isFolding ? (
    <RiArrowDownSLine className={className} />
  ) : (
    <RiArrowUpSLine className={className} />
  );
}
