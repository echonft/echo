import { getUpdateOfferActionFromOffer } from '../../../helpers/get-update-offer-action-from-offer'
import { UpdateOfferFetcher } from '../fetchers/update-offer-fetcher'
import { OfferReceiverDetailsContainer } from '../offer-receiver-details-container'
import { OfferDetailsActionModal } from './offer-details-action-modal'
import { OfferDetailsAssetsSeparator } from './offer-details-assets-separator'
import { OfferDetailsButtonsContainer } from './offer-details-buttons-container'
import { offerDetailsContainerBackgroundImage } from './offer-details-container-background-image'
import { OfferDetailsItemsContainer } from './offer-details-items-container'
import { OfferDetailsState } from './offer-details-state'
import { Offer } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent, useMemo, useState } from 'react'

export interface OfferDetailsProvidedProps {
  offer: Offer
  isReceiving: boolean
  onOfferUpdated?: () => unknown
  // For testing purposes only
  renderModal?: boolean
}

export const OfferDetailsProvided: FunctionComponent<OfferDetailsProvidedProps> = ({
  offer,
  isReceiving,
  onOfferUpdated,
  renderModal
}) => {
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)
  const [isDeclining, setIsDeclining] = useState<boolean>(false)

  const onAction = (declines: boolean) => {
    setIsDeclining(declines)
    setShouldUpdate(true)
  }

  const getUpdateOfferAction = useMemo(
    () => getUpdateOfferActionFromOffer(offer.state, isReceiving, isDeclining),
    [offer.state, isDeclining, isReceiving]
  )

  return (
    <>
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
          <OfferDetailsItemsContainer
            items={isReceiving ? offer.receiverItems : offer.senderItems}
            isReceiving={false}
          />
          <div className={clsx('flex', 'justify-center', 'items-center', 'pt-10', 'pb-5')}>
            <OfferDetailsButtonsContainer
              state={offer.state}
              nftsCount={isReceiving ? offer.receiverItems.length : offer.senderItems.length}
              isReceiving={isReceiving}
              isUpdating={shouldUpdate}
              onAccept={() => onAction(false)}
              onDecline={() => onAction(true)}
            />
          </div>
        </div>
      </div>
      {renderModal && <OfferDetailsActionModal offerState={offer.state} />}
      {renderModal && shouldUpdate && (
        <UpdateOfferFetcher
          offerId={offer.id}
          updateAction={getUpdateOfferAction}
          onOfferUpdated={() => {
            setShouldUpdate(false)
            onOfferUpdated?.()
          }}
        />
      )}
    </>
  )
}
