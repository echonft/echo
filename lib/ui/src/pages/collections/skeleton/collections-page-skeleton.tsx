import { CollectionListSkeleton } from '@echo/ui/components/collection/row/skeleton/collection-list-skeleton'
import { CollectionsPageTitle } from '@echo/ui/pages/collections/collections-page-title'
import { CollectionsPageLayout } from '@echo/ui/pages/collections/layout/collections-page-layout'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const CollectionsPageSkeleton: FunctionComponent = () => {
  const t = useTranslations('collection.page')
  return (
    <CollectionsPageLayout>
      <CollectionsPageTitle title={t('title')} />
      <CollectionListSkeleton />
    </CollectionsPageLayout>
  )
}
