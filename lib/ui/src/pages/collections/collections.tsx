import { CollectionList } from '@echo/ui/components/collection/row/collection-list'
import { CollectionsLayout } from '@echo/ui/pages/collections/layout/collections-layout'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { type FunctionComponent } from 'react'

interface Props {
  collections: CollectionWithRank[]
}

export const Collections: FunctionComponent<Props> = ({ collections }) => {
  return (
    <CollectionsLayout>
      <CollectionList collections={collections} />
    </CollectionsLayout>
  )
}
