import { linkProvider } from '@echo/api/services/routing/link-provider'
import { type Collection } from '@echo/model/types/collection'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { RankedCollectionsButtonContainer } from '@echo/ui/pages/home/collection/ranked/layout/ranked-collections-button-container'
import { RankedCollectionsContainerLayout } from '@echo/ui/pages/home/collection/ranked/layout/ranked-collections-container-layout'
import { RankedCollectionRow } from '@echo/ui/pages/home/collection/ranked/ranked-collection-row'
import { RankedCollectionsButton } from '@echo/ui/pages/home/collection/ranked/ranked-collections-button'
import { clsx } from 'clsx'
import { addIndex, map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  collections: Collection[]
  firstRank: number
}

export const RankedCollectionsContainer: FunctionComponent<Props> = ({ collections, firstRank }) => {
  const mapIndexed = addIndex<Collection>(map)
  return (
    <RankedCollectionsContainerLayout>
      {mapIndexed(({ name, slug, profilePictureUrl, swapsCount }, idx) => (
        <InternalLink
          key={slug}
          className={clsx('group', 'rounded')}
          path={linkProvider.collection.items.get({ slug })}
        >
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
