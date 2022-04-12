import React, { ChangeEventHandler } from 'react';
import { RiSearch2Line } from 'react-icons/ri';

interface Props {
  placeholder?: string;
  dataList: { key: string; value: string | number; text: string }[];
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function SearchInput({
  placeholder,
  dataList,
  onChange,
}: Props) {
  return (
    <div className="flex flex-row gap-1 items-center">
      <label
        htmlFor="search"
        className="cursor-pointer text-2xl transform transition-transform duration-200 hover:scale-125 hover:opacity-70"
      >
        <RiSearch2Line />
      </label>
      <input
        type="search"
        list="search-data"
        id="search"
        name="search"
        className=" w-44 appearance-none px-2 py-1 bg-btn rounded border leading-tight focus:outline-none focus:border-accent placeholder:text-sm"
        placeholder={placeholder}
        onChange={onChange}
      ></input>
      {dataList ? (
        <datalist id="search-data">
          {dataList.map(({ key, value, text }) => {
            return (
              <option key={key} value={value}>
                {text}
              </option>
            );
          })}
        </datalist>
      ) : null}
    </div>
  );
}
