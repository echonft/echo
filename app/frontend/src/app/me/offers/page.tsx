import { linkProvider } from '@echo/api/routing/link-provider'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { redirect } from 'next/navigation'

function render() {
  redirect(linkProvider.profile.offersCreated.get())
}

export default withLocale(render)
