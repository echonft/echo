'use client'
import { ListingRole } from '@echo/model/constants/listing-role'
import type { Listing } from '@echo/model/types/listing'
import type { OwnedNft } from '@echo/model/types/nft'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ListingDetailsTargetDetails } from '@echo/ui/components/listing/details/listing-details-target-details'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { TradeDetailsInfoLayout } from '@echo/ui/components/trade/details/layout/trade-details-info-layout'
import { TradeDetailsUserInfoLayout } from '@echo/ui/components/trade/details/layout/trade-details-user-info-layout'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { Alignment } from '@echo/ui/constants/alignments'
import { Color } from '@echo/ui/constants/color'
import type { Nullable } from '@echo/utils/types/nullable'
import type { FunctionComponent } from 'react'

interface Props {
  creator: Listing['creator']
  nfts: OwnedNft[]
  target: Listing['target']
  role: Nullable<ListingRole>
}

export const ListingDetailsItems: FunctionComponent<Props> = ({ creator, nfts, target, role }) => {
  return (
    <TradeDetailsInfoLayout>
      <TradeDetailsUserInfoLayout>
        <UserDetails user={creator} isAuthUser={role === ListingRole.Creator} />
        <NftCards nfts={nfts} alignment={Alignment.Left} options={{ borderColor: Color.Yellow }} />
      </TradeDetailsUserInfoLayout>
      <ItemsSeparator />
      <ListingDetailsTargetDetails target={target} />
    </TradeDetailsInfoLayout>
  )
}
