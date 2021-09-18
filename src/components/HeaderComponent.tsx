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
  position: relative;
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

const MenuButton = styled.button`
  font-size: 0;
  position: absolute;
  width: 48px;
  left: 28px;
  border: none;
  background-color: transparent;
  &::before,
  &::after {
    content: '';
    display: block;
    height: 8px;
  }
  &::before {
    border-top: solid 4px ${color.borderWhite};
  }
  &::after {
    border-top: solid 4px ${color.borderWhite};
    border-bottom: solid 4px ${color.borderWhite};
  }
  &:hover {
    cursor: pointer;
  }
`;

export const HeaderComponent: React.FC<Props> = ({ siteTitle }) => (
  <Header>
    <MenuButton>メニュー</MenuButton>
    <Heading>
      <LinkComponent url="/" color="white">
        {siteTitle}
      </LinkComponent>
    </Heading>
  </Header>
);
