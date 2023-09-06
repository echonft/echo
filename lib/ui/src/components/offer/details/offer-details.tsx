'use client'
import { UserDetailsContainer } from '../../shared/user-details-container'
import { OfferDetailsActionModal } from './offer-details-action-modal'
import { OfferDetailsAssetsSeparator } from './offer-details-assets-separator'
import { OfferDetailsButtonsContainer } from './offer-details-buttons-container'
import { offerDetailsContainerBackgroundImage } from './offer-details-container-background-image'
import { OfferDetailsItemsContainer } from './offer-details-items-container'
import { OfferDetailsState } from './offer-details-state'
import { Offer } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent, useState } from 'react'

interface Props {
  offer: Offer
  isReceiving: boolean
  onOfferUpdated?: () => unknown
  // For testing purposes only
  renderModal?: boolean
}

export const OfferDetails: FunctionComponent<Props> = ({
  offer,
  isReceiving,
  // onOfferUpdated,
  renderModal = true
}) => {
  const { state, sender, receiver, expired, expiresAt, senderItems, receiverItems } = offer
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false)
  const [, setIsDeclining] = useState<boolean>(false)

  const onAction = (declines: boolean) => {
    setIsDeclining(declines)
    setShouldUpdate(true)
  }

  return (
    <>
      <div
        className={clsx(
          'flex',
          'flex-col',
          'gap-16',
          'p-4',
          'rounded-lg',
          offerDetailsContainerBackgroundImage(state),
          'bg-white/[0.05]'
        )}
      >
        <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center')}>
          <UserDetailsContainer
            user={isReceiving ? sender : receiver}
            userWalletAddress={isReceiving ? sender.wallet.address : receiver.wallet.address}
          />
          <OfferDetailsState state={state} expired={expired} expiresAt={expiresAt} />
        </div>
        <div className={clsx('flex', 'flex-col', 'gap-5')}>
          <OfferDetailsItemsContainer items={isReceiving ? senderItems : receiverItems} isReceiving />
          <div className={clsx('pb-4')}>
            <OfferDetailsAssetsSeparator />
          </div>
          <OfferDetailsItemsContainer items={isReceiving ? receiverItems : senderItems} isReceiving={false} />
          <div className={clsx('flex', 'justify-center', 'items-center', 'pt-10', 'pb-5')}>
            <OfferDetailsButtonsContainer
              state={state}
              nftsCount={isReceiving ? receiverItems.length : senderItems.length}
              isReceiving={isReceiving}
              isUpdating={shouldUpdate}
              onAccept={() => onAction(false)}
              onDecline={() => onAction(true)}
            />
          </div>
        </div>
      </div>
      {renderModal && <OfferDetailsActionModal offerState={state} />}
    </>
  )
}
