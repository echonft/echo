'use client'
import { ListingRole } from '@echo/model/constants/listing-role'
import type { Listing } from '@echo/model/types/listing'
import type { OwnedNft } from '@echo/model/types/nft'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ListingDetailsTargetLayout } from '@echo/ui/components/listing/details/layout/listing-details-target-layout'
import { ListingDetailsTarget } from '@echo/ui/components/listing/details/listing-details-target'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { TradeDetailsInfoLayout } from '@echo/ui/components/trade/layout/trade-details-info-layout'
import { TradeDetailsUserInfoLayout } from '@echo/ui/components/trade/layout/trade-details-user-info-layout'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { Alignment } from '@echo/ui/constants/alignments'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
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
        <NftCards nfts={nfts} alignment={Alignment.Left} />
      </TradeDetailsUserInfoLayout>
      <ItemsSeparator />
      <div className={clsx('flex', 'flex-col', 'gap-14', 'grow', 'basis-0')}>
        <ListingDetailsTargetLayout>
          <ListingDetailsTarget target={target} />
        </ListingDetailsTargetLayout>
      </div>
    </TradeDetailsInfoLayout>
  )
}
