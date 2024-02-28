import { linkProvider } from '@echo/api/routing/link-provider'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { WithSlug } from '@echo/model/types/with-slug'
import { redirect } from 'next/navigation'

function render({ params }: NextParams<WithSlug>) {
  redirect(linkProvider.collection.items.get(params))
}

export default withLocale(render)
