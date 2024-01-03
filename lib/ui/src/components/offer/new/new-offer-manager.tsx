'use client'
import type { CreateOfferArgs } from '@echo/api/services/fetcher/create-offer'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { type AuthUser } from '@echo/model/types/auth-user'
import type { OfferItem } from '@echo/model/types/offer-item'
import { NewOfferConfirmationModal } from '@echo/ui/components/offer/new/new-offer-confirmation-modal'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { pathEq, reject } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'

interface Props {
  fetcher: {
    createOffer: Fetcher<OfferResponse, CreateOfferArgs>
  }
  user: AuthUser | undefined
}
// TODO Add the creation of offer
export const NewOfferManager: FunctionComponent<Props> = () => {
  // const tError = useTranslations('error.offer')
  const { setReceiverItems, setSenderItems, receiver, receiverItems, senderItems, clearOffer, modalOpen, closeModal } =
    useNewOfferStore()
  // const [offer, setOffer] = useState<Offer>()
  const onRemoveSenderItems = useCallback(
    (item: OfferItem) => {
      setSenderItems(reject(pathEq(item.nft.id, ['nft', 'id'])))
    },
    [setSenderItems]
  )
  const onRemoveReceiverItems = useCallback(
    (item: OfferItem) => {
      setReceiverItems(reject(pathEq(item.nft.id, ['nft', 'id'])))
    },
    [setReceiverItems]
  )
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
  return (
    //   TODO Add logic to complete offer
    <NewOfferConfirmationModal
      receiver={receiver()}
      receiverItems={receiverItems}
      onRemoveReceiverItem={onRemoveReceiverItems}
      senderItems={senderItems}
      onRemoveSenderItem={onRemoveSenderItems}
      open={modalOpen}
      onClear={clearOffer}
      onClose={closeModal}
      onContinue={closeModal}
    />
  )
}
