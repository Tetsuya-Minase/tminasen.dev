import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ArticleMetaData } from '../../types/article';
import { removeTags } from './markdown';

export function getArticleMetaData(): ArticleMetaData[] {
  const articlePath: string = path.join(process.cwd(), 'src/md-pages');
  console.log('path: ', articlePath);
  const articleDirectories: string[] = fs.readdirSync(articlePath);
  console.log('readDir: ', articleDirectories);
  return articleDirectories
    .map(articleDir => {
      console.log('articleDir', articleDir);
      console.log('join path: ', path.join(articlePath, articleDir));
      const files = fs.readdirSync(path.join(articlePath, articleDir));
      console.log('files: ', files);
      const file: string | undefined = files.filter(file =>
        file.endsWith('.md'),
      )[0];
      console.log('file: ', file);
      const fileDetail = fs.readFileSync(
        path.join(articlePath, articleDir, file),
        'utf8',
      );
      const matterResult = matter(fileDetail, { excerpt: true });
      // console.log('matterResult: ', matterResult.orig);
      console.log('excerpt: ', matterResult.excerpt);
      return convertArticleMetaData(matterResult.data, matterResult.content);
    })
    .filter((item): item is ArticleMetaData => item !== undefined);
}

function convertArticleMetaData(
  data: {
    [key: string]: any;
  },
  context: string,
): ArticleMetaData | undefined {
  if (
    !data?.path ||
    !data?.date ||
    !data?.title ||
    !data?.tag ||
    !data?.thumbnailImage
  ) {
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
