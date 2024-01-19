import { NftCardSkeleton } from '@echo/ui/components/nft/card/skeleton/nft-card-skeleton'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import type { Alignment } from '@echo/ui/types/alignment'
import { map, range } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  alignment?: Alignment
  quantity?: number
}
export const NftsContainerSkeleton: FunctionComponent<Props> = ({ alignment, quantity = 3 }) => {
  return (
    <NftsLayout alignment={alignment}>
      {map(
        (index) => (
          <NftCardSkeleton key={index} />
        ),
        range(0, quantity)
      )}
    </NftsLayout>
  )
}
