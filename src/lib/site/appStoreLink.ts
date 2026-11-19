/**
 * App Store リンクに Apple のキャンペーン計測パラメータを付けるヘルパ。
 *
 * App Store Connect の App Analytics は、リンクに付いた `ct`（キャンペーントークン）ごとに
 * 「製品ページの表示数 → ダウンロード数」を分けて集計する。LP のどの導線から来たかを
 * Apple 側で切り分けるため、設置位置ごとに違う `ct` を渡す。
 *
 * - `mt=8` … メディアタイプ（8 = iOS App）。Apple のキャンペーンリンク仕様どおり常に付ける。
 * - `pt`   … プロバイダトークン（App Store Connect のキャンペーン画面で払い出される数値 ID）。
 *            この関数は、渡されたときだけ付ける（値は下の `APP_STORE_PROVIDER_TOKEN`）。
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

/**
 * 開発者アカウントのプロバイダトークン（`pt`）。4 アプリとも同じアカウントなので共通。
 * SNS のストアリンク（`?pt=…&ct=…&mt=8`）で使っているものと同じ値。
 */
export const APP_STORE_PROVIDER_TOKEN = '128581523';

/**
 * Smart App Banner（iPhone・iPad の Safari でページの上に出る「App Store で表示／開く」の帯）の
 * `<meta name="apple-itunes-app">` に入れる値を作る。
 *
 * Next の `metadata.itunes` は `affiliate-data` を出せないので、各ページの
 * `metadata.other['apple-itunes-app']` にこの戻り値を渡す。
 *
 * `ct` は `<アプリ>_site_banner`（例: `hw_site_banner`）。バッジのリンクの `ct` と分けて、
 * 帯から入った分を App Store Connect の App Analytics で見分ける。
 * Apple のヘルプ（Campaign links › Smart App Banners）のとおり、`pt` と `ct` の両方を付ける。
 */
export function smartAppBannerContent(appId: string, ct: string): string {
  return `app-id=${appId}, affiliate-data=pt=${APP_STORE_PROVIDER_TOKEN}&ct=${ct}`;
}
