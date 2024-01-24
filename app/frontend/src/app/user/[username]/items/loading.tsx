import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { UserNftsSkeleton } from '@echo/ui/components/user/nft/skeleton/user-nfts-skeleton'

function render() {
  return <UserNftsSkeleton />
}

export default withLocale(render)
