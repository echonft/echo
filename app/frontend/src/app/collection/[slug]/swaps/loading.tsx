import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { CollectionSwapsSkeleton } from '@echo/ui/components/collection/swap/skeleton/collection-swaps-skeleton'

function render() {
  return <CollectionSwapsSkeleton />
}

export default withLocale(render)
