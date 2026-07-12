# anniversary-image-kit

好きなアバター・キャラクターの「周年記念」を、写真にフレームを重ねた**チェキ風の記念画像**にして配れる Next.js テンプレート。QR コード＋**Ed25519 署名**で「このサイトが発行した本物」を後から検証できる。

[**Deploy with ロリポップ！デプロイナウ**](https://lolipop.jp/deploy-now)

- **つくる**: ID を入れてフレーム色と写真を選ぶ → チェキ風カードに合成。フレーム（リボン）はドラッグで移動・リサイズ、下部に QR と ハッシュタグ・ID を焼き込む
- **認証**: 画像の QR を読むと署名を検証。本物だけが立体的な光沢チェキとして表示され、ID・周年・発行時刻が復元される
- 3D ヒーロー（紙吹雪＋立ち絵）・OG 画像・iPhone のワンタップ保存・X 共有 つき

## クイックスタート

```bash
npm install
cp .env.example .env.local
# ↓ で鍵ペアを生成して .env.local に貼る（下記「鍵の生成」）
npm run dev           # http://localhost:3000
```

## カスタマイズは基本 3 か所だけ

| 変える対象 | 場所 |
| --- | --- |
| **文言・アバター名・周年・ハッシュタグ・URL・期限・「〜とは？」など** | `src/site.config.ts` |
| **テーマカラー**（黄・青・オレンジ・赤） | `src/app/globals.css` の `@theme` |
| **画像素材**（フレーム・立ち絵・OG・favicon・ギャラリー） | `public/` と `src/app/` |

### 1. 設定 `src/site.config.ts`

アバター名・周年ラベル・周年数・ハッシュタグ・サイト URL/タイトル・生成期限・フレーム一覧・トップの文章・「〜とは？」などをまとめて編集する。ここを書き換えるだけで大半が差し替わる。

### 2. 画像を差し替える（読み込むだけで“いい感じ”に）

すべて**画像を置くだけ**で、サイズは読み込んで動的に判定する。

- **フレーム** `public/frames/*.png`（透過 PNG／余白はトリミング）→ `site.config.ts` の `frames[]` にパスを列挙。縦横比は自動
- **立ち絵** `public/`（透過 PNG/WEBP）→ `hero.standingImage`
- **落ちてくるマスコット**（任意）→ `hero.fallingPiece`（空文字で無効）
- **OG 画像** `src/app/opengraph-image.png`（1200×630 推奨）
- **favicon** `src/app/icon.svg`
- **ギャラリー背景** `public/gallery/*.png|jpg|webp`（枚数自由、傾けて背景に敷かれる）

> 同梱サンプルは「墨澄 -SumiSumi-」のものです。別アバターで使うときは必ず差し替えてください（フレームには「SumiSumi 2nd Anniversary」の文字が入っています）。

## 署名の仕組み（発行＝秘密鍵 / 検証＝公開鍵）

`/api/issue` が `{周年, ID, 発行時刻}` を **秘密鍵で Ed25519 署名** → `payload + 署名(64B)` を QR に埋め込む。`/api/verify` が **公開鍵で検証**して本物判定する。秘密鍵はサーバーだけが持つので、他人は正しい署名を作れない。公開鍵は公開してよく、サイトが無くても第三者が独立に検証できる（検証スクリプトは自サイトの README に載せると良い）。

### 鍵の生成（OS 非依存・Node だけで完結）

macOS / Linux / Windows どれでも、Node があれば動く：

```bash
node -e 'const c=require("crypto").webcrypto;(async()=>{const k=await c.subtle.generateKey({name:"Ed25519"},true,["sign","verify"]);console.log("ANNIV_PRIVATE_KEY="+Buffer.from(await c.subtle.exportKey("pkcs8",k.privateKey)).toString("base64"));console.log("ANNIV_PUBLIC_KEY="+Buffer.from(await c.subtle.exportKey("raw",k.publicKey)).toString("base64"))})()'
```

出力の 2 行を `.env.local`（本番は環境変数）に設定する。`ANNIV_PRIVATE_KEY` は秘密、`ANNIV_PUBLIC_KEY` は公開してよい。

## デプロイ（ロリポップ！デプロイナウ）

```bash
npm install -g lolipop
lolipop deploy --name <お好きな名前> --framework next
```

- リモートビルドは **npm** 前提（`package-lock.json` を同梱済み。依存を変えたら `npm install --package-lock-only` で更新）
- **`.env` は参照されない** → ダッシュボードの「環境変数」に `ANNIV_PRIVATE_KEY` と `ANNIV_PUBLIC_KEY` を設定
- `next.config.ts` の `output: "standalone"` / `images.unoptimized` はデプロイナウの要件
- デプロイ後の疎通確認: `node scripts/smoke-production.mjs <公開URL>`

## 開発コマンド

```bash
npm run dev     # 開発サーバー
npm test        # ユニット/コンポーネントテスト（Vitest）
npm run build   # 本番ビルド（standalone）
```

## 技術

Next.js (App Router) / TypeScript / Tailwind CSS / three.js (@react-three/fiber, drei) / qrcode / jsqr / Web Crypto (Ed25519) / react-markdown。

「〜とは？」セクションの本文は `src/site.config.ts` の `about.bodyMarkdown` に **Markdown** で書ける（表・リスト・リンク対応）。同梱のものは墨澄のサンプルなので差し替えて使う。

## ライセンス

- **ソースコードは [MIT](./LICENSE)**。
- ただし 画像・SVG・イラストのアセットは MIT 対象外となります
- 画像データ、SVGデータは各権利者に帰属します
