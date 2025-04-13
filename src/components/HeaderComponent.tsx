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

export const HeaderComponent: React.FC<Props> = ({
  siteTitle,
  showModal,
  openModal,
  closeModal,
}) => {
  return (
    <header className='flex relative bg-(--header-bg-blue) max-h-[64px] justify-center items-center'>
      <button className='menu-button absolute w-7 sm:w-12 left-2 sm:left-7 no-underline bg-transparent' onClick={openModal}>メニュー</button>
      <h1 className='text-2xl sm:text-4xl font-bold leading-[1.5]'>
        <LinkComponent url="/" color="white">
          {siteTitle}
        </LinkComponent>
      </h1>
      <MenuDialog showModal={showModal}>
        <button className='close-button relative border-none bg-transparent w-10 h-10' onClick={closeModal}>閉じる</button>
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
