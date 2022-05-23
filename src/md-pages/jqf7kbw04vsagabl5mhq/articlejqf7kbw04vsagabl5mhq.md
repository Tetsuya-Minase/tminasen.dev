---
path: "/blog/jqf7kbw04vsagabl5mhq"
date: "2020/12/28"
title: "Next.jsでmdxを使ってみる"
tag: ["Next.js"]
thumbnailImage: "/images/article/jqf7kbw04vsagabl5mhq/ogp.png"
headerImage: "/images/article/jqf7kbw04vsagabl5mhq/ssjqf7kbw04vsagabl5mhq-3.png"
---

# はじめに

mdxが気になっていた今日このごろ。  
`Next.js`と一緒に使ってブログとか作れたら面白そうと思ったので、  
Next.jsでmdxを使えるところまで試してみる。

# TL;DR.

- [ソースコード](https://github.com/Tetsuya-Minase/program-samples/tree/master/mdx-sample)

# mdxとは

> MDX is an authorable format that lets you seamlessly use JSX in your markdown documents. You can import components,
> like interactive charts or notifications, and export metadata. This makes writing long-form content with components a
> blast.   
> (mdxのGithubから引用)

とのことなので、ざっくりいうとJSXが書けるmarkdown。  
markdownだとやりにくい細かいレイアウトの調整とかやりやすそうである。

# 準備

必要なファイル、ライブラリの準備をする。  
`Next.js`ベースで進めるので、`create-next-app`からスタート。

```bash
# デフォのままだとjsなので、ts対応したexampleから始める
$ npx create-next-app --example with-typescript mdx-sample
$ cd mdx-sample
# mdx追加
$ yarn add yarn add @next/mdx @mdx-js/loader
```

## next.config.js修正

ページとして`mdx`を使えるように、`next.config.js`を修正する。
↑の通りに進めるとおそらく無いので作るところから。

```bash
$ touch next.config.js
```

```js
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});
module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx']
});
```

# サンプルページ追加

早速mdxでページを作ってみる。

```bash
# pages配下にmdxファイルを追加
$ touch pages/hello.mdx
```

コードは下記の様にした。

```markdown :hello.mdx
# sample
ここから↓がjsx.
<article>
  <h1>Hello World!</h1>
  <div style={{backgroundColor: 'red', fontSize: '200%'}}>
    sample text.
  </div>
</article>
```

`yarn dev`で起動後、`localhost:3000/hello`で↓の様な画面が表示されればOK。

![ssjqf7kbw04vsagabl5mhq-1.png](/images/article/jqf7kbw04vsagabl5mhq/ssjqf7kbw04vsagabl5mhq-1.png)

# component読みこむ

## header component作成

次にmdxで実際にcomponentを読み込んでみる。  
まずはお試しのコンポーネントを作るところから。

```typescript jsx: Header.tsx
import React from 'react';
import style from './Header.module.css';

interface Props {
  heading: string,
  color?: 'red' | 'blue'
}

export const HeaderComponent: React.FC<Props> = ({heading, color}) => {
  if (!color) {
    return <h1 className={style.header}>{heading}</h1>;
  }
  switch(color) {
    case 'red':
      return <h1 className={`${style.header} ${style['header--red']}`}>{heading}</h1>;
    case 'blue':
      return <h1 className={`${style.header} ${style['header--blue']}`}>{heading}</h1>;
  }
}
```

```css :Header.module.css
.header {
  font-size: 28px;
}
.header--red {
  color: red;
}
.header--blue {
  color: blue;
}
```

## mdx修正

```markdown :hello.mdx
import {HeaderComponent} from '../components/header/Header.tsx';

# sample
ここから↓がjsx.
<article>
  <HeaderComponent heading="Hello World!"/>
  <div style={{backgroundColor: 'red', fontSize: '200%'}}>
    sample text.
  </div>
</article>
<article>
  <HeaderComponent heading="Hello World!" color="red"/>
  <div style={{backgroundColor: 'red', fontSize: '200%'}}>
    red heading.
  </div>
</article>
<article>
  <HeaderComponent heading="Hello World!" color="blue"/>
  <div style={{backgroundColor: 'red', fontSize: '200%'}}>
    blue heading.
  </div>
</article>
```

↓の画像のように変更されていればOK。
![ssjqf7kbw04vsagabl5mhq-2.png](/images/article/jqf7kbw04vsagabl5mhq/ssjqf7kbw04vsagabl5mhq-2.png)

# コードブロック作ってみる

mdのコードブロックでシンタックスハイライトが効かないっぽかったので自作する。  
これは絶対うまいやり方がある気がするので一旦試してみるところまで……

## ライブラリ追加

```bash
$ yarn add prism-react-renderer
```

## コンポーネント作成

```tsx :Codeblock.tsx
import React from 'react';
import Highlight, {defaultProps, Language} from 'prism-react-renderer';

export const CodeBlockComponent: React.FC<{ code: string, language: Language }> = ({code, language}) => {
  return (
    <Highlight {...defaultProps} code={code} language={language}>
      {({className, style, tokens, getLineProps, getTokenProps}) => (
        <pre className={className} style={{...style, padding: '20px'}}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({line, key: i})}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({token, key})} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
};
```

# mdx修正

```markdown :hello.mdx
import {HeaderComponent} from '../components/header/Header.tsx';
import {CodeBlockComponent} from '../components/codeblock/CodeBlock.tsx';

# sample
ここから↓がjsx.
<article>
  <HeaderComponent heading="Hello World!"/>
  <div style={{backgroundColor: 'red', fontSize: '200%'}}>
    sample text.
  </div>
</article>
<article>
  <HeaderComponent heading="Hello World!" color="red"/>
  <div style={{backgroundColor: 'red', fontSize: '200%'}}>
    red heading.
  </div>
</article>
<article>
  <HeaderComponent heading="Hello World!" color="blue"/>
  <div style={{backgroundColor: 'red', fontSize: '200%'}}>
    blue heading.
  </div>
</article>

<CodeBlockComponent
  code={`
    const hoge = 'hoge';
    console.log(hoge);
  `}
  language="javascript"
/>

↓はハイライトされない
```js
const hoge = 'hoge';
console.log(hoge);
```

↓の様にコンポーネントに渡した方はちゃんとハイライトが効くようになる。  
![ssjqf7kbw04vsagabl5mhq-3.png](/images/article/jqf7kbw04vsagabl5mhq/ssjqf7kbw04vsagabl5mhq-3.png)

# まとめ

今回はNext.jsでmdxを使うのを試してみた。  
記事中にも書いたけど、絶対syntax highlightはより良いやり方があると思うので調べておきたい。

# 参考リンク

* [mdx\-js/mdx: JSX in Markdown for ambitious projects](https://github.com/mdx-js/mdx)
* [@next/mdx @mdx\-js/loader](https://mdxjs.com/getting-started/next)
* [next\.js/examples/with\-typescript at master · vercel/next\.js](https://github.com/vercel/next.js/tree/master/examples/with-typescript)
* [Syntax highlighting \| MDX](https://mdxjs.com/guides/syntax-highlighting)
