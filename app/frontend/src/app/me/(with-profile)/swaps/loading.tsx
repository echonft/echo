import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { ProfileSwapsSkeleton } from '@echo/ui/components/profile/swap/skeleton/profile-swaps-skeleton'

async function render() {
  await initializeServerComponent()
  return <ProfileSwapsSkeleton />
}

export default withLocale(render)
