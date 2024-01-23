import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { CollectionSwapsSkeleton } from '@echo/ui/components/collection/swap/skeleton/collection-swaps-skeleton'

async function render() {
  await initializeServerComponent()
  return <CollectionSwapsSkeleton />
}

export default withLocale(render)
