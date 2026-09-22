import { JSX } from 'react';
import { getArticleMetaData } from '../libraries/articles';
import { ArticleMetaData } from '../types/article';
import { CardComponent } from '../components/CardComponent';
import { ArticleCardListComponent } from '../components/ArticleCardListComponent';
import { ArticleCardSkeletonListComponent } from '../components/ArticleCardSkeletonListComponent';
import { PageTemplate } from '../templates/PageTemplate';
import { paginate, getTotalPages, ARTICLES_PER_PAGE } from '../libraries/pagination';
import { useInfiniteArticles } from '../hooks/useInfiniteArticles';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const EAGER_CARD_COUNT = 6;

const ArticleCardItem: (param: {
  articleData: ArticleMetaData;
  fetchPriority?: 'high' | 'low' | 'auto';
  loading?: 'eager' | 'lazy';
}) => JSX.Element = ({ articleData, fetchPriority, loading }) => {
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
        loading={loading}
      />
    </li>
  );
};

const IndexPage: React.FC<{
  articleMetaDataList: ArticleMetaData[];
  totalPages: number;
  totalArticles: number;
}> = ({ articleMetaDataList, totalPages, totalArticles }) => {
  const { articles, status, loadMore } = useInfiniteArticles({
    initialArticles: articleMetaDataList,
    totalPages,
  });
  const sentinelRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: status !== 'done',
  });

  // 次に読み込む件数 = min(残件数, ARTICLES_PER_PAGE)
  // 端数ページ読み込み時にスケルトン枚数が実際の件数を超えてレイアウトシフトしないようにする
  const nextChunkSize = Math.min(
    totalArticles - articles.length,
    ARTICLES_PER_PAGE,
  );

  // PageTemplate の children は JSX.Element | JSX.Element[] のみを受け付けるため、
  // 条件付きで含める要素は配列に集約してから渡す
  const children: JSX.Element[] = [
    <ArticleCardListComponent
      key="article-list"
      articleMetaDataList={articles}
    />,
  ];
  if (status === 'loading') {
    children.push(
      <ArticleCardSkeletonListComponent key="skeleton" count={nextChunkSize} />,
    );
  }
  if (status !== 'done') {
    children.push(<div key="sentinel" ref={sentinelRef} aria-hidden="true" />);
  }

  return <PageTemplate>{children}</PageTemplate>;
};

export default IndexPage;

export const getStaticProps = async (): Promise<{
  props: {
    title: string;
    path: string;
    ogType: string;
    articleMetaDataList: ArticleMetaData[];
    totalPages: number;
    totalArticles: number;
  };
}> => {
  const data = await getArticleMetaData();
  const totalPages = getTotalPages(data.length, ARTICLES_PER_PAGE);
  const paginatedData = paginate(data, 1, ARTICLES_PER_PAGE);

  return {
    props: {
      title: '記事一覧',
      path: '/',
      ogType: 'website',
      articleMetaDataList: paginatedData,
      totalPages,
      totalArticles: data.length,
    },
  };
};
