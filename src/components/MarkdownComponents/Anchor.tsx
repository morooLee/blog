import React, { MouseEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useDarkModeContext } from 'src/lib/DarkModeContext';

export default function Anchor(props: any) {
  const [isDarkMode] = useDarkModeContext();
  function handleOnClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    navigator.clipboard.writeText(event.currentTarget.href);
    toast.success('Copied link to clipboard!', {
      position: toast.POSITION.BOTTOM_CENTER,
      theme: isDarkMode ? 'dark' : 'light',
      autoClose: 1000,
      className: 'bg-btn border text-accent',
    });
  }

  return props['aria-hidden'] ? (
    <a onClick={handleOnClick} {...props} />
  ) : (
    <a {...props} />
  );
}
