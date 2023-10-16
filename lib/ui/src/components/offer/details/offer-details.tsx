'use client'
import { getOfferFetcher } from '@echo/api/services/fetcher/get-offer-fetcher'
import { updateOfferFetcher } from '@echo/api/services/fetcher/update-offer-fetcher'
import { OfferResponse } from '@echo/api/types/responses/offer-response'
import { UpdateOfferAction } from '@echo/api/types/update-offer-action'
import type { Offer } from '@echo/model/types/offer'
import { OfferDetailsActionModal } from '@echo/ui/components/offer/details/offer-details-action-modal'
import { OfferDetailsAssetsSeparator } from '@echo/ui/components/offer/details/offer-details-assets-separator'
import { OfferDetailsButtonsContainer } from '@echo/ui/components/offer/details/offer-details-buttons-container'
import { offerDetailsContainerBackgroundImage } from '@echo/ui/components/offer/details/offer-details-container-background-image'
import { OfferDetailsItemsContainer } from '@echo/ui/components/offer/details/offer-details-items-container'
import { OfferDetailsState } from '@echo/ui/components/offer/details/offer-details-state'
import { UserDetailsContainer } from '@echo/ui/components/shared/user-details-container'
import { DirectionIn, DirectionOut } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { type FunctionComponent, useCallback, useState } from 'react'
import useSWRMutation from 'swr/mutation'

interface Props {
  offer: Offer
  isCreator: boolean
  token: string
}

export const OfferDetails: FunctionComponent<Props> = ({ offer, isCreator, token }) => {
  const [updatedOffer, setUpdatedOffer] = useState(offer)
  const { state, sender, receiver, expired, expiresAt, senderItems, receiverItems } = updatedOffer
  const [modalShown, setModalShown] = useState(false)
  const [action, setAction] = useState<UpdateOfferAction>()
  const getOffer = useCallback(() => {
    return getOfferFetcher(offer.id, token)
  }, [offer, token])
  const updateOffer = useCallback(() => {
    return updateOfferFetcher(offer.id, action!, token)
  }, [offer, action, token])
  const { trigger: getOfferTrigger } = useSWRMutation<OfferResponse, Error, string>(`get-offer-${offer.id}`, getOffer, {
    onSuccess: (data) => {
      setUpdatedOffer(data.offer)
    }
  })
  const { trigger: updateOfferTrigger, isMutating } = useSWRMutation(`update-offer-${offer.id}`, updateOffer, {
    onSuccess: () => {
      void getOfferTrigger()
      setModalShown(true)
    }
  })
  const onAccept = () => {
    setAction('ACCEPT')
    void updateOfferTrigger()
  }
  const onDecline = () => {
    setAction(isCreator ? 'CANCEL' : 'REJECT')
    void updateOfferTrigger()
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
          <UserDetailsContainer user={isCreator ? receiver : sender} />
          <OfferDetailsState state={state} expired={expired} expiresAt={expiresAt} />
        </div>
        <div className={clsx('flex', 'flex-col', 'gap-5')}>
          <OfferDetailsItemsContainer items={isCreator ? receiverItems : senderItems} direction={DirectionIn} />
          <div className={clsx('pb-4')}>
            <OfferDetailsAssetsSeparator />
          </div>
          <OfferDetailsItemsContainer items={isCreator ? senderItems : receiverItems} direction={DirectionOut} />
          <div className={clsx('flex', 'justify-center', 'items-center', 'pt-10', 'pb-5')}>
            <OfferDetailsButtonsContainer
              state={state}
              nftsCount={isCreator ? senderItems.length : receiverItems.length}
              isReceiving={!isCreator}
              isUpdating={isMutating}
              onAccept={onAccept}
              onDecline={onDecline}
            />
          </div>
        </div>
      </div>
      <OfferDetailsActionModal
        action={action!}
        open={modalShown}
        onClose={() => {
          setModalShown(false)
        }}
      />
    </>
  )
}
