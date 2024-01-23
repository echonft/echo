import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { UserNftsSkeleton } from '@echo/ui/components/user/nft/skeleton/user-nfts-skeleton'

async function render() {
  await initializeServerComponent()
  return <UserNftsSkeleton />
}

export default withLocale(render)
