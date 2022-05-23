---
path: "/blog/wx1t6emdfmmj0ctrokgu"
date: "2021/02/12"
title: "Angular+TailwindCSSを試してみる"
tag: ["Angular"]
thumbnailImage: "/images/article/wx1t6emdfmmj0ctrokgu/ogp.png"
headerImage: "/images/article/wx1t6emdfmmj0ctrokgu/sswx1t6emdfmmj0ctrokgu-2.png"
---

# はじめに

Angularがv11.2くらいでTailwindCSSに対応したそうなので試してみる回。  
[前にちょろっと試したとき](https://tminasen.dev/blog/n4jehn2qav1xhtawosqy)は特にTailwindCSSの良さに気づけなかったので改めてちゃんと触る。

# TL;DR.

[コード](https://github.com/Tetsuya-Minase/front-end-practice/tree/main/ng-tailwind)

# セットアップ

## Angularプロジェクトの準備

セットアップは↓を参考に進めていく。  
[Setup TailwindCSS in Angular the easy way - DEV Community](https://dev.to/angular/setup-tailwindcss-in-angular-the-easy-way-1i5l)

いつも通り`ng new`でプロジェクト作るところから。

```bash
$ npx @angular/cli new ng-tailwind --strict
> routingはなし。scssを使うようにした。
```

## TailwindCSSの導入

TailwindCSS入れるところから。

```bash
$ npm install -D tailwindcss
```

↓の様なconfigファイル(`tailwind.config.js`)を用意する。  
空ファイルは`npx tailwindcss init`で生成できる。

```jsx
module.exports = {
  prefix: '',
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
```

`style.scss`に以下を追記。

```scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

これで準備はOK。

# 使ってみる

とりあえず記事を参考に`app.component.html`の内容を下記の通り書き換える。

```html

<button
    class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400">Hello
</button>
```

で、起動してみると落ちる。

```bash
$ npm start                 

> ng-tailwind@0.0.0 start /ng-tailwind
> ng serve

Compiling @angular/core : es2015 as esm2015
Compiling @angular/common : es2015 as esm2015
Compiling @angular/platform-browser : es2015 as esm2015
Compiling @angular/platform-browser-dynamic : es2015 as esm2015
✔ Browser application bundle generation complete.

Initial Chunk Files | Names         |    Size
main.js             | main          | 0 bytes
polyfills.js        | polyfills     | 0 bytes
runtime.js          | runtime       | 0 bytes
styles.js           | styles        | 0 bytes
vendor.js           | vendor        | 0 bytes

                    | Initial Total | 0 bytes

Build at: 2021-02-12T02:09:32.312Z - Hash: 9f9e72a3edeefe93dfa6 - Time: 20265ms

Error: ./src/styles.scss
Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):
ModuleBuildError: Module build failed (from ./node_modules/postcss-loader/dist/cjs.js):
Error: Cannot find module '@tailwindcss/forms'
```

エラーメッセージ見る限り`tailwind.config.css`に指定してるpluginが無さそうなので手動で追加する。

```bash
$ npm install -D @tailwindcss/forms @tailwindcss/typography
```

これで起動できるようになるので、画像のように表示されればOK。
![tailwindcssを使ったボタンのサンプル](/images/article/wx1t6emdfmmj0ctrokgu/sswx1t6emdfmmj0ctrokgu-1.png)

## 少し実装してみる

ここまででTailwindCSSが動くことまでは確認できたのでもう少し試してみる。  
`app.component.html`を下記の通り修正した。  
基本はこれだけだが、`styled.scss`にhtml`{ font-size: 62.5 %}`だけ追記した。  
Tailwindのサイズが基本remで指定されてるので、デフォの16pxだと色々計算がしんどいので10pxにしたいため。

```html

<div class="h-screen">
  <header class="flex justify-center items-center bg-blue-400 py-4">
    <h1 class="text-5xl font-bold text-gray-100">Hello World!</h1>
  </header>
  <main class="flex flex-col justify-center items-center h-auto m-4">
    <article class="w-full">
      <h1 class="text-4xl font-bold">TailwindCSSを試してみる</h1>
      <section class="mt-1">
        <h1 class="text-3xl font-bold">概要</h1>
        <p class="text-xl">サンプルとして適当なhtmlを用意してスタイル当てていく。</p>
      </section>
      <section class="mt-1">
        <h1 class="text-3xl font-bold">TL;DR.</h1>
        <p class="text-xl">試してみてる。</p>
      </section>
      <section class="mt-1">
        <h1 class="text-3xl font-bold">まとめ</h1>
        <p class="text-xl">hogehoge</p>
      </section>
    </article>
  </main>
  <aside class="mx-4 mt-4">
    <h1 class="text-4xl font-bold">その他の記事</h1>
    <ul class="flex flex-wrap justify-around mx-1">
      <li class="flex flex-col items-center w-1/3 mt-4">
        <section>
          <img src="/assets/400x200.png">
          <h1 class="text-3xl font-bold text-center">他の記事1</h1>
          <p class="text-xl text-center">他の記事の概要</p>
        </section>
      </li>
      <li class="flex flex-col items-center rounded w-1/3 mt-4">
        <section>
          <img src="/assets/400x200.png">
          <h1 class="text-3xl font-bold text-center">他の記事2</h1>
          <p class="text-xl text-center">他の記事の概要</p>
        </section>
      </li>
      <li class="flex flex-col items-center rounded w-1/3 mt-4">
        <section>
          <img src="/assets/400x200.png">
          <h1 class="text-3xl font-bold text-center">他の記事3</h1>
          <p class="text-xl text-center">他の記事の概要</p>
        </section>
      </li>
      <li class="flex flex-col items-center rounded w-1/3 mt-4">
        <section>
          <img src="/assets/400x200.png">
          <h1 class="text-3xl font-bold text-center">他の記事4</h1>
          <p class="text-xl text-center">他の記事の概要</p>
        </section>
      </li>
      <li class="flex flex-col items-center rounded w-1/3 mt-4">
        <section>
          <img src="/assets/400x200.png">
          <h1 class="text-3xl font-bold text-center">他の記事5</h1>
          <p class="text-xl text-center">他の記事の概要</p>
        </section>
      </li>
    </ul>
  </aside>
</div>
```

これで下記の様な表示になる。  
ざっくり考えられるのはこのくらいなのでここまでにしておく。
![tailwindcssを使った画面のサンプル](/images/article/wx1t6emdfmmj0ctrokgu/sswx1t6emdfmmj0ctrokgu-2.png)

# まとめ

今回は前に試した時よりもちゃんとTailwindCSSと向き合ってみた。  
個人的な感想は以下の通り。

- Tailwindに乗っかり切るなら便利かと思った
    - 細かいCSSの調整をしない。多分自分で書いたcssのclassと入り交じると混沌とする
- CSS全く書けないからTailwindやるは難しい気がした
    - class名がcssそのままなので結局css書いてる気分になる
    - 多分UIパーツ組み合わせたいならbootstrapとかAngularならMaterial使う方が便利だと思う
- class名は自力で書くものじゃない
    - ぜっっったいエディタの補完使ったほうが良い(少なくともVSCodeにはある)
- デザイナーが用意した画面イメージを元に作る時には向いてない気がする
    - 細かい調整ができない(やらない方が良さそうな)ので、絶対この通り！みたいな場合には向いてないと思う
- 似たようなstyleを当てたいときにしんどみがある
    - これ何度も出てくるからmixinにしたいみたいなことができない様な気がする
    - 一応cssファイルにapplyで指定できるので頑張ればできる様な気もするが、1個目の話に戻るって感じ

やっぱりcss書いた方が早いんじゃ……って思うことも多々あるけど、  
おそらくTailwindCSSが解決してくれるのはそういうところじゃない気がするのでもう少し触ってみようかと思う。

# 参考リンク

- [Setup TailwindCSS in Angular the easy way \- DEV Community](https://dev.to/angular/setup-tailwindcss-in-angular-the-easy-way-1i5l)
- [Documentation \- Tailwind CSS](https://tailwindcss.com/docs)