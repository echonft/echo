import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { ProfileNftsSkeleton } from '@echo/ui/components/profile/nft/skeleton/profile-nfts-skeleton'

async function render() {
  await initializeServerComponent()
  return <ProfileNftsSkeleton />
}

export default withLocale(render)
