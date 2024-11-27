'use client'
import type { OfferState } from '@echo/model/constants/offer-state'
import { swapReceiverNftItems } from '@echo/model/helpers/swap/swap-receiver-nft-items'
import { swapSenderNftItems } from '@echo/model/helpers/swap/swap-sender-nft-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import type { Swap } from '@echo/model/types/swap'
import { TradeDetailsBodyLayout } from '@echo/ui/components/trade/layout/trade-details-body-layout'
import { TradeDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-layout'
import { TradeDetailsPaddedStateLayout } from '@echo/ui/components/trade/layout/trade-details-state-padded-layout'
import { TradeDetailsBottomBar } from '@echo/ui/components/trade/trade-details-bottom-bar'
import { TradeDetailsItems } from '@echo/ui/components/trade/trade-details-items'
import { TradeDetailsOfferStateLabel } from '@echo/ui/components/trade/trade-details-offer-state-label'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { assoc, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

export interface SwapDetailsProps {
  swap: Swap
  onClose?: EmptyFunction
}

export const SwapDetails: FunctionComponent<SwapDetailsProps> = ({ swap, onClose }) => {
  const { sender, receiver } = swap
  const receiverNfts = pipe(
    swapReceiverNftItems,
    nonEmptyMap(pipe(nftItemToNft(swap.receiver), assoc('attributes', [])))
  )(swap)
  const senderNfts = pipe(
    swapSenderNftItems,
    nonEmptyMap(pipe(nftItemToNft(swap.sender), assoc('attributes', [])))
  )(swap)

  return (
    <TradeDetailsLayout>
      <TradeDetailsPaddedStateLayout>
        {/* FIXME: This is a temporary fix to show the swap state label. We need to update the swap state label to be a new component */}
        <TradeDetailsOfferStateLabel state={'COMPLETED' as OfferState} />
      </TradeDetailsPaddedStateLayout>
      <TradeDetailsBodyLayout>
        <TradeDetailsItems
          sender={sender}
          senderNfts={senderNfts}
          receiver={receiver}
          receiverNfts={receiverNfts}
          // Since this is a completed swap, we don't need to show who is sender/receiver
          isSender={false}
          isReceiver={false}
        />
      </TradeDetailsBodyLayout>
      <TradeDetailsBottomBar onBack={onClose} />
    </TradeDetailsLayout>
  )
}
