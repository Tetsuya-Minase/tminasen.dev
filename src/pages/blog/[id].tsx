import { JSX } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getArticleMetaData } from '../../libraries/articles';
import { PageTemplate } from '../../templates/PageTemplate';
import { ArticleMetaData } from '../../../types/article';
import { Optional } from '../../../types/utility';
import styled from 'styled-components';
import { color, fontSize } from '../../styles/variable';
import media from 'styled-media-query';
import { XShareButton } from '../../components/atoms/XShareButton';
import { GithubArticleButton } from '../../components/atoms/GithubArticleButton';
import { MdTemplate } from '../../templates/MdTemplate';
import { LinkComponent } from '../../components/atoms/LinkComponent';

interface Props {
  id: string;
  ogType: string;
  articleMetaData: ArticleMetaData;
}

const Article = styled.article`
  max-width: 980px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  ${media.lessThan('small')`
    max-width: 372px;
  `}
`;
const TitleWrapper = styled.div`
  background-color: ${color.bgWhite};
  border-radius: 4px;
  padding: 4px 16px;
  ${media.lessThan('small')`
    padding: 4px 12px;
  `}
`;
const ArticleTitle = styled.h1`
  font-size: ${fontSize.px28};
  font-weight: bolder;
  line-height: 1.5;
  ${media.lessThan('small')`
    font-size: ${fontSize.px24}
  `}
`;
const ArticleDate = styled.time`
  display: block;
  margin-top: 4px;
  font-size: ${fontSize.px16};
  line-height: 1.5;
`;
const TagList = styled.ul`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;
const TagListItem = styled.li`
  border: solid 1px ${color.borderBlack};
  border-radius: 30px;
  font-size: ${fontSize.px16};
  line-height: 1.5;
  padding: 0 8px;

  & + & {
    margin-left: 4px;
  }
`;
const SnsLink = styled.div`
  display: flex;
  margin-top: 8px;
  align-content: center;
  align-items: flex-start;
  column-gap: 0.5rem; 
`;

const TagLink = ({ tag }: { tag: string }): JSX.Element => {
  return (
    <TagListItem>
      <LinkComponent url={`/tags/${tag}`} color="black">
        {tag}
      </LinkComponent>
    </TagListItem>
  );
};

const articlePage = ({ id, articleMetaData }: Props) => {
  return (
    <PageTemplate>
      <Article>
        <TitleWrapper>
          <ArticleTitle>{articleMetaData.title}</ArticleTitle>
          <TagList>
            {articleMetaData.tag.map(t => (
              <TagLink tag={t} />
            ))}
          </TagList>
          <ArticleDate>{articleMetaData.date}</ArticleDate>
        </TitleWrapper>
        <MdTemplate html={articleMetaData.html} />
        <SnsLink>
          <XShareButton
            title={articleMetaData.title}
            path={articleMetaData.path}
          />
          <GithubArticleButton path={articleMetaData.path} />
        </SnsLink>
      </Article>
    </PageTemplate>
  );
};

export default articlePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const metaData = await getArticleMetaData();
  const paths: string[] = metaData.map(data => data.path);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  if (id == null || Array.isArray(id)) {
    return { props: { id: null } };
  }
  const articleMetaDataList: ArticleMetaData[] = await getArticleMetaData();
  const targetMetaData: Optional<ArticleMetaData> = articleMetaDataList.filter(
    data => data.path === `/blog/${id}`,
  )[0];
  if (targetMetaData == null) {
    return { props: { id: null } };
  }
  return {
    props: {
      id,
      ogType: 'article',
      articleMetaData: targetMetaData,
    },
  };
};
