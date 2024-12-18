'use client'
import { swapReceiverNftItems } from '@echo/model/helpers/swap/swap-receiver-nft-items'
import { swapSenderNftItems } from '@echo/model/helpers/swap/swap-sender-nft-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import { SwapDetailsBottomBar } from '@echo/ui/components/swap/details/swap-details-bottom-bar'
import { TradeDetailsLayout } from '@echo/ui/components/trade/details/layout/trade-details-layout'
import { TradeDetailsItems } from '@echo/ui/components/trade/details/trade-details-items'
import type { SwapWithRole } from '@echo/ui/types/swap-with-role'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { assoc, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

export interface SwapDetailsProps {
  swap: SwapWithRole
}

export const SwapDetails: FunctionComponent<SwapDetailsProps> = ({ swap }) => {
  const router = useRouter()
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
      <div className={clsx('flex', 'flex-col', 'pt-5')}>
        <TradeDetailsItems
          sender={sender}
          senderNfts={senderNfts}
          receiver={receiver}
          receiverNfts={receiverNfts}
          role={swap.role}
        />
      </div>
      <SwapDetailsBottomBar
        swap={swap}
        onBack={() => {
          router.back()
        }}
      />
    </TradeDetailsLayout>
  )
}
