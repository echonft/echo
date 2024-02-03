'use client'
import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import type { Offer } from '@echo/model/types/offer'
import { CreateOfferConfirmedModal } from '@echo/ui/components/offer/create/confirmed/create-offer-confirmed-modal'
import { CreateOfferModal } from '@echo/ui/components/offer/create/create-offer-modal'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { mapItemsToRequests } from '@echo/ui/mappers/to-api/map-items-to-requests'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent, useEffect, useRef, useState } from 'react'

export const CreateOfferManager: FunctionComponent = () => {
  const tError = useTranslations('error.offer')
  const { createOffer } = useDependencies()
  const { receiver, receiverItems, senderItems, clearOffer, modalOpen, closeModal } = useNewOfferStore()
  const clearOfferTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const [offer, setOffer] = useState<Offer>()
  const { trigger, isMutating } = useSWRTrigger<OfferResponse, CreateOfferRequest>({
    key: SWRKeys.offer.create,
    fetcher: createOffer,
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
    return <CreateOfferConfirmedModal offer={offer} open={!isNil(offer)} onClose={() => setOffer(undefined)} />
  }
  return (
    <CreateOfferModal
      receiver={receiver}
      receiverItems={receiverItems}
      senderItems={senderItems}
      open={modalOpen}
      loading={isMutating}
      onClear={() => {
        closeModal()
        clearOfferTimeoutRef.current = setTimeout(clearOffer, 210)
      }}
      onClose={closeModal}
      onContinue={closeModal}
      onComplete={() => {
        void trigger({
          senderItems: mapItemsToRequests(senderItems),
          receiverItems: mapItemsToRequests(receiverItems)
        })
      }}
    />
  )
}
