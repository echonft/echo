import { type Collection } from '@echo/model/types/collection'
import { RankedCollectionsContainer } from '@echo/ui/pages/collection/list/layout/ranked-collections-container'
import { RankedCollectionsContainerLayout } from '@echo/ui/pages/collection/list/layout/ranked-collections-container-layout'
import { RankedCollectionsLayout } from '@echo/ui/pages/collection/list/layout/ranked-collections-layout'
import { RankedCollectionsButtonContainer } from '@echo/ui/pages/home/collection/ranked/layout/ranked-collections-button-container'
import { RankedCollectionsButton } from '@echo/ui/pages/home/collection/ranked/ranked-collections-button'
import { type FunctionComponent } from 'react'

interface Props {
  collections: Collection[]
  firstRank: number
}

export const HomepageRankedCollections: FunctionComponent<Props> = ({ collections, firstRank }) => {
  return (
    <RankedCollectionsLayout>
      <RankedCollectionsContainerLayout>
        <RankedCollectionsContainer collections={collections} firstRank={firstRank} />
        <RankedCollectionsButtonContainer>
          <RankedCollectionsButton />
        </RankedCollectionsButtonContainer>
      </RankedCollectionsContainerLayout>
    </RankedCollectionsLayout>
  )
}
