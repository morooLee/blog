import React from 'react';

interface Props {}

export default function NoDateMessage({}: Props) {
  return (
    <div className="w-full h-40 text-center bg-inset border rounded-md">
      <span className="mx-auto text-2xl leading-[10rem] align-middle font-semibold">
        검색 또는 필터 결과가 없습니다.
      </span>
    </div>
  );
}
