'use client'
import { Collections } from '@echo/ui/pages/collections/collections'
import { CollectionsPageTitle } from '@echo/ui/pages/collections/collections-page-title'
import { CollectionsPageLayout } from '@echo/ui/pages/collections/layout/collections-page-layout'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  collections: CollectionWithRank[]
}

export const CollectionsPage: FunctionComponent<Props> = ({ collections }) => {
  const t = useTranslations('collection.page')

  return (
    <CollectionsPageLayout>
      <CollectionsPageTitle title={t('title')} />
      <Collections collections={collections} />
    </CollectionsPageLayout>
  )
}
