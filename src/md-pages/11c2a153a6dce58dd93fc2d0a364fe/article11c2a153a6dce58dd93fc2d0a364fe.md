---
path: "/blog/11c2a153a6dce58dd93fc2d0a364fe"
date: "2021/06/06"
title: "JSで画像を扱うときのメモ"
tag: ["JavaScript", "React"]
thumbnailImage: "/images/ogp.png"
---

# はじめに
jsで画像を扱おうと思い調べ直したのでまとめる。

# TL;DR.
[今回書いたコード](https://github.com/Tetsuya-Minase/program-samples/tree/master/image-sample)

# 準備
Reactで試すのでプロジェクト作るところから。

```bash
$ npx create-react-app image-sample --template typescript
```

# 画像を読み込む
input要素の変更イベント見てそこから取ればOK。

```tsx
const App: React.VFC = () => {
  return (
    <label>
      画像: 
      <input type="file" accept="image/png, image/jpeg" onChange={ (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('e.target.files: ', e.target.files);
      }}/>
    </label>
  );
}
```

# 画像の値を取る
上記の通り画像のデータは`event.target.files[N]`の中にある。  
取れるパラメータについては下記参照。
[File - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/File)

```tsx
const App: React.VFC = () => {
  return (
    <label>
      画像: 
      <input type="file" accept="image/png, image/jpeg" onChange={ async (e: React.ChangeEvent<HTMLInputElement>) => {
        // filesはnullable
        if (e.target.files == null) {
          return;
        }
        console.log(e.target.files[0]);
        
        console.log('file name: ', e.target.files[0].name);
        console.log('file size: ', e.target.files[0].size);
        console.log('file type: ', e.target.files[0].type);
        console.log('ladtmodified: ', e.target.files[0].lastModified);
        // lastModifedDataはjs的には取得できるがtsで型定義がないためエラー履く
        // @ts-ignore
        console.log('ladtmodifiedDate: ', e.target.files[0].lastModifiedDate);
      }}/>
    </label>
  );
}
```

# 画像をbase64形式に変換する
バックエンドAPIに画像のデータを送るときもあると思う。
画像のデータの中身を読み取るには[FileReader](https://developer.mozilla.org/ja/docs/Web/API/FileReader)を使う。
画像を読み込んだあとになにかしたい場合、[FileReader.onload](https://developer.mozilla.org/ja/docs/Web/API/FileReader/onload)を上書きすればOK。  
読み込む形式によってメソッドが変わるが、base64の場合は[FileReaer.readAsDataURL](https://developer.mozilla.org/ja/docs/Web/API/FileReader/readAsDataURL)を使う。

```tsx
const App: React.VFC = () => {  
  return (
    <label>
      画像: 
      <input type="file" accept="image/png, image/jpeg" onChange={ async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) {
          return;
        }
				// 
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          console.log('e.target.result: ', e.target?.result);
        }
        reader.readAsDataURL(e.target.files[0]);
      }}/>
    </label>
  );
}
```

onloadを上書きしても良いが、[load](https://developer.mozilla.org/ja/docs/Web/API/FileReader/load_event)イベントをハンドリングしても同じ事ができる。

```tsx
const App: React.VFC = () => {  
  return (
    <label>
      画像: 
      <input type="file" accept="image/png, image/jpeg" onChange={ async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) {
          return;
        }
        const reader = new FileReader();
        reader.addEventListener('load', (event: ProgressEvent<FileReader>) => {
          // どちらでも取得可能
          console.log(event.target?.result);
          console.log(reader.result);
        });
        reader.readAsDataURL(e.target.files[0]);
      }}/>
    </label>
  );
}
```

## 注意
`readAsDataURL`で取得したbase64データは[データURL形式](https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)のためそのままではbase64文字列のみを取得できない。  
データ形式は`data:[<mediatype>][;base64],<data>`のため`,`で区切って取得すれば良い。

```tsx
reader.onload = (e: ProgressEvent<FileReader>) => {
  if (typeof e.target?.result === 'string') {
    // ,より後ろがbase64文字列なので区切って2番目を取得
    console.log('base64文字列：', e.target.result.split(',')[1]);
  }
}
```

# まとめ
今回はFile周りについて改めてまとめた。  
callback内で結果を取る必要があるため取得した値を使うにはひと工夫いりそう。  
(callback内で値を使う処理をするか、reactであればstateに入れて外で使うなど)

これくらいであればlibraryを使わなくてもできることがわかったので、jsだけでできることはできるだけjsで完結させていきたい。

# 関連リンク
- [File - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/File)
- [FileReader - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/FileReader)
- [FileReader.onload - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/FileReader/onload)
- [FileReader.readAsDataURL() - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/FileReader/readAsDataURL)
- [FileReader - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/FileReader)
- [データ URL - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
