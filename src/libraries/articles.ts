import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ArticleMetaData, TagCount } from '../../types/article';
import { removeTags } from './markdown';

/**
 * 記事の概要表示に必要なデータを取得する
 * @return {@see ArticleMetaData}
 */
export function getArticleMetaData(): ArticleMetaData[] {
  const mdPagePath: string = path.join(process.cwd(), 'src/md-pages');
  const articleDirectories: string[] = fs.readdirSync(mdPagePath);
  return articleDirectories
    .map(articleDir => {
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
      return convertArticleMetaData(matterResult.data, matterResult.content);
    })
    .filter((item): item is ArticleMetaData => item !== undefined);
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

function convertArticleMetaData(
  data: {
    [key: string]: any;
  },
  context: string,
): ArticleMetaData | undefined {
  if (!isArticleMetaData(data)) {
    return undefined;
  }
  return {
    path: data.path,
    date: data.date,
    title: data.title,
    tag: data.tag,
    thumbnailImage: data.thumbnailImage,
    description: `${removeTags(context).substring(0, 130)}…`,
  };
}

function isArticleMetaData(data: {
  [key: string]: any;
}): data is ArticleMetaData {
  return (
    !!data?.path ||
    !!data?.date ||
    !!data?.title ||
    !!data?.tag ||
    !!data?.thumbnailImage
  );
}
