import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { CollectionNftsSkeleton } from '@echo/ui/components/collection/nft/skeleton/collection-nfts-skeleton'

function render() {
  return <CollectionNftsSkeleton />
}

export default withLocale(render)
