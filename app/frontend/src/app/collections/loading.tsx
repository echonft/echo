import { HeaderSkeleton } from '@echo/ui/components/base/header/skeleton/header-skeleton'
import { MainSectionLayout } from '@echo/ui/components/base/layout/main-section-layout'
import { PageLayout } from '@echo/ui/components/base/layout/page-layout'
import { PageLayoutBackground } from '@echo/ui/constants/page-layout-background'
import { CollectionsPageSkeleton } from '@echo/ui/pages/collections/skeleton/collections-page-skeleton'

export default function render() {
  return (
    <PageLayout background={PageLayoutBackground.Collections}>
      <HeaderSkeleton />
      <MainSectionLayout>
        <CollectionsPageSkeleton />
      </MainSectionLayout>
    </PageLayout>
  )
}
