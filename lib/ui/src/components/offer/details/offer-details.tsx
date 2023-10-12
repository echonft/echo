'use client'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import { type OfferResponse } from '@echo/api/types/responses/offer-response'
import { type UpdateOfferAction } from '@echo/api/types/update-offer-action'
import { type Offer } from '@echo/model/types/offer'
import { ItemsDetailsSeparator } from '@echo/ui/components/item/details/items-details-separator'
import { OfferDetailsActionModal } from '@echo/ui/components/offer/details/offer-details-action-modal'
import { OfferDetailsApiButtonsContainer } from '@echo/ui/components/offer/details/offer-details-api-buttons-container'
import { OfferDetailsContractButtonsContainer } from '@echo/ui/components/offer/details/offer-details-contract-buttons-container'
import { OfferDetailsItemsContainer } from '@echo/ui/components/offer/details/offer-details-items-container'
import { OfferDetailsState } from '@echo/ui/components/offer/details/offer-details-state'
import { UserDetailsContainer } from '@echo/ui/components/shared/user-details-container'
import { getOfferDetailsContainerBackgroundImage } from '@echo/ui/helpers/offer/get-offer-details-container-background-image'
import { DirectionIn, DirectionOut } from '@echo/ui/constants/swap-direction'
import { clsx } from 'clsx'
import { type FunctionComponent, useCallback, useMemo, useState } from 'react'
import useSWRMutation from 'swr/mutation'

interface Props {
  offer: Offer
  isCreator: boolean
  token: string
  getOfferFetcher: (offerId: string, token: string) => Promise<OfferResponse>
  updateOfferFetcher: (offerId: string, action: UpdateOfferAction, token: string | undefined) => Promise<EmptyResponse>
}

export const OfferDetails: FunctionComponent<Props> = ({
  offer,
  isCreator,
  token,
  getOfferFetcher,
  updateOfferFetcher
}) => {
  const [modalShown, setModalShown] = useState(false)
  const [acceptModalShown, setAcceptModalShown] = useState<boolean>(false)
  const [action, setAction] = useState<UpdateOfferAction>()
  const getOffer = useCallback(() => {
    return getOfferFetcher(offer.id, token)
  }, [getOfferFetcher, offer, token])
  const updateOffer = useCallback(() => {
    return updateOfferFetcher(offer.id, action!, token)
  }, [updateOfferFetcher, offer, action, token])
  const {
    trigger: getOfferTrigger,
    isMutating: getMutating,
    data
  } = useSWRMutation<OfferResponse, Error, string>(`get-offer-${offer.id}`, getOffer)
  const { trigger: updateOfferTrigger, isMutating: updateMutating } = useSWRMutation(
    `update-offer-${offer.id}`,
    updateOffer,
    {
      onSuccess: () => {
        void getOfferTrigger()
        setModalShown(true)
      }
    }
  )
  const onAccept = () => {
    // TODO Handle the execute case
    setAcceptModalShown(true)
  }
  const onDecline = () => {
    setAction(isCreator ? 'CANCEL' : 'REJECT')
    void updateOfferTrigger()
  }
  const updatedOffer = useMemo(() => data?.offer ?? offer, [offer, data])
  const { state, sender, receiver, expired, expiresAt, senderItems, receiverItems } = updatedOffer

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
          <UserDetailsContainer user={isCreator ? receiver : sender} />
          <OfferDetailsState state={state} expired={expired} expiresAt={expiresAt} />
        </div>
        <div className={clsx('flex', 'flex-col', 'gap-5')}>
          <OfferDetailsItemsContainer items={isCreator ? receiverItems : senderItems} direction={DirectionIn} />
          <div className={clsx('pb-4')}>
            <ItemsDetailsSeparator />
          </div>
          <OfferDetailsItemsContainer items={isCreator ? senderItems : receiverItems} direction={DirectionOut} />
          <div className={clsx('flex', 'justify-center', 'items-center', 'pt-10', 'pb-5')}>
            <ShowIf condition={state === 'OPEN'}>
              <OfferDetailsApiButtonsContainer
                state={state}
              nftsCount={isCreator ? senderItems.length : receiverItems.length}
              isReceiving={!isCreator}
              isUpdating={getMutating || updateMutating}
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
        <OfferDetailsAcceptModal offer={offer} open={acceptModalShown} onClose={() => setAcceptModalShown(false)} />
      </Web3Provider>
    </>
  )
}
