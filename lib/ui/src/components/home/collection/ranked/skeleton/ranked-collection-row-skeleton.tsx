import { RankedCollectionRowLayout } from '@echo/ui/components/home/collection/ranked/layout/ranked-collection-row-layout'
import { RankedCollectionRowNameRankPictureLayout } from '@echo/ui/components/home/collection/ranked/layout/ranked-collection-row-name-rank-picture-layout'
import { RankedCollectionRowRankPictureLayout } from '@echo/ui/components/home/collection/ranked/layout/ranked-collection-row-rank-picture-layout'
import { RankedCollectionRowLabel } from '@echo/ui/components/home/collection/ranked/ranked-collection-row-label'
import { RankedCollectionRowRankLabel } from '@echo/ui/components/home/collection/ranked/ranked-collection-row-rank-label'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  rank: number
}

export const RankedCollectionRowSkeleton: FunctionComponent<Props> = ({ rank }) => {
  return (
    <RankedCollectionRowLayout>
      <RankedCollectionRowNameRankPictureLayout>
        <RankedCollectionRowRankPictureLayout>
          <RankedCollectionRowRankLabel>{rank}</RankedCollectionRowRankLabel>
          <div className={clsx('w-[6.25rem]', 'h-[6.25rem]', 'rounded', 'bg-white/[0.08]', 'animate-pulse')} />
        </RankedCollectionRowRankPictureLayout>
        <RankedCollectionRowLabel blur={true}>{'Collection Name'}</RankedCollectionRowLabel>
      </RankedCollectionRowNameRankPictureLayout>
      <RankedCollectionRowLabel blur={true}>{99}</RankedCollectionRowLabel>
    </RankedCollectionRowLayout>
  )
}
