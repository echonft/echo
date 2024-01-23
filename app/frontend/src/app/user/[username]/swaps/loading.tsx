import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { UserSwapsSkeleton } from '@echo/ui/components/user/swap/skeleton/user-swaps-skeleton'

function render() {
  return <UserSwapsSkeleton />
}

export default withLocale(render)
