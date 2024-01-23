import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { ProfileNftsSkeleton } from '@echo/ui/components/profile/nft/skeleton/profile-nfts-skeleton'

function render() {
  return <ProfileNftsSkeleton />
}

export default withLocale(render)
