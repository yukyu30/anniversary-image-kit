import { readdirSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Hero } from "@/components/hero/Hero";
import { siteConfig } from "@/site.config";

const { avatar, anniversary, about, steps, footer, generation } = siteConfig;

// ダウンロード先ボタンのブランド色（SUZURI=青 / BOOTH=ロゴ色）
const DOWNLOAD_BRAND_COLOR: Record<string, string> = {
  suzuri: "#2456e6",
  booth: "#fc4d50",
};

/** public/gallery のチェキ画像一覧（背景ウォール用） */
function galleryImages(): string[] {
  try {
    return readdirSync(join(process.cwd(), "public/gallery"))
      .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
      .sort()
      .map((f) => `/gallery/${f}`);
  } catch {
    return [];
  }
}

export default function Home() {
  const gallery = galleryImages();
  const title = `${avatar.nameJa}${anniversary.labelJa}`;
  return (
    <main className="flex-1">
      {/* ヒーロー: 紙吹雪・立ち絵・大見出しを 3D で立体配置（ドラッグで視差） */}
      <section className="relative overflow-hidden bg-brand-yellow">
        <h1 className="sr-only">{`${avatar.nameJa} ${anniversary.labelJa}記念`}</h1>
        <Hero gallery={gallery} />

        <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pb-14 text-center">
          <p className="text-lg font-black tracking-wide text-zinc-900 md:text-2xl">
            写真を選んで、<span className="text-brand-red">{title}</span>
            の記念画像をつくろう。
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/generate"
              className="rounded-full bg-zinc-900 px-9 py-4 text-lg font-bold text-white transition hover:bg-zinc-700"
            >
              記念画像をつくる
            </Link>
            <Link
              href="/verify"
              className="rounded-full border-2 border-zinc-900 px-9 py-4 text-lg font-bold text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
            >
              記念画像を認証する
            </Link>
          </div>
          <p className="mt-5 text-xs font-medium text-zinc-700">
            画像の生成は{" "}
            <span className="font-black">{generation.deadlineLabel}</span>{" "}
            まで。認証はいつでもできます。
          </p>
        </div>
      </section>

      {/* しくみ */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <h2 className="display text-center text-2xl md:text-3xl">しくみ</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.no} className="rounded-3xl bg-brand-blue p-7 text-white">
              <p className="wordmark text-4xl text-white/80">{step.no}</p>
              <h3 className="mt-3 text-lg font-black">{step.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/85">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 〜とは？ */}
      <section className="border-t border-zinc-100 bg-zinc-50">
        <div className="mx-auto w-full max-w-3xl px-6 py-16">
          <h2 className="display text-center text-2xl md:text-3xl">
            {about.heading}
          </h2>

          <div className="prose prose-sm prose-zinc mx-auto mt-8 max-w-none prose-a:text-brand-blue prose-th:text-left">
            <Markdown remarkPlugins={[remarkGfm]}>
              {about.bodyMarkdown}
            </Markdown>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={about.aboutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-zinc-900 px-7 py-3 font-bold text-zinc-900 transition hover:bg-zinc-900 hover:text-white"
            >
              {about.aboutLabel}
            </a>
            {about.downloads.map((d) => (
              <a
                key={d.url}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-7 py-3 font-bold text-white transition hover:brightness-95"
                style={{
                  backgroundColor: DOWNLOAD_BRAND_COLOR[d.brand] ?? "#18181b",
                }}
              >
                {d.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA（青ブロック） */}
      <section className="bg-brand-blue">
        <div className="mx-auto w-full max-w-3xl px-6 py-14 text-center text-white">
          <h2 className="display text-xl md:text-2xl">さっそくお祝いしよう</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-relaxed text-white/90">
            写真とフレームの色を選ぶだけ。数秒で{title}の記念画像ができあがります。
          </p>
          <div className="mt-7">
            <Link
              href="/generate"
              className="inline-block rounded-full bg-white px-8 py-3.5 font-bold text-brand-blue transition hover:bg-white/90"
            >
              記念画像をつくる
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 px-6 py-6 text-center text-xs font-medium text-zinc-400">
          <p>{footer.note}</p>
          <a
            href={footer.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-bold text-zinc-500 hover:text-zinc-800"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}
