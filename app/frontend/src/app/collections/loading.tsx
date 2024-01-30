import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { CollectionsPageSkeleton } from '@echo/ui/pages/collection/list/skeleton/collections-page-skeleton'

function render() {
  return <CollectionsPageSkeleton />
}

export default withLocale(render)
