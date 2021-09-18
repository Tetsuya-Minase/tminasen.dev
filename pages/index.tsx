import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import { PageTemplate } from '../src/templates/PageTemplate';
import { getArticleMetaData } from '../src/libraries/articles';
import { ArticleMetaData } from '../types/article';
import { CardComponent } from '../src/components/CardComponent';

const ArticleCardList = styled.ul`
  font-size: 1.6rem;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 384px);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  margin: 1rem 0;
  ${media.lessThan('small')`
    grid-template-columns: repeat(auto-fill, 320px);
  `}
`;

const ArticleCardItem: (param: {
  articleData: ArticleMetaData;
}) => JSX.Element = ({ articleData }) => {
  return (
    <li key={`${articleData.title}:${articleData.path}`}>
      <CardComponent
        title={articleData.title}
        path={articleData.path}
        image={articleData.thumbnailImage}
        excerpt={articleData.description}
      />
    </li>
  );
};

const IndexPage: React.FC<{ articleMetaData: ArticleMetaData[] }> = ({
  articleMetaData,
}) => {
  return (
    <PageTemplate
      title="水無瀬のプログラミング日記"
      metaData={articleMetaData}
      isEnableViewPort={true}
      canonicalPath="/"
    >
      <ArticleCardList>
        {articleMetaData.map(article => (
          <ArticleCardItem articleData={article} />
        ))}
      </ArticleCardList>
    </PageTemplate>
  );
};

export default IndexPage;

export const getStaticProps = async (): Promise<{
  props: { articleMetaData: ArticleMetaData[] };
}> => {
  const data = await getArticleMetaData();
  return {
    props: {
      articleMetaData: data,
    },
  };
};
