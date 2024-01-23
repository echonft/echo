import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { UserSwapsSkeleton } from '@echo/ui/components/user/swap/skeleton/user-swaps-skeleton'

export default async function () {
  await initializeServerComponent()
  return <UserSwapsSkeleton />
}
