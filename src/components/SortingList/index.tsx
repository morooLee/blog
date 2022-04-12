/* eslint-disable react-hooks/exhaustive-deps */
import React, { MouseEvent, useEffect, useState } from 'react';

type Sort = 'recent' | 'name' | 'posts' | 'number';
interface Props {
  defaultSortType: Sort;
  useSortTypes: Sort[];
  data: BlogDataType[];
  handleDataSortingFunc: any;
}

export default function SortingList({
  defaultSortType,
  useSortTypes,
  data,
  handleDataSortingFunc,
}: Props) {
  const [sort, setSort] = useState<Sort>(defaultSortType);
  function getSortTitle(sort: Sort) {
    switch (sort) {
      case 'recent': {
        return '최신 순';
      }
      case 'name': {
        return '이름 순';
      }
      case 'posts': {
        return '포스트 많은 순';
      }
      case 'number': {
        return '시리즈 순';
      }
    }
  }

  function handleSortInputOnClick(event: MouseEvent<HTMLInputElement>) {
    const value = event.currentTarget.value as Sort;
    setSort(value);
  }

  function sortingData(data: BlogDataType[]) {
    const sortData = [...data];

    switch (sort) {
      case 'recent': {
        sortData.sort((a, b) => {
          if ('updatedAt' in a && 'updatedAt' in b) {
            return new Date(a.updatedAt) > new Date(b.updatedAt) ? -1 : 1;
          }
          return 0;
        });
        break;
      }
      case 'name': {
        sortData.sort((a, b) => {
          if ('title' in a && 'title' in b) {
            return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
          } else if ('name' in a && 'name' in b) {
            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
          }
          return 0;
        });
        break;
      }
      case 'posts': {
        sortData.sort((a, b) => {
          if ('postIds' in a && 'postIds' in b) {
            return a.postIds.length > b.postIds.length ? -1 : 1;
          }
          return 0;
        });
        break;
      }
      case 'number': {
        sortData.sort((a, b) => {
          if ('series' in a && 'series' in b) {
            if (a.series && b.series) {
              return a.series.number < b.series.number ? -1 : 1;
            }
            return 0;
          }
          return 0;
        });
        break;
      }
    }

    return sortData;
  }

  useEffect(() => {
    function translateForCompare(data: BlogDataType[]) {
      return JSON.stringify(
        data.map((item) => {
          if ('name' in item) {
            return item.name;
          }
          return item.title;
        })
      );
    }
    const sortedData = sortingData(data);

    if (translateForCompare(sortedData) === translateForCompare(data)) {
      return;
    }
    handleDataSortingFunc([...sortingData(data)]);
  }, [data]);

  useEffect(() => {
    handleDataSortingFunc([...sortingData(data)]);
  }, [sort]);

  return (
    <div>
      {useSortTypes.map((sort) => {
        return (
          <div
            key={sort}
            className="inline-block after:content-['|'] after:text-muted after:mx-2 last:after:content-none"
          >
            <input
              value={sort}
              hidden
              defaultChecked={defaultSortType === sort ? true : false}
              type="radio"
              name="sort"
              id={`sort-${sort}`}
              onClick={handleSortInputOnClick}
              className="peer"
            />
            <label
              htmlFor={`sort-${sort}`}
              className="text-xs text-muted cursor-pointer peer-checked:font-bold peer-checked:text-accent hover:text-accent"
            >
              {getSortTitle(sort)}
            </label>
          </div>
        );
      })}
    </div>
  );
}
