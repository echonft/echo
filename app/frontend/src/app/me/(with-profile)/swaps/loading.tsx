import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { ProfileSwapsSkeleton } from '@echo/ui/components/profile/swap/skeleton/profile-swaps-skeleton'

function render() {
  return <ProfileSwapsSkeleton />
}

export default withLocale(render)
