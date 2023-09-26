import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { RankedCollectionsButtonContainer } from '@echo/ui/components/home/collection/ranked/layout/ranked-collections-button-container'
import { RankedCollectionsContainerLayout } from '@echo/ui/components/home/collection/ranked/layout/ranked-collections-container-layout'
import { RankedCollectionRow } from '@echo/ui/components/home/collection/ranked/ranked-collection-row'
import { RankedCollectionsButton } from '@echo/ui/components/home/collection/ranked/ranked-collections-button'
import { links } from '@echo/ui/constants/links'
import { CollectionTileDetails } from '@echo/ui/types/model/collection-tile-details'
import { clsx } from 'clsx'
import { addIndex, map } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  collections: Array<CollectionTileDetails>
  firstRank: number
}

export const RankedCollectionsContainer: FunctionComponent<Props> = ({ collections, firstRank }) => {
  const mapIndexed = addIndex<CollectionTileDetails>(map)
  return (
    <RankedCollectionsContainerLayout>
      {mapIndexed(({ name, slug, profilePictureUrl, swapsCount }, idx) => (
        <InternalLink key={slug} className={clsx('group', 'rounded')} path={links.collection.items(slug)}>
          <RankedCollectionRow
            rank={idx + firstRank}
            name={name}
            pictureUrl={profilePictureUrl}
            swapsCount={swapsCount}
          />
        </InternalLink>
      ))(collections)}
      <RankedCollectionsButtonContainer>
        <RankedCollectionsButton />
      </RankedCollectionsButtonContainer>
    </RankedCollectionsContainerLayout>
  )
}
