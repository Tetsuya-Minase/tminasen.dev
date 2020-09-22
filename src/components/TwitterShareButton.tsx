import React, { useMemo } from 'react';
import { Maybe } from '../../types/utility';

type Props = {
  title: Maybe<string>;
};

export const TwitterShareButton: React.FC<Props> = ({ title }) => {
  const shareText = useMemo(() => {
    return `${title}\n#水無瀬のプログラミング日記`;
  }, [title]);
  return (
    <>
      <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        className="twitter-share-button"
        data-show-count="false"
        data-text={shareText}
        data-lang="ja"
      >
        Tweet
      </a>
    </>
  );
};
