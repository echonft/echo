import { linkProvider } from '@echo/api/services/routing/link-provider'
import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { redirect } from 'next/navigation'

function render() {
  redirect(linkProvider.profile.items.get())
}

export default withLocale(render)
