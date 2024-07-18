import { MainLayoutSkeleton } from '@echo/ui/components/base/layout/skeleton/main-layout-skeleton'
import { PageLayoutSkeleton } from '@echo/ui/components/base/layout/skeleton/page-layout-skeleton'

export default function render() {
  return (
    <PageLayoutSkeleton>
      <MainLayoutSkeleton />
    </PageLayoutSkeleton>
  )
}
