'use client'
import type { CreateOfferArgs } from '@echo/api/services/fetcher/create-offer'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { type AuthUser } from '@echo/model/types/auth-user'
import { NewOfferConfirmationModal } from '@echo/ui/components/offer/new/new-offer-confirmation-modal'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { isNil } from 'ramda'
import { type FunctionComponent, useEffect, useRef } from 'react'

interface Props {
  fetcher: {
    createOffer: Fetcher<OfferResponse, CreateOfferArgs>
  }
  user: AuthUser | undefined
}
// TODO Add the creation of offer
export const NewOfferManager: FunctionComponent<Props> = () => {
  // const tError = useTranslations('error.offer')
  const { getReceiver, receiverItems, senderItems, clearOffer, modalOpen, closeModal } = useNewOfferStore()
  const clearOfferTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return (): void => {
      if (!isNil(clearOfferTimeoutRef.current)) {
        clearTimeout(clearOfferTimeoutRef.current)
      }
    }
  }, [])

  // const [offer, setOffer] = useState<Offer>()

  // const { trigger, isMutating } = useSWRTrigger<OfferResponse, CreateOfferArgs>({
  //   key: SWRKeys.offer.create,
  //   fetcher: fetcher.createOffer,
  //   onSuccess: (response) => {
  //     // setConfirmOfferModalShown(false)
  //     clearOffer()
  //     setOffer(response.offer)
  //   },
  //   onError: {
  //     contexts: offerContext({
  //       receiverItems,
  //       senderItems
  //     }),
  //     alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('new') },
  //     onError: () => {
  //       // setConfirmOfferModalShown(false)
  //     }
  //   }
  // })

  const receiver = getReceiver()

  if (isNil(receiver)) {
    return null
  }
  return (
    //   TODO Add logic to complete offer
    <NewOfferConfirmationModal
      receiver={receiver}
      receiverItems={receiverItems}
      senderItems={senderItems}
      open={modalOpen}
      onClear={() => {
        closeModal()
        clearOfferTimeoutRef.current = setTimeout(clearOffer, 210)
      }}
      onClose={closeModal}
      onContinue={closeModal}
    />
  )
}
