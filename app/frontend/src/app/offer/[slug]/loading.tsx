import { HeaderSkeleton } from '@echo/ui/components/base/header/skeleton/header-skeleton'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'

export default function OfferLoading() {
  return (
    <PageLayout>
      <HeaderSkeleton />
      {/* TODO Skeleton view for offer details */}
    </PageLayout>
  )
}
