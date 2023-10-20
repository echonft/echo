import { type Collection } from '@echo/model/types/collection'
import { RankedCollectionsContainer } from '@echo/ui/components/home/collection/ranked/layout/ranked-collections-container'
import { RankedCollectionsLayout } from '@echo/ui/components/home/collection/ranked/layout/ranked-collections-layout'
import { type FunctionComponent } from 'react'

interface Props {
  collections: Collection[]
  firstRank: number
}

export const RankedCollections: FunctionComponent<Props> = ({ collections, firstRank }) => {
  return (
    <RankedCollectionsLayout>
      <RankedCollectionsContainer collections={collections} firstRank={firstRank} />
    </RankedCollectionsLayout>
  )
}
