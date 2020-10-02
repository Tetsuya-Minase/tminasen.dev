import React from 'react';
import styled from 'styled-components';
import { DeepReadonly } from '../../types/utility';
import { bodyFontSize, fontColor, headerFontSize } from '../styles/variable';

const Article = styled.article`
  display: flex;
  flex-direction: column;
  width: 35rem;
`;
const Title = styled.div`
  font-size: ${headerFontSize.h1};
`;
const Image = styled.img``;
const Description = styled.div`
  font-size: ${bodyFontSize.medium};
`;
const Link = styled.a`
  color: ${fontColor.black};
  text-decoration: none;
`;

type Props = {
  title: string;
  path: string;
  excerpt: string;
  imagePath: string;
};

export const CardComponent: React.FC<DeepReadonly<Props>> = ({
  title,
  path,
  excerpt,
  imagePath,
}) => {
  return (
    <Article>
      <Link href={path}>
        <Image src={imagePath} width="350px" height="200px" />
        <Title>{title}</Title>
        <Description>{excerpt}</Description>
      </Link>
    </Article>
  );
};
