import type { Collection } from '@echo/model/types/collection'
import { CollectionsPageTitle } from '@echo/ui/pages/collection/list/collections-page-title'
import { CollectionsPageHeaderLayout } from '@echo/ui/pages/collection/list/layout/collections-page-header-layout'
import { CollectionsPageLayout } from '@echo/ui/pages/collection/list/layout/collections-page-layout'
import { RankedCollections } from '@echo/ui/pages/collection/list/ranked-collections'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  collections: Collection[]
}

export const CollectionsPage: FunctionComponent<Props> = ({ collections }) => {
  const t = useTranslations('collection.list')
  return (
    <CollectionsPageLayout>
      <CollectionsPageHeaderLayout>
        <CollectionsPageTitle title={t('title')} />
      </CollectionsPageHeaderLayout>
      <RankedCollections collections={collections} firstRank={1} />
    </CollectionsPageLayout>
  )
}
