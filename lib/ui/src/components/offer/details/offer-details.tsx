'use client'
import { OfferRole } from '@echo/model/constants/offer-role'
import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { offerSenderNftItems } from '@echo/model/helpers/offer/offer-sender-nft-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { OfferDetailsButtons } from '@echo/ui/components/offer/details/action/offer-details-buttons'
import { OfferDetailsItemsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-items-buttons-layout'
import { TradeDetailsInfoLayout } from '@echo/ui/components/trade/layout/trade-details-info-layout'
import { TradeDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-layout'
import { TradeDetailsUserInfoLayout } from '@echo/ui/components/trade/layout/trade-details-user-info-layout'
import { TradeDetailsOfferState } from '@echo/ui/components/trade/trade-details-offer-state'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { Alignment } from '@echo/ui/constants/alignments'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonEmptyMap } from '@echo/utils/fp/non-empty-map'
import { assoc, pipe } from 'ramda'
import type { FunctionComponent } from 'react'

export interface OfferDetailsProps {
  // TODO update to have an offer where NFT items token are OwnedNft
  offer: OfferWithRole
  onUpdate?: (offer: OfferWithRole) => unknown
}

export const OfferDetails: FunctionComponent<OfferDetailsProps> = ({ offer, onUpdate }) => {
  const { sender, receiver } = offer
  const { discord } = receiver
  const { avatarUrl } = discord
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
    <TradeDetailsLayout backgroundPictureUrl={avatarUrl}>
      <TradeDetailsOfferState trade={offer} />
      <TradeDetailsInfoLayout>
        <TradeDetailsUserInfoLayout>
          <UserDetails user={sender} isAuthUser={offer.role === OfferRole.Sender} />
          <NftCards nfts={senderNfts} alignment={Alignment.Left} />
        </TradeDetailsUserInfoLayout>
        <ItemsSeparator />
        <TradeDetailsUserInfoLayout>
          <UserDetails user={receiver} isAuthUser={offer.role === OfferRole.Receiver} />
          <NftCards nfts={receiverNfts} alignment={Alignment.Left} />
        </TradeDetailsUserInfoLayout>
      </TradeDetailsInfoLayout>
      <OfferDetailsItemsButtonsLayout>
        <OfferDetailsButtons offer={offer} onSuccess={onUpdate} />
      </OfferDetailsItemsButtonsLayout>
    </TradeDetailsLayout>
  )
  // FIXME Not the cleanest, but this flow has to change so works for now
  // return <CreatedOfferSwitch offer={updatedOffer} redeemed={offer.state === OFFER_STATE_REJECTED} />
}
