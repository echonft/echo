import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { ProfileSwapsSkeleton } from '@echo/ui/components/profile/swap/skeleton/profile-swaps-skeleton'

export default async function () {
  await initializeServerComponent()
  return <ProfileSwapsSkeleton />
}
