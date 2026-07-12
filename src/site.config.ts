/**
 * サイトの差し替え設定。アバターやイベントを変えるときは基本ここだけ編集する。
 * （テーマカラーは src/app/globals.css の @theme を編集）
 */
export const siteConfig = {
  // ── アバター / イベント ──────────────────────────────
  avatar: {
    nameJa: "墨澄", // 日本語名（ヒーロー大見出し・見出し等）
    nameEn: "SumiSumi", // 英字名
  },
  anniversary: {
    years: 2, // 署名に埋め込む周年数（画像に刻印される）
    labelJa: "2周年", // 表示ラベル
    labelEn: "2nd Anniversary",
  },
  hashtag: "#Sumi3D", // 投稿用ハッシュタグ

  // ── サイト情報 / メタデータ ──────────────────────────
  site: {
    url: "https://sumisumi-anniversary.lolipop-now.app", // 本番 URL（OG 絶対URLに使用）
    title: "墨澄2周年記念ジェネレーター",
    description:
      "アバター「墨澄 -SumiSumi-」の2周年をお祝い。お気に入りの写真に記念フレームを重ねて、記念画像をつくろう。",
    ogDescription:
      "墨澄 -SumiSumi- の2周年をお祝い。写真を選ぶだけで、記念画像ができあがります。",
  },

  // ── 画像生成の受付期限（JST）──────────────────────────
  // 過ぎると生成のみ不可（認証はいつでも可能）
  generation: {
    deadline: "2026-07-29T23:59:59+09:00",
    deadlineLabel: "2026年7月29日 23:59（JST）",
  },

  // ── フレーム（リボン）画像 ────────────────────────────
  // value=識別子, src=public/ 配下のパス, swatch=UI の丸, aspect=幅/高さ
  // フレーム画像は読み込んで縦横比を自動判定するので、サイズ指定は不要。
  // 透明な余白はトリミングしておくと位置がきれいに合う。
  frames: [
    { value: "blue", label: "青", swatch: "#2f63e8", src: "/frames/blue.png" },
    {
      value: "orange",
      label: "オレンジ",
      swatch: "#f0971b",
      src: "/frames/orange.png",
    },
  ],

  // チェキの白フチ（写真幅に対する割合）: 上下左右 / 下部の厚み
  cheki: { border: 0.04, bottom: 0.2 },

  // ── ヒーロー（3D）──────────────────────────────────
  hero: {
    standingImage: "/sumusumi-pose.webp", // 立ち絵（透過 PNG/WEBP）
    fallingPiece: "/surisurikun.svg", // 紙吹雪に紛れて落ちるマスコット（空文字で無効）
  },
  hologramWord: "SumiSumi", // 認証チェキのホログラムに敷き詰める語

  // ── トップの「しくみ」──────────────────────────────
  steps: [
    {
      no: "01",
      title: "フレームの色を選ぶ",
      body: "青とオレンジ、2周年をお祝いする2色から好きな方を選べます。",
    },
    {
      no: "02",
      title: "写真をアップロード",
      body: "お気に入りの1枚に、2周年記念のフレームが重なります。",
    },
    {
      no: "03",
      title: "ダウンロードして投稿",
      body: "できた記念画像を保存して、SNS でお祝いをシェアしよう。",
    },
  ],

  // ── 「〜とは？」セクション ────────────────────────────
  about: {
    heading: "墨澄とは？",
    // 本文は Markdown で自由に記述できる（表・リスト・リンク対応）。
    // 下記は墨澄のサンプル。別アバターでは差し替える。
    bodyMarkdown: `
ソーシャル VR 向けのオリジナル3Dアバター。3Dグッズ作成ツールで作った T シャツを手軽に着せられます。

`,
    aboutUrl: "https://lp.suzuri.jp/3d-t-shirt",
    aboutLabel: "墨澄について詳しく",
    // ダウンロード先（複数可）。brand で色が決まる: "suzuri"=青 / "booth"=BOOTHロゴ色
    downloads: [
      {
        label: "SUZURI でダウンロード",
        url: "https://suzuri.jp/surisurikun/digital_products/53046",
        brand: "suzuri",
      },
      // 例) BOOTH で配布している場合:
      // { label: "BOOTH でダウンロード", url: "https://booth.pm/ja/items/xxxx", brand: "booth" },
    ],
  },

  // ── フッター ───────────────────────────────────────
  footer: {
    note: "これはファンによる非公式サイトです。",
    githubUrl: "https://github.com/yukyu30/anniversary-image-kit",
  },
} as const;

export type FrameOption = (typeof siteConfig.frames)[number];
