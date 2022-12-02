---
path: "/blog/1ba0f384ec9f09200bac8ef1a98542"
date: "2022/12/02"
title: "Next.jsでbetterなディレクトリ構成を考える"
tag: ["Next.js"]
ogpImage: "/images/article/1ba0f384ec9f09200bac8ef1a98542/ogp.png"
thumbnailImage: "/images/article/1ba0f384ec9f09200bac8ef1a98542/Files_And_Folder_Monochromatic.png"
---

# はじめに

最近`Next.js`を用いてアプリを作ることが多いのでより良いディレクトリ構成を考える。

# TL;DR.

```
.
├── README.md
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── public # 静的ファイル置き場
│   ├── favicon.ico
│   └── vercel.svg
├── src # アプリケーションのメインとなるディレクトリ
│   ├── components # ページ共通のComponentを入れる
│   │   └── header # Component毎にディレクトリを切る。Component, test, storybookは必ずセットにする
│   │       ├── Header.stories.tsx 
│   │       ├── Header.test.tsx
│   │       ├── Header.tsx
│   │       └── index.tsx # importする時はindex経由にする
│   ├── config # 設定ファイルを入れる
│   ├── features # ページ、APIの機能を実現するための詳細をまとめる
│   │   ├── api # APIの実態。`pagges/api/`配下をinterface層とする4層のLayered Architectureとする
│   │   │   ├── application
│   │   │   ├── domain
│   │   │   └── infrastructure
│   │   └── users # ページの実態。`pages/xxx`で使うものをすべてまとめる
│   │       ├── components # ページ固有のComponent。Component毎にディレクトリを切る
│   │       │   └── button # `src/components`同様Component, test, storybookを必ずセットにする
│   │       │       ├── Button.stories.tsx
│   │       │       ├── Button.test.tsx
│   │       │       ├── Button.tsx
│   │       │       └── index.tsx
│   │       ├── functions # ページ固有のhooksじゃない関数があれば入れる
│   │       ├── hooks # ページ固有のhooksを入れる
│   │       ├── stores # ページ固有のstoreを入れる
│   │       └── types # ページ固有の型定義を入れる
│   ├── functions # ページ共通の関数を入れる
│   ├── hooks # ページ共通のhooksを入れる
│   ├── pages # Next.jsのエントリ用。pages配下のファイルは基本抜け殻にする(featuresに機能を集約する)
│   │   ├── _app.tsx
│   │   ├── api
│   │   │   └── hello.ts
│   │   ├── index.tsx
│   │   └── users # 階層を掘れるようにファイル名でファなくディレクトリ名でパスを決める
│   │       └── index.tsx
│   ├── stores # ページ共通のstoreを入れる
│   └── styles # ページ共通のstyleを置く
│       └── globals.css
└── tsconfig.json
```

# ディレクトリ詳細

## 全体構成

`create-next-app`で吐き出した状態から`pages`ディレクトリを`src`配下に移動するところからスタート。  
`src`配下についてはBulletproof Reactを参考にした。

## src/pages

`Next.js`でrouteが作られるディレクトリ。  
4層Layered Architectureで言うところのinterface層がほぼ同義の認識。  
現状のnextだとpages配下はすべて公開されてしまうので、routingに必要なものだけ置き抜け殻にする。  
ページの機能を実装するのに必要な機能は`src/features`配下に置く。

## src/features

page、APIの機能実現に必要なものを置くディレクトリ。  
どのページと対応しているかわかりやすいようにディレクトリ名はpages配下と合わせる。  
もし、pages配下に無いフォルダ名がこの配下に出てくるのであれば、おそらく置く場所が違う。  
※APIについては4層Layered Architectureに則るので命名はそちら優先(APIに合わせたフォルダを切るのではなく、各layerに良きようにファイル置く)

### src/features/【ページ名】

ページを構成するのに必要なlayoutや機能を置いておくディレクトリ。  
中身についてはBulletproof Reactをベースに以下のようにする。

* Component
    * ページで使うComponentをまとめる
    * Componentは以下のファイルで1セットとし、Componentが増えるたびにこのセットを増やす
        * hoge/Hoge.tsx: Componentのメイン。layoutはここに入れる
        * hoge/Hoge.test.tsx: Componentのテストファイル
        * hoge/Hoge.story.tsx: Componentのstory
        * hgoe/index.tsx: Hoge.tsxをexportする用。使う側はindex.tsxを経由してimportする
* hooks/functions
    * hooks or ただの関数を置くフォルダ
    * hooksを使っていればhooks配下に。ただの関数であればfunctions配下に置く
* types
    * ページ固有の型定義を入れる

### src/features/api

APIはクライアントに合わせてエントリごとに作るのではなく、4層のLayered Architectureを採用する。  
`src/pages/api`がinterface層に当たると考え、ここには`application` 〜 `infrastructure`を置く。

## src/components

ページ共通のComponentを置くディレクトリ。  
Componentの中身については、`src/features/【ページ名】`と同じルールを採用する。

## src/functions,hooks,stores,styles

それぞれページ共通のものを置くディレクトリ。  
ページのユースケースが入り込まないように気をつける。

# まとめ

今回は`Next.js`でのディレクトリ構成について考えた。  
記載した内容はあくまで執筆時点で何もしないよりは良いかなと考えている内容なので、もっとこうしたほうが良いとか数ヶ月に見てこれじゃキツイだろとかは出てくるかもしれない。  
そのため常に最新の情報をキャッチアップしつつアップデートしていければ良さそう。

# 関連リンク

* [alan2207/bulletproof\-react: 🛡️ ⚛️ A simple, scalable, and powerful architecture for building production ready React applications\.](https://github.com/alan2207/bulletproof-react)