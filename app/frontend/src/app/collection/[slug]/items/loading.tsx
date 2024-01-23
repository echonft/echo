import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { CollectionNftsSkeleton } from '@echo/ui/components/collection/nft/skeleton/collection-nfts-skeleton'

async function render() {
  await initializeServerComponent()
  return <CollectionNftsSkeleton />
}

export default withLocale(render)
