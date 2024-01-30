import { linkProvider } from '@echo/api/routing/link-provider'
import { type Collection } from '@echo/model/types/collection'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { RankedCollectionsContainerLayout } from '@echo/ui/pages/collection/list/layout/ranked-collections-container-layout'
import { RankedCollectionRow } from '@echo/ui/pages/collection/list/ranked-collection-row'
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
    </RankedCollectionsContainerLayout>
  )
}
