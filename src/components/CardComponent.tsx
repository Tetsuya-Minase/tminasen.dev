import React from 'react';
import styled from 'styled-components';
import { DeepReadonly } from '../../types/utility';
import { bodyFontSize, color, fontSize } from '../styles/variable';
import { Image } from './atoms/ImageComponent';
import { ThumbnailImage } from '../../types/article';

const Article = styled.article`
  display: flex;
  flex-direction: column;
  width: 336px;
  max-height: 448px;
  border-radius: 10px;
  background-color: ${color.backgroundWhite};
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
    <Article>
      <Link href={path}>
        <Image
          imageSrc={image.url}
          isRounded={true}
          alt={title}
          width={{ pc: image.size.pc.width, sp: image.size.sp.width }}
          height={{ pc: image.size.pc.height, sp: image.size.sp.height }}
        />
        <Title>{title}</Title>
        <Description>{excerpt}</Description>
      </Link>
    </Article>
  );
};
