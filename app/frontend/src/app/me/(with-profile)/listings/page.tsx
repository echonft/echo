import { linkProvider } from '@echo/api/services/routing/link-provider'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { redirect } from 'next/navigation'

async function render() {
  await initializeServerComponent()
  redirect(linkProvider.profile.listingsCreated.get())
}

export default withLocale(render)
