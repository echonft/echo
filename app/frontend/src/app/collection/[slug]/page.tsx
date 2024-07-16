import { pathProvider } from '@echo/api/routing/path-provider'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { WithSlug } from '@echo/model/types/with-slug'
import { redirect } from 'next/navigation'

export default function render({ params }: NextParams<WithSlug>) {
  redirect(pathProvider.collection.items.get(params))
}
