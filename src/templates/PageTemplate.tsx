import React from 'react';

import { HeaderComponent } from '../components/HeaderComponent';
import { FooterComponent } from '../components/FooterComponent';
import styled from 'styled-components';
import media from 'styled-media-query';
import { HeadComponent } from '../components/HeadComponent';
import { Maybe, Optional } from '../../types/utility';
import { color } from '../styles/variable';
import { OgType } from '../../types/mets';

interface Props {
  title: Maybe<string>;
  isEnableViewPort: boolean;
  canonicalPath: Optional<string>;
  children: JSX.Element | JSX.Element[];
  ogType: OgType;
}

const BodyWrapper = styled.div`
  background-color: ${color.bgGray};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 1064px;
  ${media.lessThan('small')`
    min-width: 345px;
  `}
`;
const ContentsWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  justify-content: space-between;
  margin: 20px 8px 0;
  ${media.lessThan('small')`
    margin: 20px 4px 0;
    justify-content: center;
  `}
`;
const Main = styled.main`
  width: 100%;
`;

export const PageTemplate: React.FC<Props> = ({
  title,
  children,
  isEnableViewPort,
  canonicalPath,
  ogType,
}) => {
  return (
    <BodyWrapper>
      <HeadComponent
        title={title}
        additionalMetaData={undefined}
        description={undefined}
        isEnableViewPort={isEnableViewPort}
        canonicalPath={canonicalPath}
        ogType={ogType}
      />
      <HeaderComponent siteTitle="水無瀬のプログラミング日記" />
      <ContentsWrapper>
        <Main>{children}</Main>
      </ContentsWrapper>
      <FooterComponent />
    </BodyWrapper>
  );
};
