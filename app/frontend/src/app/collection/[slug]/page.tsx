import { linkProvider } from '@echo/api/services/routing/link-provider'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { redirect } from 'next/navigation'

function render({ params }: NextParams<Record<'slug', string>>) {
  redirect(linkProvider.collection.items.get(params))
}

export default withLocale(render)
