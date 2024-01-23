import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { CollectionSwapsSkeleton } from '@echo/ui/components/collection/swap/skeleton/collection-swaps-skeleton'

export default async function () {
  await initializeServerComponent()
  return <CollectionSwapsSkeleton />
}
