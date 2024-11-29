'use client'
import { swapReceiverNftItems } from '@echo/model/helpers/swap/swap-receiver-nft-items'
import { swapSenderNftItems } from '@echo/model/helpers/swap/swap-sender-nft-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import { SwapDetailsBottomBar } from '@echo/ui/components/swap/details/swap-details-bottom-bar'
import { TradeDetailsBodyLayout } from '@echo/ui/components/trade/details/layout/trade-details-body-layout'
import { TradeDetailsLayout } from '@echo/ui/components/trade/details/layout/trade-details-layout'
import { TradeDetailsItems } from '@echo/ui/components/trade/details/trade-details-items'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { assoc, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

export interface SwapDetailsProps {
  swap: SwapWithRole
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
      <TradeDetailsBodyLayout>
        <TradeDetailsItems
          sender={sender}
          senderNfts={senderNfts}
          receiver={receiver}
          receiverNfts={receiverNfts}
          role={swap.role}
        />
      </TradeDetailsBodyLayout>
      <SwapDetailsBottomBar swap={swap} onBack={onClose} />
    </TradeDetailsLayout>
  )
}
