'use client'
import type { Nft } from '@echo/model/types/nft'
import type { UserWithWallet } from '@echo/model/types/user'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { TradeDetailsInfoLayout } from '@echo/ui/components/trade/layout/trade-details-info-layout'
import { TradeDetailsUserInfoLayout } from '@echo/ui/components/trade/layout/trade-details-user-info-layout'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { Alignment } from '@echo/ui/constants/alignments'
import type { FunctionComponent } from 'react'

interface Props {
  sender: UserWithWallet
  senderNfts: Nft[]
  receiver: UserWithWallet
  receiverNfts: Nft[]
  // TODO Should be better than this
  isSender?: boolean
  isReceiver?: boolean
}

export const TradeDetailsItems: FunctionComponent<Props> = ({
  sender,
  senderNfts,
  receiver,
  receiverNfts,
  isSender,
  isReceiver
}) => {
  return (
    <TradeDetailsInfoLayout>
      <TradeDetailsUserInfoLayout>
        <UserDetails user={sender} isAuthUser={isSender} />
        <NftCards nfts={senderNfts} alignment={Alignment.Left} />
      </TradeDetailsUserInfoLayout>
      <ItemsSeparator />
      <TradeDetailsUserInfoLayout>
        <UserDetails user={receiver} isAuthUser={isReceiver} />
        <NftCards nfts={receiverNfts} alignment={Alignment.Left} />
      </TradeDetailsUserInfoLayout>
    </TradeDetailsInfoLayout>
  )
  // FIXME Not the cleanest, but this flow has to change so works for now
  // return <CreatedOfferSwitch offer={updatedOffer} redeemed={offer.state === OFFER_STATE_REJECTED} />
}
