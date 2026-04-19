'use client';

import { useState } from 'react';
import type { ExternalSourceAccount } from '@/lib/supabase/types-doublehub';
import { BookCompassLinkCard } from './_components/BookCompassLinkCard';
import { BookShelf } from './_components/BookShelf';

/**
 * /app/bookcompass/
 *
 * プロバイダ非依存の連携:
 *  1. DoubleHub にログイン済みのユーザーが BookCompass にもログインする
 *  2. BookCompass のセッションが取れたら external_source_accounts に
 *     `source_type='bookcompass'` / `external_user_key=<bcUserId>` を保存
 *  3. 以降、連携済みとして本棚などを表示
 */
export default function AppBookCompassPage() {
  const [link, setLink] = useState<ExternalSourceAccount | null>(null);
  const linked = !!link && link.link_status === 'active';

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold">BookCompass</h1>
        <p className="mt-2 text-sm text-text-muted">
          読書記録 BookCompass を DoubleHub にひも付けて、本棚を Web から
          確認できるようにします。
        </p>
      </header>

      <BookCompassLinkCard onLinked={setLink} />
      <BookShelf linked={linked} />
    </div>
  );
}
