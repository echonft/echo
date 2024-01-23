import { withLocale } from '@echo/frontend/lib/decorators/with-locale'
import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { UserSwapsSkeleton } from '@echo/ui/components/user/swap/skeleton/user-swaps-skeleton'

async function render() {
  await initializeServerComponent()
  return <UserSwapsSkeleton />
}

export default withLocale(render)
