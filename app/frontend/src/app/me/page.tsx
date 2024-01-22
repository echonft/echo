import { linkProvider } from '@echo/api/services/routing/link-provider'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { redirect } from 'next/navigation'

export default async function () {
  await initializeServerComponent()
  redirect(linkProvider.profile.items.get())
}
