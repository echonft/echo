import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { UserNftsSkeleton } from '@echo/ui/components/user/nft/skeleton/user-nfts-skeleton'

export default async function () {
  await initializeServerComponent()
  return <UserNftsSkeleton />
}
