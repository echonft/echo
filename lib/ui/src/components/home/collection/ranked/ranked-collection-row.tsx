import { RankedCollectionRowLayout } from '@echo/ui/components/home/collection/ranked/layout/ranked-collection-row-layout'
import { RankedCollectionRowNameRankPictureLayout } from '@echo/ui/components/home/collection/ranked/layout/ranked-collection-row-name-rank-picture-layout'
import { RankedCollectionRowRankPictureLayout } from '@echo/ui/components/home/collection/ranked/layout/ranked-collection-row-rank-picture-layout'
import { RankedCollectionRowLabel } from '@echo/ui/components/home/collection/ranked/ranked-collection-row-label'
import { RankedCollectionRowRankLabel } from '@echo/ui/components/home/collection/ranked/ranked-collection-row-rank-label'
import { clsx } from 'clsx'
import Image from 'next/image'
import { type FunctionComponent } from 'react'

interface Props {
  rank: number
  name: string
  pictureUrl: string
  swapsCount: number | undefined
}

export const RankedCollectionRow: FunctionComponent<Props> = ({ rank, name, swapsCount, pictureUrl }) => {
  return (
    <RankedCollectionRowLayout>
      <RankedCollectionRowNameRankPictureLayout>
        <RankedCollectionRowRankPictureLayout>
          <RankedCollectionRowRankLabel>{rank}</RankedCollectionRowRankLabel>
          <Image
            className={clsx('w-[6.25rem]', 'h-[6.25rem]', 'rounded')}
            src={pictureUrl}
            alt={name}
            width={100}
            height={100}
          />
        </RankedCollectionRowRankPictureLayout>
        <RankedCollectionRowLabel>{name}</RankedCollectionRowLabel>
      </RankedCollectionRowNameRankPictureLayout>
      <RankedCollectionRowLabel>{swapsCount}</RankedCollectionRowLabel>
    </RankedCollectionRowLayout>
  )
}
