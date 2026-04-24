import { cn } from '@/lib/utils';

/**
 * セクションのアイブロウ（英語ラベル）。
 *
 * 従来は `text-xs font-semibold uppercase tracking-[0.18em] text-primary`
 * という "AI 生成 LP の定番" な見せ方だったが、AI っぽさを避けるために
 * エディトリアル（雑誌の章扉）風のスタイリングに差し替える：
 *
 *   - 章番号（01 〜 06）を display フォントで大きめに置き、
 *     その後にアルファベットのラベルを同じ高さで並べる
 *   - ラベル色は primary（ティール）で、視認性とブランド感を両立
 *   - 章番号を省略したいセクションは `number` を渡さず、
 *     横ラインのついたラベルだけを出す
 *
 * Usage:
 *   <SectionEyebrow number="01" label="Problem" />
 *   <SectionEyebrow label="Spotlight" />
 *
 * 中央揃え/左揃えは `align` で制御（内部で block 化するため親が inline でも効く）。
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
        // 親が text-center でも確実に中央揃えになるよう、flex コンテナ側で
        // justify を制御する。inline-flex + mx-auto だと子幅によっては
        // 見た目が右にずれて見える問題があった。
        'flex items-baseline gap-3',
        align === 'center' ? 'justify-center' : 'justify-start',
        className
      )}
    >
      {number ? (
        <span className="font-display text-base font-semibold tracking-[-0.02em] text-primary">
          {number}
        </span>
      ) : (
        <span aria-hidden className="h-px w-8 shrink-0 bg-primary/60" />
      )}
      <span className="font-display text-sm font-semibold tracking-[0.02em] text-primary">
        {label}
      </span>
    </div>
  );
}
