import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import { LinkComponent } from './atoms/LinkComponent';
import { color, fontSize, layer } from '../styles/variable';

type Props = {
  siteTitle: string;
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
};

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
    box-sizing: content-box;
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

  ${media.lessThan('small')`
    width: 28px;
    left: 0;
    &::before,
    &::after {
      content: '';
      display: block;
      height: 4px;
      width: 24px;
    }
  `}
`;

const MenuDialog = styled.div<{ showModal: boolean }>`
  display: ${({ showModal }) => (showModal ? 'block' : 'none')};
  position: absolute;
  left: 28px;
  top: 8px;
  z-index: ${layer.overlay};
  background-color: ${color.bgWhite};
  min-width: 500px;
  min-height: 80vh;
  border-radius: 4px;
  ${media.lessThan('small')`
    min-width: 360px;
    left: 4px;
  `}
`;
const CloseButton = styled.button`
  font-size: 0;
  border: none;
  background-color: transparent;
  position: relative;
  top: 4px;
  left: 4px;
  width: 40px;
  height: 40px;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 28px;
    border-top: solid 2px ${color.textBlack};
  }

  &::before {
    transform: rotateZ(45deg);
  }

  &::after {
    transform: rotateZ(135deg);
  }

  &:hover {
    cursor: pointer;
  }
`;

export const HeaderComponent: React.FC<Props> = ({
  siteTitle,
  showModal,
  openModal,
  closeModal,
}) => {
  return (
    <header className='flex relative bg-(--header-bg-blue) max-h-[64px] justify-center items-center'>
      <MenuButton onClick={openModal}>メニュー</MenuButton>
      <h1 className='text-2xl sm:text-4xl font-bold leading-[1.5]'>
        <LinkComponent url="/" color="white">
          {siteTitle}
        </LinkComponent>
      </h1>
      <MenuDialog showModal={showModal}>
        <CloseButton onClick={closeModal}>閉じる</CloseButton>
        <ul>
          <li className='flex justify-center'>
            <LinkComponent url="/tags" color="black">
              <span className='text-2xl sm:text-4xl font-bold underline'>タグ一覧</span>
            </LinkComponent>
          </li>
        </ul>
      </MenuDialog>
    </header>
  );
};
