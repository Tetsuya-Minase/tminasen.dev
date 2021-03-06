import React from 'react';

import { HeaderComponent } from '../components/HeaderComponent';
import { FooterComponent } from '../components/FooterComponent';
import styled from 'styled-components';
import media from 'styled-media-query';
import { SubColumnComponent } from '../components/SubColumnComponent';
import { HeadComponent } from '../components/HeadComponent';
import { Maybe, Optional } from '../../types/utility';
import { ArticleMetaData, TagCount } from '../../types/article';

interface Props {
  title: Maybe<string>;
  metaData: ArticleMetaData[];
  isEnableViewPort: boolean;
  canonicalPath: Optional<string>;
  children: JSX.Element | JSX.Element[];
}

const BodyWrapper = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const ContentsWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: space-between;
  margin: 0 3rem;
  ${media.lessThan('small')`
    margin: 0 1rem;
    justify-content: center;
  `}
`;
const Main = styled.main`
  width: 80%;
  ${media.lessThan('small')`
    width: 100%;
  `}
`;

export const PageTemplate: React.FC<Props> = ({
  title,
  metaData,
  children,
  isEnableViewPort,
  canonicalPath
}) => {
  const tagCount = metaData
    .map(data => data.tag)
    .reduce((pre, cur) => [...pre, ...cur], [])
    .reduce((result: TagCount, tag, _, list) => {
      if (result[tag] == undefined) {
        result[tag] = list.filter(i => i === tag).length;
      }
      return result;
    }, {});

  return (
    <BodyWrapper>
      <HeadComponent title={title} additionalMetaData={undefined} description={undefined} isEnableViewPort={isEnableViewPort} canonicalPath={canonicalPath} />
      <HeaderComponent siteTitle="水無瀬のプログラミング日記" />
      <ContentsWrapper>
        <Main>{children}</Main>
        <SubColumnComponent tagCount={tagCount} />
      </ContentsWrapper>
      <FooterComponent />
    </BodyWrapper>
  );
};
