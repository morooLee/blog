import React, { MouseEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useDarkModeContext } from 'src/lib/DarkModeContext';
import CopyToClipboardButton from '../CopyToClipboardButton';

export default function Button(props: any) {
  return props['data-clipboard'] ? (
    <CopyToClipboardButton {...props} />
  ) : (
    <button {...props} />
  );
}
