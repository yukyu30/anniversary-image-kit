# フレーム画像

記念画像で写真の上に重ねる「フレーム（リボン）」の透過 PNG を置く。

- 透過 PNG（背景は透明）。写真の上に重ねるので、リボン等の飾りだけが残る形が良い
- **縦横比はアプリが読み込んで自動判定**するので、サイズ指定は不要
- **透明な余白はトリミングしておく**と、ドラッグ配置したときにピタッと合う
- 複数色を用意でき、`src/site.config.ts` の `frames` に `{ value, label, swatch, src }` を並べる

例（同梱サンプルは「SumiSumi 2nd Anniversary」なので、別アバターでは差し替える）:

```
public/frames/blue.png    → frames[].src = "/frames/blue.png"
public/frames/orange.png  → frames[].src = "/frames/orange.png"
```
