'use client'
import type { CreateOfferRequest } from '@echo/api/types/requests/create-offer-request'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import { type AuthUser } from '@echo/model/types/auth-user'
import type { Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { BottomSlider } from '@echo/ui/components/layout/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '@echo/ui/components/layout/bottom-slider/bottom-slider-title'
import { NewOfferBottomSliderInnerContainer } from '@echo/ui/components/offer/new/new-offer-bottom-slider-inner-container'
import { NewOfferConfirmationModal } from '@echo/ui/components/offer/new/new-offer-confirmation-modal'
import { NewOfferConfirmedModal } from '@echo/ui/components/offer/new/new-offer-confirmed-modal'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { mapOfferItemsToRequests } from '@echo/ui/mappers/to-api/map-offer-items-to-requests'
import { Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { isNil, pathEq, reject } from 'ramda'
import { type FunctionComponent, useCallback, useState } from 'react'

interface Props {
  createOfferFetcher: (parameters: CreateOfferRequest, token: string | undefined) => Promise<OfferResponse>
  user: AuthUser | undefined
}
export const NewOfferSliderManager: FunctionComponent<Props> = ({ createOfferFetcher, user }) => {
  const t = useTranslations('offer.new.bottomSlider')
  const tError = useTranslations('error.offer')
  const { hasNewOfferPending, setReceiverItems, setSenderItems, receiver, receiverItems, senderItems, clearOffer } =
    useNewOfferStore()
  const [confirmOfferModalShown, setConfirmOfferModalShown] = useState(false)
  const [offer, setOffer] = useState<Offer>()
  const onRemoveSenderItems = useCallback(
    (nftId: string) => {
      setSenderItems(reject(pathEq(nftId, ['nft', 'id'])))
    },
    [setSenderItems]
  )
  const onRemoveReceiverItems = useCallback(
    (nftId: string) => {
      setReceiverItems(reject(pathEq(nftId, ['nft', 'id'])))
    },
    [setReceiverItems]
  )
  const { trigger, isMutating } = useSWRTrigger<
    OfferResponse,
    { receiverItems: OfferItem[]; senderItems: OfferItem[]; user: AuthUser | undefined }
  >({
    key: 'create-offer',
    fetcher: ({ receiverItems, senderItems, user }) =>
      createOfferFetcher(
        { senderItems: mapOfferItemsToRequests(senderItems), receiverItems: mapOfferItemsToRequests(receiverItems) },
        user?.sessionToken
      ),
    onSuccess: (response) => {
      setConfirmOfferModalShown(false)
      clearOffer()
      setOffer(response.offer)
    },
    onError: {
      contexts: offerContext({
        receiverItems,
        senderItems
      }),
      alert: { severity: CalloutSeverity.ERROR, message: tError('new') },
      onError: () => {
        setConfirmOfferModalShown(false)
      }
    }
  })

  return (
    <>
      {/*  FIXME There is a display problem with some of the items appearing on top during animation */}
      <Transition
        show={hasNewOfferPending()}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <BottomSlider renderTitle={() => <BottomSliderTitle title={t('title')} count={receiverItems.length} />}>
          <NewOfferBottomSliderInnerContainer
            receiver={receiver()}
            receiverItems={receiverItems}
            senderItems={senderItems}
            onRemoveReceiverItem={onRemoveReceiverItems}
            onRemoveSenderItem={onRemoveSenderItems}
            onDismissOffer={clearOffer}
            onConfirmOffer={() => setConfirmOfferModalShown(true)}
          />
        </BottomSlider>
      </Transition>
      <NewOfferConfirmationModal
        receiverItems={receiverItems}
        senderItems={senderItems}
        open={confirmOfferModalShown}
        confirming={isMutating}
        onClose={() => setConfirmOfferModalShown(false)}
        onConfirm={() => {
          void trigger({ receiverItems, senderItems, user })
        }}
      />
      <NewOfferConfirmedModal
        offer={offer}
        open={!isNil(offer)}
        onClose={() => {
          setOffer(undefined)
        }}
      />
    </>
  )
}
