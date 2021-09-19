import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';
import { color, fontSize } from '../styles/variable';

interface Props {
  html: string;
}

const MarkDownArticle = styled.div`
  background-color: ${color.bgWhite};
  margin-top: 32px;
  font-size: ${fontSize.px16};
  border-radius: 4px;
  padding: 8px 16px;

  & > p,
  pre,
  ul,
  ol {
    margin: 1.2rem 0;
  }
  & p > strong {
    font-weight: bold;
  }

  /* タイトルの上下は文章部分よりも開ける */
  & > h1 {
    margin: 0.8rem 0 0;

    &:nth-child(n + 2) {
      margin: 2rem 0 0;
    }
  }
  & > h2,
  & > h3 {
    margin: 2rem 0 0.4rem;
  }

  /* 見出しのStyle */
  & h1 {
    font-size: 2.8rem;
    font-weight: bolder;
  }
  & h2 {
    font-size: 2.4rem;
    font-weight: bolder;
  }
  & h3 {
    font-size: 2rem;
    font-weight: bolder;
  }

  /* リンクにカーソル合わせたとき色を変える */
  & a:hover {
    color: #ed0077;
  }

  & ul > li {
    margin-top: 0.4rem;
    position: relative;

    /* リストの先頭に点出す */
    &:before {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-top: solid 5px transparent;
      border-left: solid 5px #333;
      border-bottom: solid 5px transparent;
      left: -8px;
      top: calc(1.6rem / 2 - 5px);
      margin-right: 0.4rem;
    }
  }
  & li > p {
    display: inline-block;
  }

  & li > ul {
    margin: 0.4rem 0 0 2rem;
  }

  /* 入れ子対応 */
  & li > ul > li {
    position: relative;

    &:before {
      content: '';
      display: inline-block;
      position: absolute;
      width: 4px;
      height: 4px;
      border: solid 1px #333;
      border-radius: 50%;
      margin-right: 0.4rem;
      top: calc(1.6rem / 2 - 2px);
      left: -8px;
    }
  }

  /* olの場合数字を出すようにする */
  & ol {
    counter-reset: item;
  }

  & ol > li:before {
    counter-increment: item;
    content: counter(item) '. ';
  }

  /* 画像はみ出すのでリサイズ */
  & img {
    display: block;
  }

  ${media.lessThan('small')`
    margin-top: 20px;
    font-size: ${fontSize.px16};
    border-radius: 4px;
    padding: 8px 12px;
  
    /* 要素ごとにスペースを開ける */
    & > p, pre, ul, ol {
        margin: 1.2rem 0;
    }
    /* タイトルの上下は文章部分よりも開ける */
    & > h1 {
      margin: 0.4rem 0 0;
      &:nth-child(n + 2) {
        margin: 1.6rem 0 0;
      }
    }
    & > h2, & > h3 {
      margin: 1.6rem 0;
    }

    /* 見出しのStyle */
    & h1 {
        font-size: 2.4rem;
        font-weight: bolder;
    }

    & h2 {
        font-size: 2rem;
        font-weight: bolder;
    }

    & h3 {
        font-size: 1.6rem;
        font-weight: bolder;
    }
    
    /* 画像はみ出すのでリサイズ */
    & img {
      display: block;
      height: 100%;
      width: 80%;
    }

  `}
`;

export const MdTemplate: React.FC<Props> = ({ html }) => {
  return <MarkDownArticle dangerouslySetInnerHTML={{ __html: html }} />;
};
