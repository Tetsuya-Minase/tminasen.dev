import React, { useMemo } from 'react';
import { ImageValue, Maybe } from '../../types/utility';
import styled from 'styled-components';
import { Image } from './ImageComponent';
import { graphql, useStaticQuery } from 'gatsby';
import { TwitterIconQuery } from '../../types/graphql-types';

type Props = {
  title: Maybe<string>;
};

const TweetButtonWrapper = styled.div`
  display: inline-block;
  margin: 0 0 1rem 0.5rem;
`;
const TweetButton = styled.a`
  display: block;
  height: 4rem;
  width: 4rem;
`;

const useFetchingTwitterIcon = (): Maybe<ImageValue> => {
  const twitterIcon: TwitterIconQuery = useStaticQuery(graphql`
    query TwitterIcon {
      imageSharp(fixed: { originalName: { eq: "TwitterSocialIcon.png" } }) {
        fluid {
          aspectRatio
          src
          srcSet
          sizes
        }
      }
    }
  `);
  return twitterIcon?.imageSharp?.fluid;
};

export const TwitterShareButton: React.FC<Props> = ({ title }) => {
  const shareText = useMemo(() => {
    const message = `${title}\n#水無瀬のプログラミング日記`;
    return encodeURIComponent(message);
  }, [title]);
  const twitterIcon: Maybe<ImageValue> = useFetchingTwitterIcon();
  if (twitterIcon == undefined) {
    return null;
  }
  return (
    <TweetButtonWrapper>
      <TweetButton
        href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(
          window.location.href,
        )}`}
      >
        <Image image={twitterIcon} />
      </TweetButton>
    </TweetButtonWrapper>
  );
};
