import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { PageLayoutSkeleton } from '@echo/ui/components/layout/skeleton/page-layout-skeleton'

async function render() {
  await initializeServerComponent()
  return <PageLayoutSkeleton />
}

export default withLocale(render)
