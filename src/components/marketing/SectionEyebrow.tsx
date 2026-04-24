import { cn } from '@/lib/utils';

/**
 * セクションのアイブロウ（英語ラベル）。
 *
 * 従来は `text-xs font-semibold uppercase tracking-[0.18em] text-primary`
 * という "AI 生成 LP の定番" な見せ方だったが、AI っぽさを避けるために
 * エディトリアル（雑誌の章扉）風のスタイリングに差し替える：
 *
 *   - 章番号（Ch.01 など）を display フォントで大きめに置き、
 *     その後にアルファベット小文字のラベルを同じ高さで並べる
 *   - 色はアクセントではなく text-muted ベースで、AI 生成 LP に多い
 *     「派手なアクセント色の小さい英語」を避ける
 *   - 章番号を省略したいセクションは `number` を渡さず、ラベルだけ出す
 *
 * Usage:
 *   <SectionEyebrow number="01" label="Problem" />
 *   <SectionEyebrow label="Spotlight" />
 *
 * 配置は親セクション側の align で制御（中央揃え/左揃え両方に対応）。
 */

type Align = 'left' | 'center';

export function SectionEyebrow({
  number,
  label,
  align = 'center',
  className,
}: {
  number?: string;
  label: string;
  align?: Align;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-baseline gap-3',
        align === 'center' && 'mx-auto',
        className
      )}
    >
      {number ? (
        <span className="font-display text-sm font-semibold tracking-[-0.02em] text-primary">
          Ch.{number}
        </span>
      ) : (
        <span aria-hidden className="h-px w-8 bg-text-faint/60" />
      )}
      <span className="font-display text-sm font-medium tracking-[0.01em] text-text-muted">
        {label}
      </span>
    </div>
  );
}
