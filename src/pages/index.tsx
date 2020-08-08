import React, { useMemo } from 'react';
import { graphql, Link } from 'gatsby';

import { PageTemplate } from '../templates/PageTemplate';
import { Image } from '../components/ImageComponent';
import SEO from '../components/seo';
import { IndexPageQuery } from '../../types/graphql-types';

type Props = {
  data: IndexPageQuery;
};

const useCreateArticle = (
  articleData: IndexPageQuery['allMarkdownRemark']['edges'],
) => {
  return useMemo(() => {
    const linkItems = articleData
      .map(item => {
        const frontmatter = item.node.frontmatter;
        if (frontmatter?.path == undefined || frontmatter?.title == undefined) {
          return undefined;
        }
        return (
          <li key={`${frontmatter.title}:${frontmatter.path}`}>
            <Link to={frontmatter.path}>{frontmatter.title}</Link>
          </li>
        );
      })
      .filter((item): item is JSX.Element => item !== undefined);
    if (linkItems.length === 0) {
      return null;
    }
    return <ul>{linkItems}</ul>;
  }, [articleData.length]);
};

const IndexPage: React.FC<Props> = ({ data }) => {
  const articles = useCreateArticle(data.allMarkdownRemark.edges);
  return (
    <PageTemplate>
      <React.Fragment>
        <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        {articles}
      </React.Fragment>
    </PageTemplate>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPage {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            path
            title
          }
        }
      }
    }
  }
`;
