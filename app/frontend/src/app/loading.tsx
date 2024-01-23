import { initializeServerComponent } from '@echo/frontend/lib/helpers/initialize-server-component'
import { PageLayoutSkeleton } from '@echo/ui/components/layout/skeleton/page-layout-skeleton'

export default async function () {
  await initializeServerComponent()
  return <PageLayoutSkeleton />
}
