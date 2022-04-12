import React, { ReactNode } from 'react';

interface Props {
  condition: boolean;
  children: ReactNode;
}

export default function DataListContainer({ condition, children }: Props) {
  return condition ? (
    { children }
  ) : (
    <div className="w-full h-40 text-center bg-inset border rounded-md">
      <span className="mx-auto text-2xl leading-[10rem] align-middle font-semibold">
        검색 또는 필터 결과가 없습니다.
      </span>
    </div>
  );
}
