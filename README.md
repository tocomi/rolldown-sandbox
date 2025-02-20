# Rolldown Sandbox

`1.0.0-beta.3` の段階でどれくらい動かせるんだろうと試してみたやつ

[作業ログはこちら](https://zenn.dev/tocomi/scraps/f92e948c9579d8)

## devServer 起動

```bash
pnpm i
pnpm build:dev-server
pnpm dev:app
```

で多分動くと思う

## ビルド比較してみた

適当に色んなライブラリを import したコンポーネントに対して、production build のビルド時間とバンドルサイズを比較

| ライブラリ | min | max | avg | bundle size | 備考 |
| --- | --- | --- | --- | --- | --- |
| rolldown | 0.54s | 0.58s | 0.55s | 1.7MB | serve したところ jotai でエラー |
| rspack | 5.29s | 5.54s | 5.39s | 1.6MB | |
| webpack | 19.18s | 20.17s | 19.51s | 1.5MB | |
