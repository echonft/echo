import { linkProvider } from '@echo/api/services/routing/link-provider'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { redirect } from 'next/navigation'

async function render({ params }: NextParams<Record<'username', string>>) {
  await initializeServerComponent()
  redirect(linkProvider.user.items.get(params))
}

export default withLocale(render)
