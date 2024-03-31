import { linkProvider } from '@echo/api/routing/link-provider'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import type { WithUsername } from '@echo/model/types/with-username'
import { redirect } from 'next/navigation'

function render({ params }: NextParams<WithUsername>) {
  redirect(linkProvider.user.items.get(params))
}

export default withLocale(render)
