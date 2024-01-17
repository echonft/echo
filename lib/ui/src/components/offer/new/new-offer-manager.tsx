'use client'
import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import type { Offer } from '@echo/model/types/offer'
import { NewOfferConfirmationModal } from '@echo/ui/components/offer/new/new-offer-confirmation-modal'
import { NewOfferConfirmedModal } from '@echo/ui/components/offer/new/new-offer-confirmed-modal'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { mapOfferItemsToRequests } from '@echo/ui/mappers/to-api/map-offer-items-to-requests'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent, useEffect, useRef, useState } from 'react'

interface Props {
  fetcher: {
    createOffer: Fetcher<OfferResponse, CreateOfferRequest>
  }
}

export const NewOfferManager: FunctionComponent<Props> = ({ fetcher }) => {
  const tError = useTranslations('error.offer')
  const { receiver, receiverItems, senderItems, clearOffer, modalOpen, closeModal } = useNewOfferStore()
  const clearOfferTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const [offer, setOffer] = useState<Offer>()
  const { trigger, isMutating } = useSWRTrigger<OfferResponse, CreateOfferRequest>({
    key: SWRKeys.offer.create,
    fetcher: fetcher.createOffer,
    onSuccess: (response) => {
      clearOffer()
      closeModal()
      setOffer(response.offer)
    },
    onError: {
      contexts: offerContext({
        receiverItems,
        senderItems
      }),
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('new') },
      onError: () => {
        clearOffer()
        closeModal()
      }
    }
  })

  useEffect(() => {
    return (): void => {
      if (!isNil(clearOfferTimeoutRef.current)) {
        clearTimeout(clearOfferTimeoutRef.current)
      }
    }
  }, [])

  if (isNil(receiver)) {
    return <NewOfferConfirmedModal offer={offer} open={!isNil(offer)} onClose={() => setOffer(undefined)} />
  }
  return (
    <NewOfferConfirmationModal
      receiver={receiver}
      receiverItems={receiverItems}
      senderItems={senderItems}
      open={modalOpen}
      onClear={
        isMutating
          ? undefined
          : () => {
              closeModal()
              clearOfferTimeoutRef.current = setTimeout(clearOffer, 210)
            }
      }
      onClose={isMutating ? undefined : closeModal}
      onContinue={isMutating ? undefined : closeModal}
      onComplete={
        isMutating
          ? undefined
          : () => {
              void trigger({
                senderItems: mapOfferItemsToRequests(senderItems),
                receiverItems: mapOfferItemsToRequests(receiverItems)
              })
            }
      }
    />
  )
}
