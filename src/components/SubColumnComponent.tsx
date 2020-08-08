import React from 'react';
import styled from 'styled-components';

const Aside = styled.aside`
  margin: 1rem 4rem 1rem;
`;
const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
`;

export const SubColumnComponent: React.FC = () => {
  return (
    <Aside>
      <Title>タグ一覧</Title>
    </Aside>
  );
};
