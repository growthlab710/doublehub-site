'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * VideoSlot — スマホ画面のような縦型キャプチャを「動画 → 画像フォールバック」の順で出すスロット。
 *
 * 想定アセット（user が iMovie で書き出して public/videos/ に置く想定）:
 *   - MP4 / H.264 / AAC（音声は無音で OK）
 *   - 5〜12 秒、ループ前提のループ尾合わせ
 *   - 9:16 の縦型（iPhone 想定）720〜1080px 短辺
 *   - ファイルサイズ目安: 1〜3 MB（Web 配信用に圧縮）
 *
 * 動作:
 *   - videoSrc が用意されていれば <video> を再生（muted / autoPlay / loop / playsInline）
 *   - 動画が読み込めない・存在しない場合は poster 画像（既存スクショ）にフォールバック
 *   - `prefers-reduced-motion` をリスペクトして自動再生を抑制
 */

export interface VideoSlotProps {
  /** 動画ファイルパス（public 以下の絶対パス）。未指定 / 読込失敗時は poster にフォールバック。 */
  videoSrc?: string;
  /** poster（フォールバック）画像。動画が無い場合や読込失敗時に表示。 */
  posterSrc: string;
  /** アクセシビリティ用 alt テキスト（動画にはタイトル相当として、画像には alt として使用）。 */
  alt: string;
  /** 動画/画像の幅（next/image 用）。 */
  width: number;
  /** 動画/画像の高さ（next/image 用）。 */
  height: number;
  /** sizes 属性（next/image のレスポンシブ用）。 */
  sizes?: string;
  /** 追加 className（外側コンテナに付与）。 */
  className?: string;
  /** 動画/画像本体に直接付ける className（rounded など）。 */
  mediaClassName?: string;
  /** loading 戦略。デフォルト 'lazy'。LCP 近傍は 'eager'。 */
  loading?: 'eager' | 'lazy';
  /** preload 戦略。デフォルト 'metadata'（再生前のヘッダだけ取得）。 */
  preload?: 'auto' | 'metadata' | 'none';
  /** next/image priority を渡す（poster 側）。 */
  priority?: boolean;
}

export function VideoSlot({
  videoSrc,
  posterSrc,
  alt,
  width,
  height,
  sizes,
  className,
  mediaClassName,
  loading = 'lazy',
  preload = 'metadata',
  priority = false,
}: VideoSlotProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    if (typeof window === 'undefined') return;
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) {
      videoRef.current.removeAttribute('autoplay');
      videoRef.current.pause();
    }
  }, []);

  const showVideo = !!videoSrc && !videoFailed;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {showVideo ? (
        <video
          ref={videoRef}
          className={cn('h-full w-full object-cover', mediaClassName)}
          width={width}
          height={height}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload={preload}
          aria-label={alt}
          onError={() => setVideoFailed(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <Image
          src={posterSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={priority ? undefined : loading}
          priority={priority}
          className={cn('h-full w-full object-cover', mediaClassName)}
        />
      )}
    </div>
  );
}
