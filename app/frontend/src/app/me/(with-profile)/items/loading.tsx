import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { ProfileNftsSkeleton } from '@echo/ui/components/profile/nft/skeleton/profile-nfts-skeleton'

export default async function () {
  await initializeServerComponent()
  return <ProfileNftsSkeleton />
}
