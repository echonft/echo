import type { ListingState } from '@echo/model/types/listing-state'
import type { OfferState } from '@echo/model/types/offer-state'
import { NftStackLayout } from '@echo/ui/components/nft/stack/layout/nft-stack-layout'
import { NftStackPicture } from '@echo/ui/components/nft/stack/nft-stack-picture'
import { NftStackTitle } from '@echo/ui/components/nft/stack/nft-stack-title'
import type { NftStack as NftStackModel } from '@echo/ui/types/nft-stack'
import { type FunctionComponent } from 'react'

interface Props {
  stack: NftStackModel
  status: OfferState | ListingState
  hideOwner?: boolean
  expired?: boolean
}

export const NftStack: FunctionComponent<Props> = ({ stack, status, hideOwner, expired }) => {
  return (
    <NftStackLayout>
      <NftStackPicture stack={stack} status={status} expired={expired} hideOwner={hideOwner} />
      <NftStackTitle stack={stack} />
    </NftStackLayout>
  )
}
