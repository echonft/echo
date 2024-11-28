'use client'
import { OfferRole } from '@echo/model/constants/offer-role'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { TradeDetailsInfoLayout } from '@echo/ui/components/trade/details/layout/trade-details-info-layout'
import { TradeDetailsUserInfoLayout } from '@echo/ui/components/trade/details/layout/trade-details-user-info-layout'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { Alignment } from '@echo/ui/constants/alignments'
import type { Nullable } from '@echo/utils/types/nullable'
import type { FunctionComponent } from 'react'

interface Props {
  sender: User
  senderNfts: Nft[]
  receiver: User
  receiverNfts: Nft[]
  role: Nullable<OfferRole>
}

export const TradeDetailsItems: FunctionComponent<Props> = ({ sender, senderNfts, receiver, receiverNfts, role }) => {
  return (
    <TradeDetailsInfoLayout>
      <TradeDetailsUserInfoLayout>
        <UserDetails user={sender} isAuthUser={role === OfferRole.Sender} />
        <NftCards nfts={senderNfts} alignment={Alignment.Left} />
      </TradeDetailsUserInfoLayout>
      <ItemsSeparator />
      <TradeDetailsUserInfoLayout>
        <UserDetails user={receiver} isAuthUser={role === OfferRole.Receiver} />
        <NftCards nfts={receiverNfts} alignment={Alignment.Left} />
      </TradeDetailsUserInfoLayout>
    </TradeDetailsInfoLayout>
  )
}
