'use client'
import { OfferDetailsActionModal } from '@echo/ui/components/offer/details/offer-details-action-modal'
import { OfferDetailsAssetsSeparator } from '@echo/ui/components/offer/details/offer-details-assets-separator'
import { OfferDetailsButtonsContainer } from '@echo/ui/components/offer/details/offer-details-buttons-container'
import { offerDetailsContainerBackgroundImage } from '@echo/ui/components/offer/details/offer-details-container-background-image'
import { OfferDetailsItemsContainer } from '@echo/ui/components/offer/details/offer-details-items-container'
import { OfferDetailsState } from '@echo/ui/components/offer/details/offer-details-state'
import { UserDetailsContainer } from '@echo/ui/components/shared/user-details-container'
import { getOfferReceiverWallet } from '@echo/ui/helpers/offer/get-offer-receiver-wallet'
import { getOfferSenderWallet } from '@echo/ui/helpers/offer/get-offer-sender-wallet'
import type { Offer } from '@echo/ui/types/model/offer'
import { clsx } from 'clsx'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: Offer
  isReceiver: boolean
  onOfferUpdated?: () => unknown
  // For testing purposes only
  renderModal?: boolean
}

export const OfferDetails: FunctionComponent<Props> = ({
  offer,
  isReceiver,
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
            user={isReceiver ? sender : receiver}
            userWalletAddress={isReceiver ? getOfferSenderWallet(offer).address : getOfferReceiverWallet(offer).address}
          />
          <OfferDetailsState state={state} expired={expired} expiresAt={expiresAt} />
        </div>
        <div className={clsx('flex', 'flex-col', 'gap-5')}>
          <OfferDetailsItemsContainer items={isReceiver ? senderItems : receiverItems} isReceiver />
          <div className={clsx('pb-4')}>
            <OfferDetailsAssetsSeparator />
          </div>
          <OfferDetailsItemsContainer items={isReceiver ? receiverItems : senderItems} isReceiver={false} />
          <div className={clsx('flex', 'justify-center', 'items-center', 'pt-10', 'pb-5')}>
            <OfferDetailsButtonsContainer
              state={state}
              nftsCount={isReceiver ? receiverItems.length : senderItems.length}
              isReceiving={isReceiver}
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
