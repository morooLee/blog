import React, { MouseEvent } from 'react';
import { toast } from 'react-toastify';
import { useDarkModeContext } from 'src/lib/DarkModeContext';

interface Props {
  'data-clipboard': string;
}

export default function CopyToClipboardButton(props: Props) {
  const [isDarkMode] = useDarkModeContext();
  function handleOnClick(event: MouseEvent<HTMLButtonElement>) {
    const clipboard = event.currentTarget.getAttribute('data-clipboard');

    if (clipboard) {
      navigator.clipboard.writeText(clipboard);
      toast.success(`Copied 😀 to clipboard!`, {
        position: toast.POSITION.BOTTOM_CENTER,
        theme: isDarkMode ? 'dark' : 'light',
        autoClose: 1000,
        className: 'bg-btn border text-accent',
      });
    }
  }

  return (
    <button
      type="button"
      onClick={handleOnClick}
      data-clipboard={props['data-clipboard']}
      aria-label="clipboard"
    ></button>
  );
}
