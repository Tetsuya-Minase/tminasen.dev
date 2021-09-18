import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import { PageTemplate } from '../src/templates/PageTemplate';
import { getArticleMetaData } from '../src/libraries/articles';
import { ArticleMetaData } from '../types/article';
import { CardComponent } from '../src/components/CardComponent';
import { fontSize, size } from '../src/styles/variable';

const ArticleCardList = styled.ul`
  font-size: ${fontSize.px16};
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, ${size.cardImageWidth});
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  margin: 10px 0;
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
