import { SectionLayout } from '@echo/ui/components/base/layout/section-layout'
import { PageLayoutSkeleton } from '@echo/ui/components/base/layout/skeleton/page-layout-skeleton'
import { CollectionsPageSkeleton } from '@echo/ui/pages/collections/skeleton/collections-page-skeleton'

export default function render() {
  return (
    <PageLayoutSkeleton>
      <SectionLayout>
        <CollectionsPageSkeleton />
      </SectionLayout>
    </PageLayoutSkeleton>
  )
}
