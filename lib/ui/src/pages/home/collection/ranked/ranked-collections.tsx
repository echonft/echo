import { CollectionList } from '@echo/ui/components/collection/row/collection-list'
import { RankedCollectionsButtonContainer } from '@echo/ui/pages/home/collection/ranked/layout/ranked-collections-button-container'
import { RankedCollectionsLayout } from '@echo/ui/pages/home/collection/ranked/layout/ranked-collections-layout'
import { RankedCollectionsButton } from '@echo/ui/pages/home/collection/ranked/ranked-collections-button'
import type { CollectionWithRank } from '@echo/ui/types/collection-with-rank'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  collections: CollectionWithRank[]
}

export const RankedCollections: FunctionComponent<Props> = ({ collections }) => {
  if (isEmpty(collections)) {
    return null
  }
  return (
    <RankedCollectionsLayout>
      <CollectionList collections={collections} />
      <RankedCollectionsButtonContainer>
        <RankedCollectionsButton />
      </RankedCollectionsButtonContainer>
    </RankedCollectionsLayout>
  )
}
