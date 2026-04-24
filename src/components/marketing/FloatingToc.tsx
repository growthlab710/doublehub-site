'use client';

import { useEffect, useState } from 'react';
import { List, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * ブログ記事用のフローティング目次。
 *
 * 仕様:
 * - マウント時に article 内の h2 / h3 (id 付き) を走査して TOC を構築
 * - デスクトップ (lg 以上): 右下に Liquid Glass のピル型ボタンで常駐
 *   クリックでパネルが開閉
 * - モバイル: 同じく右下フローティング、タップでパネルが下から持ち上がる
 * - 現在位置のハイライトは IntersectionObserver で追尾
 *
 * Liquid Glass を最も自然に使える典型パターン（Apple HIG の
 * "floating, high-value elements" に該当）。
 */

type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function FloatingToc() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // 見出しの抽出（マウント後に DOM を走査）
  useEffect(() => {
    const article = document.querySelector('article');
    if (!article) return;
    const nodes = article.querySelectorAll<HTMLElement>('h2[id], h3[id]');
    const list: Heading[] = Array.from(nodes).map((el) => ({
      id: el.id,
      text: el.textContent?.trim() ?? '',
      level: el.tagName === 'H2' ? 2 : 3,
    }));
    setHeadings(list);
  }, []);

  // 現在位置の監視（スクロール追従）
  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // 上端から 120px のゾーンに入っている見出しをアクティブとみなす
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          );
          setActiveId(topmost.target.id);
        }
      },
      {
        rootMargin: '-120px 0px -70% 0px',
        threshold: 0,
      }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  // 見出しが 3 つ未満なら TOC を出さない（短すぎる記事では邪魔）
  if (headings.length < 3) return null;

  return (
    <>
      {/* トグルボタン — 常に右下固定。Liquid Glass のピル型 */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? '目次を閉じる' : '目次を開く'}
        aria-expanded={open}
        className={cn(
          'liquid-glass-heavy fixed bottom-6 right-6 z-40 flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-text transition-all duration-300',
          'hover:-translate-y-0.5 hover:shadow-lg',
          open && 'bg-primary/10 ring-2 ring-primary/30'
        )}
      >
        {open ? (
          <X className="h-4 w-4" />
        ) : (
          <List className="h-4 w-4 text-primary" />
        )}
        <span className="hidden sm:inline">{open ? '閉じる' : '目次'}</span>
      </button>

      {/* TOC パネル */}
      <div
        className={cn(
          'fixed bottom-24 right-6 z-40 w-[min(calc(100vw-3rem),320px)] origin-bottom-right',
          'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          open
            ? 'scale-100 opacity-100 pointer-events-auto'
            : 'scale-95 opacity-0 pointer-events-none'
        )}
      >
        <div className="liquid-glass-heavy max-h-[60vh] overflow-y-auto rounded-2xl p-5">
          <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-wider text-text-faint">
            このページの目次
          </p>
          <ul className="space-y-1.5">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-md px-2 py-1.5 text-sm leading-snug transition',
                    h.level === 3 && 'pl-5 text-xs',
                    activeId === h.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-text-muted hover:bg-white/40 hover:text-text dark:hover:bg-white/5'
                  )}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
