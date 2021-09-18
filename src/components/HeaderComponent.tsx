import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import { LinkComponent } from './atoms/LinkComponent';
import { color, fontSize } from '../styles/variable';

type Props = {
  siteTitle: string;
};

const Header = styled.header`
  display: flex;
  background: ${color.headerBgBlue};
  max-height: 64px;
  align-items: center;
  justify-content: center;
`;
const Heading = styled.h1`
  font-size: ${fontSize.px32};
  line-height: 1.5;
  ${media.lessThan('small')`
    font-size: ${fontSize.px24};
  `}
`;

export const HeaderComponent: React.FC<Props> = ({ siteTitle }) => (
  <Header>
    <Heading>
      <LinkComponent url="/" color="white">
        {siteTitle}
      </LinkComponent>
    </Heading>
  </Header>
);
