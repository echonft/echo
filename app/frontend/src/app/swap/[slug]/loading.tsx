import { HeaderSkeleton } from '@echo/ui/components/base/header/skeleton/header-skeleton'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'

export default function SwapLoading() {
  return (
    <PageLayout>
      <HeaderSkeleton />
      {/* TODO Skeleton view for swap details */}
    </PageLayout>
  )
}
