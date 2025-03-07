import { HeaderSkeleton } from '@echo/ui/components/base/header/skeleton/header-skeleton'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { MainSectionSkeleton } from '@echo/ui/components/base/layout/skeleton/main-section-skeleton'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'

export default function render() {
  return (
    <PageLayout background={PageLayoutBackground.Home}>
      <HeaderSkeleton />
      <MainSectionSkeleton />
    </PageLayout>
  )
}
