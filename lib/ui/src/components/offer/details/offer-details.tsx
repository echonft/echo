'use client'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import type { Offer } from '@echo/model/types/offer'
import { ItemsDetailsSeparator } from '@echo/ui/components/item/details/items-details-separator'
import { OfferDetailsButtons } from '@echo/ui/components/offer/details/action/offer-details-buttons'
import { OfferDetailsItemsContainer } from '@echo/ui/components/offer/details/offer-details-items-container'
import { OfferDetailsState } from '@echo/ui/components/offer/details/offer-details-state'
import { UserDetailsContainer } from '@echo/ui/components/shared/user-details-container'
import { DirectionIn, DirectionOut } from '@echo/ui/constants/swap-direction'
import { getOfferDetailsContainerBackgroundImage } from '@echo/ui/helpers/offer/get-offer-details-container-background-image'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { type FunctionComponent, useCallback, useMemo } from 'react'
import useSWRMutation from 'swr/mutation'

interface Props {
  offer: Offer
  isCreator: boolean
  token: string
  getOfferFetcher: (offerId: string, token: string) => Promise<OfferResponse>
  getOfferSignatureFetcher: (offerId: string, token: string | undefined) => Promise<OfferSignatureResponse>
  cancelOfferFetcher: (offerId: string, token: string | undefined) => Promise<EmptyResponse>
  acceptOfferFetcher: (
    offerId: string,
    signature: HexString | undefined,
    token: string | undefined
  ) => Promise<EmptyResponse>
  rejectOfferFetcher: (offerId: string, token: string | undefined) => Promise<EmptyResponse>
  completeOfferFetcher: (
    offerId: string,
    transactionId: HexString | undefined,
    token: string | undefined
  ) => Promise<EmptyResponse>
}

export const OfferDetails: FunctionComponent<Props> = ({
  offer,
  isCreator,
  token,
  getOfferFetcher,
  getOfferSignatureFetcher,
  cancelOfferFetcher,
  acceptOfferFetcher,
  rejectOfferFetcher,
  completeOfferFetcher
}) => {
  const { trigger, isMutating, data } = useSWRMutation<
    OfferResponse,
    Error,
    string,
    { offerId: string; token: string }
  >(`get-offer-${offer.id}`, (_key, { arg: { offerId, token } }) => getOfferFetcher(offerId, token))
  const onSuccess = useCallback(() => {
    void trigger({ offerId: offer.id, token })
  }, [offer.id, token, trigger])
  const updatedOffer = useMemo(() => data?.offer ?? offer, [offer, data])
  const { state, sender, receiver, expired, expiresAt, senderItems, receiverItems } = updatedOffer

  return (
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
          <OfferDetailsButtons
            offer={updatedOffer}
            isCreator={isCreator}
            token={token}
            getOfferSignatureFetcher={getOfferSignatureFetcher}
            cancelOfferFetcher={cancelOfferFetcher}
            acceptOfferFetcher={acceptOfferFetcher}
            rejectOfferFetcher={rejectOfferFetcher}
            completeOfferFetcher={completeOfferFetcher}
            disabled={isMutating}
            onSuccess={onSuccess}
          />
        </div>
      </div>
    </div>
  )
}
