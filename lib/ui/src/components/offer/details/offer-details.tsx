'use client'
import { getOfferFetcher } from '@echo/api/services/fetcher/get-offer-fetcher'
import { updateOfferFetcher } from '@echo/api/services/fetcher/update-offer-fetcher'
import { GetOfferResponse } from '@echo/api/types/responses/get-offer-response'
import { UpdateOfferAction } from '@echo/api/types/update-offer-action'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { Web3Provider } from '@echo/ui/components/base/utils/web3-provider'
import { OfferDetailsAcceptModal } from '@echo/ui/components/offer/details/offer-details-accept-modal'
import { OfferDetailsActionModal } from '@echo/ui/components/offer/details/offer-details-action-modal'
import { OfferDetailsApiButtonsContainer } from '@echo/ui/components/offer/details/offer-details-api-buttons-container'
import { OfferDetailsAssetsSeparator } from '@echo/ui/components/offer/details/offer-details-assets-separator'
import { OfferDetailsItemsContainer } from '@echo/ui/components/offer/details/offer-details-items-container'
import { OfferDetailsState } from '@echo/ui/components/offer/details/offer-details-state'
import { UserDetailsContainer } from '@echo/ui/components/shared/user-details-container'
import { getOfferDetailsContainerBackgroundImage } from '@echo/ui/helpers/offer/get-offer-details-container-background-image'
import { mapOfferFromResponse } from '@echo/ui/mappers/from-api/map-offer-from-response'
import type { Offer } from '@echo/ui/types/model/offer'
import { clsx } from 'clsx'
import { type FunctionComponent, useCallback, useState } from 'react'
import useSWRMutation from 'swr/mutation'

interface Props {
  offer: Offer
  isReceiver: boolean
  token: string
}

export const OfferDetails: FunctionComponent<Props> = ({ offer, isReceiver, token }) => {
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
  const { trigger: getOfferTrigger } = useSWRMutation<GetOfferResponse, Error, string>(
    `get-offer-${offer.id}`,
    getOffer,
    {
      onSuccess: (data) => {
        setUpdatedOffer(mapOfferFromResponse(data.offer))
      }
    }
  )
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
    setAction(isReceiver ? 'REJECT' : 'CANCEL')
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
          getOfferDetailsContainerBackgroundImage(state),
          'bg-white/[0.05]'
        )}
      >
        <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center')}>
          <UserDetailsContainer user={isReceiver ? sender : receiver} />
          <OfferDetailsState state={state} expired={expired} expiresAt={expiresAt} />
        </div>
        <div className={clsx('flex', 'flex-col', 'gap-5')}>
          <OfferDetailsItemsContainer items={isReceiver ? senderItems : receiverItems} isReceiver />
          <div className={clsx('pb-4')}>
            <OfferDetailsAssetsSeparator />
          </div>
          <OfferDetailsItemsContainer items={isReceiver ? receiverItems : senderItems} isReceiver={false} />
          <div className={clsx('flex', 'justify-center', 'items-center', 'pt-10', 'pb-5')}>
            <ShowIf condition={state === 'OPEN'}>
              <OfferDetailsApiButtonsContainer
                state={state}
                nftsCount={isReceiver ? receiverItems.length : senderItems.length}
                isReceiving={isReceiver}
                isUpdating={isMutating}
                onAccept={onAccept}
                onDecline={onDecline}
              />
            </ShowIf>
          </div>
        </div>
      </div>
      <OfferDetailsActionModal
        action={action}
        open={modalShown}
        onClose={() => {
          setModalShown(false)
        }}
      />
      <Web3Provider>
        <OfferDetailsAcceptModal offer={offer} />
      </Web3Provider>
    </>
  )
}
