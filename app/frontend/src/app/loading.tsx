import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { PageLayoutSkeleton } from '@echo/ui/components/layout/skeleton/page-layout-skeleton'

function render() {
  return <PageLayoutSkeleton />
}

export default withLocale(render)
