import React from 'react';
import Img from 'gatsby-image';
import { ImageValue } from '../../types/utility';

type Props = {
  path: ImageValue;
};

export const Image: React.FC<Props> = ({ path }) => <Img fluid={path} />;
