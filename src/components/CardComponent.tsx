import React from 'react';
import styled from 'styled-components';
import { DeepReadonly } from '../../types/utility';
import { color, fontSize, size } from '../styles/variable';
import { Image } from './atoms/ImageComponent';
import { ThumbnailImage } from '../../types/article';

const Article = styled.article`
  display: flex;
  flex-direction: column;
  width: ${size.cardImageWidth};
  max-height: ${size.cardMaxHeight};
  border-radius: 10px;
  background-color: ${color.bgWhite};
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;
const Title = styled.h1`
  font-size: ${fontSize.h1};
  text-align: center;
  margin-top: 8px;
`;
const Description = styled.p`
  font-size: ${fontSize.px16};
  margin-top: 8px;
  padding: 0 8px;
`;
const Link = styled.a`
  color: ${color.textBlack};
  text-decoration: none;
`;

type Props = {
  title: string;
  path: string;
  excerpt: string;
  image: ThumbnailImage;
};

export const CardComponent: React.FC<DeepReadonly<Props>> = ({
  title,
  path,
  excerpt,
  image,
}) => {
  return (
    <article className='flex flex-col w-(--card-image-width) max-h-(--card-max-height) rounded-lg bg-white shadow-md'>
      <a className='text-(--base-color-text) no-underline' href={path}>
        <Image
          imageSrc={image.url}
          isRounded={true}
          alt={title}
          width={{ pc: image.size.pc.width, sp: image.size.sp.width }}
          height={{ pc: image.size.pc.height, sp: image.size.sp.height }}
        />
        <h1 className='text-2xl text-center my-2'>{title}</h1>
        <p className='text-base px-2'>{excerpt}</p>
      </a>
    </article>
  );
};
