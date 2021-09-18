import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import { LinkComponent } from './atoms/LinkComponent';
import { color } from '../styles/variable';

type Props = {
  siteTitle: string;
};

const Header = styled.header`
  background: ${color.headerBgBlue};
  //margin-bottom: 1.45rem;
`;
const Heading = styled.h1`
  margin: 0;
  font-size: 3.2rem;
  ${media.lessThan('small')`
    font-size: 2.4rem;
  `}
`;
const Wrapper = styled.div`
  max-width: 96rem;
  padding: 1.5rem 1.1rem;
`;

export const HeaderComponent: React.FC<Props> = ({ siteTitle }) => (
  <Header>
    <Wrapper>
      <Heading>
        <LinkComponent url="/" color="white">
          {siteTitle}
        </LinkComponent>
      </Heading>
    </Wrapper>
  </Header>
);
