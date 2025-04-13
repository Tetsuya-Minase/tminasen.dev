import { FC, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  url: string;
  color: 'white' | 'black';
  children: ReactNode;
}

const getLinkColor = (linkColor: 'white' | 'black'): string => {
  switch (linkColor) {
    case 'white':
      return 'text-neutral-100';
    case 'black':
      return 'text-(--base-color-text)';
    default:
      const _invalidColor: never = linkColor;
      console.error(`${_invalidColor} is invalid.`);
      return 'text-(--base-color-text)';
  }
};

export const LinkComponent: FC<Props> = ({ url, color, children }) => {
  return (
    <Link className={`no-underline ${getLinkColor(color)}`} href={url}>
      {children}
    </Link>
  );
};
