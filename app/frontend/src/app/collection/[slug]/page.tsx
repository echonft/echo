import { linkProvider } from '@echo/api/services/routing/link-provider'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import type { NextParams } from '@echo/frontend/lib/types/next-params'
import { redirect } from 'next/navigation'

export default async function ({ params }: NextParams<Record<'slug', string>>) {
  await initializeServerComponent()
  redirect(linkProvider.collection.items.get(params))
}
