interface _ArticleMetaData {
  path: string;
  date: string;
  title: string;
  tag: string[];
  thumbnailImage: string;
  description: string;
}

export type ArticleMetaData = Readonly<_ArticleMetaData>;
