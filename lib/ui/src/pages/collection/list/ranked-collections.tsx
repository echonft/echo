import { type Collection } from '@echo/model/types/collection'
import { EmptyViewContent } from '@echo/ui/components/base/navigation/empty-view-content'
import { RankedCollectionsContainer } from '@echo/ui/pages/collection/list/layout/ranked-collections-container'
import { RankedCollectionsLayout } from '@echo/ui/pages/collection/list/layout/ranked-collections-layout'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  collections: Collection[]
  firstRank: number
}

export const RankedCollections: FunctionComponent<Props> = ({ collections, firstRank }) => {
  const t = useTranslations('collection.list')

  if (isEmpty(collections)) {
    return <EmptyViewContent message={t('empty')} />
  }
  return (
    <RankedCollectionsLayout>
      <RankedCollectionsContainer collections={collections} firstRank={firstRank} />
    </RankedCollectionsLayout>
  )
}
