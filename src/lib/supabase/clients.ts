/**
 * Supabase クライアントの集約エクスポート。
 *
 * 使い分け:
 *  - ブラウザ / Client Component  → `getBrowserDoubleHub` / `getBrowserBookCompass` / `getBrowserTrainNote`
 *  - Server Component / Route    → `getServerDoubleHub` / `getServerUser`
 *
 * 型をそれぞれ再エクスポートして、Repository 層から
 * `import type { Database } from '@/lib/supabase/clients'` のような混線が
 * 起きないように型は各プロジェクトのファイルから直接 import する運用とする。
 *
 * 参照: docs/web-renewal/04-data-layer.md
 */

export {
  getBrowserDoubleHub,
  getBrowserBookCompass,
  getBrowserTrainNote,
} from './client';

export { getServerDoubleHub, getServerUser } from './server';
