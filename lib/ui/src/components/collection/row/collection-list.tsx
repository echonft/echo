import { CollectionRow } from '@echo/ui/components/collection/row/collection-row'
import { CollectionListLayout } from '@echo/ui/components/collection/row/layout/collection-list-layout'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  collections: CollectionWithRank[]
}

export const CollectionList: FunctionComponent<Props> = ({ collections }) => {
  return (
    <CollectionListLayout>
      {map(
        (collection) => (
          <CollectionRow key={collection.slug} collection={collection} />
        ),
        collections
      )}
    </CollectionListLayout>
  )
}
