import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import unified from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import { ArticleMetaData, TagCount } from '../../types/article';
import { removeTags } from './markdown';

const rehypePrism = require('@mapbox/rehype-prism');

/**
 * 記事の概要表示に必要なデータを取得する
 * @return {@see ArticleMetaData}
 */
export async function getArticleMetaData(): Promise<ArticleMetaData[]> {
  const mdPagePath: string = path.join(process.cwd(), 'src/md-pages');
  const articleDirectories: string[] = fs.readdirSync(mdPagePath);
  const result: Array<ArticleMetaData | undefined> = [];
  for (const articleDir of articleDirectories) {
    const articleDirPath = path.join(mdPagePath, articleDir);
    const files = fs.readdirSync(articleDirPath);
    const file: string | undefined = files.filter(file =>
      file.endsWith('.md'),
    )[0];
    const fileDetail = fs.readFileSync(
      path.join(mdPagePath, articleDir, file),
      'utf8',
    );
    const matterResult = matter(fileDetail, { excerpt: true });
    const metaData = await convertArticleMetaData(
      matterResult.data,
      matterResult.content,
    );
    result.push(metaData);
  }
  return result.filter((item): item is ArticleMetaData => item !== undefined);
}

/**
 * 記事毎のタグ数から表示に必要なデータに整形する
 * @param tagCount 記事毎のタグ数
 * @returns {
 *   name: タグ名
 *   articleCount: 記事数
 *   url: タグ別URL
 * }
 */
export function convertTagList(tagCount: TagCount) {
  return Object.entries(tagCount).map(([tag, count]) => ({
    name: tag,
    articleCount: count,
    url: `/tags/${tag}`,
  }));
}

async function convertArticleMetaData(
  data: {
    [key: string]: any;
  },
  context: string,
): Promise<ArticleMetaData | undefined> {
  if (!isArticleMetaData(data)) {
    throw new Error('data is invalid.');
  }
  const processedContent = await unified()
    .use(remarkParse)
    .use(remark2rehype)
    .use(rehypePrism)
    .use(html)
    .process(context);
  const highlightHtml = processedContent.toString();

  return {
    path: data.path,
    date: data.date,
    title: data.title,
    tag: data.tag,
    thumbnailImage: data.thumbnailImage,
    html: highlightHtml,
    description: `${removeTags(context).substring(0, 130)}…`,
  };
}

function isArticleMetaData(data: {
  [key: string]: any;
}): data is ArticleMetaData {
  return (
    !!data?.path &&
    !!data?.date &&
    !!data?.title &&
    !!data?.tag &&
    !!data?.thumbnailImage
  );
}
