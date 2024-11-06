'use client'
import { OfferRole } from '@echo/model/constants/offer-role'
import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { offerSenderNftItems } from '@echo/model/helpers/offer/offer-sender-nft-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import { OfferDetailsButtons } from '@echo/ui/components/offer/details/action/offer-details-buttons'
import { OfferDetailsItemsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-items-buttons-layout'
import { TradeDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-layout'
import { TradeDetailsItems } from '@echo/ui/components/trade/trade-details-items'
import { TradeDetailsOfferState } from '@echo/ui/components/trade/trade-details-offer-state'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { assoc, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

export interface OfferDetailsProps {
  offer: OfferWithRole
  onUpdate?: (offer: OfferWithRole) => unknown
}

export const OfferDetails: FunctionComponent<OfferDetailsProps> = ({ offer, onUpdate }) => {
  const { sender, receiver } = offer
  const { discord } = receiver
  // remove
  const receiverNfts = pipe(
    offerReceiverNftItems,
    nonEmptyMap(pipe(nftItemToNft(offer.sender), assoc('attributes', [])))
  )(offer)
  const senderNfts = pipe(
    offerSenderNftItems,
    nonEmptyMap(pipe(nftItemToNft(offer.sender), assoc('attributes', [])))
  )(offer)
  return (
    // TODO No background for now as we use modal only
    <TradeDetailsLayout>
      <TradeDetailsOfferState trade={offer} />
      <TradeDetailsItems
        sender={sender}
        senderNfts={senderNfts}
        receiver={receiver}
        receiverNfts={receiverNfts}
        isSender={offer.role === OfferRole.Sender}
        isReceiver={offer.role === OfferRole.Receiver}
      />
      <OfferDetailsItemsButtonsLayout>
        <OfferDetailsButtons offer={offer} onSuccess={onUpdate} />
      </OfferDetailsItemsButtonsLayout>
    </TradeDetailsLayout>
  )
}
