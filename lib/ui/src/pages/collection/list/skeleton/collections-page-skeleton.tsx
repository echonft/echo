import { CollectionsPageTitle } from '@echo/ui/pages/collection/list/collections-page-title'
import { CollectionsPageHeaderLayout } from '@echo/ui/pages/collection/list/layout/collections-page-header-layout'
import { CollectionsPageLayout } from '@echo/ui/pages/collection/list/layout/collections-page-layout'
import { RankedCollectionsContainerLayout } from '@echo/ui/pages/collection/list/layout/ranked-collections-container-layout'
import { RankedCollectionsLayout } from '@echo/ui/pages/collection/list/layout/ranked-collections-layout'
import { CollectionsContainerSkeleton } from '@echo/ui/pages/collection/list/skeleton/collections-container-skeleton'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const CollectionsPageSkeleton: FunctionComponent = () => {
  const t = useTranslations('collection.list')
  return (
    <CollectionsPageLayout>
      <CollectionsPageHeaderLayout>
        <CollectionsPageTitle title={t('title')} />
      </CollectionsPageHeaderLayout>
      <RankedCollectionsLayout>
        <RankedCollectionsContainerLayout>
          <CollectionsContainerSkeleton />
        </RankedCollectionsContainerLayout>
      </RankedCollectionsLayout>
    </CollectionsPageLayout>
  )
}
