/**
 * App Store リンクに Apple のキャンペーン計測パラメータを付けるヘルパ。
 *
 * App Store Connect の App Analytics は、リンクに付いた `ct`（キャンペーントークン）ごとに
 * 「製品ページの表示数 → ダウンロード数」を分けて集計する。LP のどの導線から来たかを
 * Apple 側で切り分けるため、設置位置ごとに違う `ct` を渡す。
 *
 * - `mt=8` … メディアタイプ（8 = iOS App）。Apple のキャンペーンリンク仕様どおり常に付ける。
 * - `pt`   … プロバイダトークン（App Store Connect のキャンペーン画面で払い出される数値 ID）。
 *            コード側に値を持っていないので現状は付けていない。取得できたら `pt` に渡すだけで付く。
 *            `pt` が無くても `ct` 別の計測自体は App Analytics に出る。
 *
 * 既存のクエリ（`itscg` / `itsct` など）は壊さず、同名キーだけを上書きする。
 */
export function withAppStoreCampaign(
  appStoreUrl: string,
  { ct, pt }: { ct: string; pt?: string },
): string {
  const url = new URL(appStoreUrl);
  url.searchParams.set('ct', ct);
  url.searchParams.set('mt', '8');
  if (pt) url.searchParams.set('pt', pt);
  return url.toString();
}
