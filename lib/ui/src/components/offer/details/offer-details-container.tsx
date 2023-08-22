import { Offer } from '../../../types/offer'
import { offerDetailsContainerBackgroundImage } from '../offer-details-container-background-image'
import { OfferReceiverDetailsContainer } from '../offer-receiver-details-container'
import { OfferDetailsAssetsContainer } from './offer-details-assets-container'
import { OfferDetailsAssetsSeparator } from './offer-details-assets-separator'
import { OfferDetailsButtonsContainer } from './offer-details-buttons-container'
import { OfferDetailsState } from './offer-details-state'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferDetailsContainerProps {
  offer: Offer
  isReceiving: boolean
  hasApprovedNFTs: boolean
}

export const OfferDetailsContainer: FunctionComponent<OfferDetailsContainerProps> = ({
  offer,
  isReceiving,
  hasApprovedNFTs
}) => {
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
        <OfferReceiverDetailsContainer receiver={isReceiving ? offer.sender : offer.receiver} />
        <OfferDetailsState state={offer.state} expiresAt={offer.expiresAt} />
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-5')}>
        <OfferDetailsAssetsContainer assets={isReceiving ? offer.senderItems : offer.receiverItems} isReceiving />
        <div className={clsx('pb-4')}>
          <OfferDetailsAssetsSeparator />
        </div>
        <OfferDetailsAssetsContainer
          assets={isReceiving ? offer.receiverItems : offer.senderItems}
          isReceiving={false}
        />
        <div className={clsx('flex', 'justify-center', 'items-center', 'pt-10', 'pb-5')}>
          <OfferDetailsButtonsContainer
            state={offer.state}
            hasApprovedNFTs={hasApprovedNFTs}
            nftsCount={isReceiving ? offer.receiverItems.length : offer.senderItems.length}
          />
        </div>
      </div>
    </div>
  )
}
