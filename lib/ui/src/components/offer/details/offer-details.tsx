'use client'
import { OfferRole } from '@echo/model/constants/offer-role'
import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { offerSenderNftItems } from '@echo/model/helpers/offer/offer-sender-nft-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import { OfferDetailsButtons } from '@echo/ui/components/offer/details/action/offer-details-buttons'
import { OfferDetailsItemsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-items-buttons-layout'
import { TradeDetailsBodyLayout } from '@echo/ui/components/trade/layout/trade-details-body-layout'
import { TradeDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-layout'
import { TradeDetailsBottomBar } from '@echo/ui/components/trade/trade-details-bottom-bar'
import { TradeDetailsItems } from '@echo/ui/components/trade/trade-details-items'
import { TradeDetailsOfferState } from '@echo/ui/components/trade/trade-details-offer-state'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { assoc, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

export interface OfferDetailsProps {
  offer: OfferWithRole
  onUpdate?: (offer: OfferWithRole) => unknown
  onClose?: EmptyFunction
}

export const OfferDetails: FunctionComponent<OfferDetailsProps> = ({ offer, onUpdate, onClose }) => {
  const { sender, receiver } = offer
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
      <TradeDetailsOfferState trade={offer} />
      <TradeDetailsBodyLayout>
        <TradeDetailsItems
          sender={sender}
          senderNfts={senderNfts}
          receiver={receiver}
          receiverNfts={receiverNfts}
          isSender={offer.role === OfferRole.Sender}
          isReceiver={offer.role === OfferRole.Receiver}
        />
      </TradeDetailsBodyLayout>
      <TradeDetailsBottomBar items={senderNfts} counterpartyItems={receiverNfts} onBack={onClose}>
        <OfferDetailsItemsButtonsLayout>
          <OfferDetailsButtons offer={offer} onSuccess={onUpdate} />
        </OfferDetailsItemsButtonsLayout>
      </TradeDetailsBottomBar>
    </TradeDetailsLayout>
  )
}
