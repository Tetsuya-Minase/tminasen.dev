import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { TagArticlesQuery } from '../../types/graphql-types';
import { PageTemplate } from './PageTemplate';
import { fontColor } from '../styles/variable';

type Props = {
  pageContext: {
    tagName: string;
  };
  data: TagArticlesQuery;
};
const PageTitle = styled.h1`
  color: ${fontColor.black};
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
`;
const ArticleList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const ArticleListItem = styled.li`
  flex-basis: 100%;
  margin-bottom: 2rem;
`;
const ArticleWrapper = styled.section``;
const ArticleTitle = styled.h1`
  font-size: 2rem;
`;
const ArticleDescription = styled.p`
  font-size: 1.6rem;
`;
const Link = styled.a`
  display: inline-block;
  text-decoration: none;
  height: 10rem;
  width: 100%;
  &:visited {
    color: ${fontColor.black};
  }
`;

const getArticles = (
  nodes: TagArticlesQuery['allMarkdownRemark']['nodes'],
): JSX.Element | null => {
  const articleList = nodes
    .map(({ frontmatter, excerpt }): JSX.Element | null => {
      if (frontmatter?.path == null || frontmatter?.title == null) {
        return null;
      }
      const { path, title } = frontmatter;
      return (
        <ArticleListItem key={`${path}`}>
          <ArticleWrapper>
            <Link href={path}>
              <ArticleTitle>{title}</ArticleTitle>
              <ArticleDescription>{excerpt}</ArticleDescription>
            </Link>
          </ArticleWrapper>
        </ArticleListItem>
      );
    })
    .filter((element): element is JSX.Element => element !== null);
  if (articleList.length === 0) {
    return null;
  }
  return <ArticleList>{articleList}</ArticleList>;
};

export const TagListTemplate: React.FC<Props> = ({
  pageContext: { tagName },
  data: {
    allMarkdownRemark: { nodes },
  },
}) => {
  return (
    <PageTemplate>
      <article>
        <PageTitle>{tagName}の記事一覧</PageTitle>
        {getArticles(nodes)}
      </article>
    </PageTemplate>
  );
};

export default TagListTemplate;

export const articleData = graphql`
  query TagArticles($tagName: String) {
    allMarkdownRemark(
      filter: { frontmatter: { tag: { eq: $tagName } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          path
          title
          date
        }
        excerpt(format: PLAIN, truncate: true, pruneLength: 100)
      }
    }
  }
`;
