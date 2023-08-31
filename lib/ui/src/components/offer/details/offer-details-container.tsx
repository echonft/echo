import { OfferReceiverDetailsContainer } from '../offer-receiver-details-container'
import { OfferDetailsAssetsSeparator } from './offer-details-assets-separator'
import { OfferDetailsButtonsContainer } from './offer-details-buttons-container'
import { offerDetailsContainerBackgroundImage } from './offer-details-container-background-image'
import { OfferDetailsItemsContainer } from './offer-details-items-container'
import { OfferDetailsState } from './offer-details-state'
import { Offer } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  offer: Offer
  isReceiving: boolean
  onAccept?: () => unknown
  onDecline?: () => unknown
}

export const OfferDetailsContainer: FunctionComponent<Props> = ({ offer, isReceiving, onAccept, onDecline }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'gap-16',
        'p-4',
        'rounded-lg',
        offerDetailsContainerBackgroundImage(offer.state),
        'bg-white/[0.05]'
      )}
    >
      <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center')}>
        <OfferReceiverDetailsContainer
          receiver={isReceiving ? offer.sender : offer.receiver}
          receiverWalletAddress={isReceiving ? offer.sender.wallet.address : offer.receiver.wallet.address}
        />
        <OfferDetailsState state={offer.state} expiresAt={offer.expiresAt} />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-5')}>
        <OfferDetailsItemsContainer items={isReceiving ? offer.senderItems : offer.receiverItems} isReceiving />
        <div className={clsx('pb-4')}>
          <OfferDetailsAssetsSeparator />
        </div>
        <OfferDetailsItemsContainer items={isReceiving ? offer.receiverItems : offer.senderItems} isReceiving={false} />
        <div className={clsx('flex', 'justify-center', 'items-center', 'pt-10', 'pb-5')}>
          <OfferDetailsButtonsContainer
            state={offer.state}
            nftsCount={isReceiving ? offer.receiverItems.length : offer.senderItems.length}
            onAccept={onAccept}
            onDecline={onDecline}
          />
        </div>
      </div>
    </div>
  )
}
