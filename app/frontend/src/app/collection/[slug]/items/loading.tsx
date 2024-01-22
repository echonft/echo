import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { CollectionNftsSkeleton } from '@echo/ui/components/collection/nft/skeleton/collection-nfts-skeleton'

export default async function () {
  await initializeServerComponent()
  return <CollectionNftsSkeleton />
}
