import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { TagListQuery } from '../../types/graphql-types';

type TagLink = {
  name: string;
  articleCount: number;
  url: string;
};

const Aside = styled.aside`
  margin: 1rem 4rem 1rem;
`;
const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
`;

const useConvertTagList = (
  group: TagListQuery['allMarkdownRemark']['group'],
) => {
  return useMemo(() => {
    return group
      .map(field => {
        if (field.fieldValue == undefined || field.nodes.length == 0) {
          return;
        }
        return {
          name: field.fieldValue,
          articleCount: field.nodes.length,
          url: `/tag/${field.fieldValue}`,
        };
      })
      .filter((item): item is TagLink => item != undefined);
  }, [group.length]);
};

export const SubColumnComponent: React.FC = () => {
  const data: TagListQuery = useStaticQuery(graphql`
    query TagList {
      allMarkdownRemark {
        group(field: frontmatter___tag) {
          fieldValue
          nodes {
            frontmatter {
              path
              title
            }
          }
        }
      }
    }
  `);
  const tagLinkList: TagLink[] = useConvertTagList(
    data.allMarkdownRemark.group,
  );
  if (tagLinkList.length === 0) {
    return null;
  }
  const tagList = useMemo(
    () =>
      tagLinkList.map(tagLink => (
        <li key={tagLink.name}>
          <a href={tagLink.url}>{`${tagLink.name}(${tagLink.articleCount})`}</a>
        </li>
      )),
    [tagLinkList.length],
  );
  return (
    <Aside>
      <Title>タグ一覧</Title>
      <ul>{tagList}</ul>
    </Aside>
  );
};
