import { JSX } from 'react';
import { ArticleMetaData } from '../types/article';
import { CardComponent } from './CardComponent';

const ArticleCardItem: (param: {
  articleData: ArticleMetaData;
  fetchPriority?: 'high' | 'low' | 'auto';
}) => JSX.Element = ({ articleData, fetchPriority }) => {
  return (
    <li>
      <CardComponent
        title={articleData.title}
        path={articleData.path}
        image={articleData.thumbnailImage}
        excerpt={articleData.description}
        date={articleData.date}
        tags={articleData.tag}
        fetchPriority={fetchPriority}
      />
    </li>
  );
};

export const ArticleCardListComponent: React.FC<{
  articleMetaDataList: ArticleMetaData[];
}> = ({ articleMetaDataList }) => {
  return (
    <ul className="text-base grid justify-center [grid-template-columns:repeat(auto-fill,var(--card-image-width))] gap-[20px]">
      {articleMetaDataList.map((article, index) => (
        <ArticleCardItem
          articleData={article}
          key={article.path}
          fetchPriority={index === 0 ? 'high' : undefined}
        />
      ))}
    </ul>
  );
};
