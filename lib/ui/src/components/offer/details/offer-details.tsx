'use client'
import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { offerSenderNftItems } from '@echo/model/helpers/offer/offer-sender-nft-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import { OfferDetailsBottomBar } from '@echo/ui/components/offer/details/offer-details-bottom-bar'
import { OfferDetailsOfferState } from '@echo/ui/components/offer/details/offer-details-offer-state'
import { TradeDetailsLayout } from '@echo/ui/components/trade/details/layout/trade-details-layout'
import { TradeDetailsItems } from '@echo/ui/components/trade/details/trade-details-items'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { assoc, pipe } from 'ramda'
import { type FunctionComponent, useState } from 'react'

export interface OfferDetailsProps {
  offer: OfferWithRole
  onSwap?: VoidFunction
}

export const OfferDetails: FunctionComponent<OfferDetailsProps> = ({ offer, onSwap }) => {
  const router = useRouter()
  const { sender, receiver } = offer
  const [updatedOffer, setUpdatedOffer] = useState(offer)
  const [loading, setLoading] = useState(false)
  const receiverNfts = pipe(
    offerReceiverNftItems,
    nonEmptyMap(pipe(nftItemToNft(offer.receiver), assoc('attributes', [])))
  )(offer)
  const senderNfts = pipe(
    offerSenderNftItems,
    nonEmptyMap(pipe(nftItemToNft(offer.sender), assoc('attributes', [])))
  )(offer)
  return (
    <TradeDetailsLayout>
      <OfferDetailsOfferState offer={updatedOffer} />
      <div className={clsx('flex', 'flex-col')}>
        <TradeDetailsItems
          sender={sender}
          senderNfts={senderNfts}
          receiver={receiver}
          receiverNfts={receiverNfts}
          role={offer.role}
        />
      </div>
      <OfferDetailsBottomBar
        offer={updatedOffer}
        loading={loading}
        onBack={() => {
          router.back()
        }}
        onError={() => {
          setLoading(false)
        }}
        onLoading={() => {
          setLoading(true)
        }}
        onRedeem={(offer) => {
          setUpdatedOffer(offer)
          setLoading(false)
        }}
        onSwap={onSwap}
        onUpdate={(offer) => {
          setUpdatedOffer(offer)
          setLoading(false)
        }}
      />
    </TradeDetailsLayout>
  )
}
