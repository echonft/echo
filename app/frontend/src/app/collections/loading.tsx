import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { CollectionsPageSkeleton } from '@echo/ui/pages/collections/skeleton/collections-page-skeleton'

function render() {
  return <CollectionsPageSkeleton />
}

export default withLocale(render)
