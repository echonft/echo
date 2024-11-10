import { HeaderSkeleton } from '@echo/ui/components/base/header/skeleton/header-skeleton'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { MainSectionSkeleton } from '@echo/ui/components/base/layout/skeleton/main-section-skeleton'

export default function render() {
  return (
    <PageLayout>
      <HeaderSkeleton />
      <MainSectionSkeleton />
    </PageLayout>
  )
}
