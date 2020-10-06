import React from 'react';
import Img from 'gatsby-image';
import { ImageValue } from '../../types/utility';

type Props = {
  path: ImageValue;
  imageStyle?: { [key: string]: string };
};

export const Image: React.FC<Props> = ({ path, imageStyle }) => (
  <Img fluid={path} imgStyle={imageStyle} />
);
