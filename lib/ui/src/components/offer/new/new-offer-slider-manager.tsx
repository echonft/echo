'use client'
import type { CreateOfferArgs } from '@echo/api/services/fetcher/create-offer'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import { type AuthUser } from '@echo/model/types/auth-user'
import type { Offer } from '@echo/model/types/offer'
import { BottomSlider } from '@echo/ui/components/layout/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '@echo/ui/components/layout/bottom-slider/bottom-slider-title'
import { NewOfferBottomSliderInnerContainer } from '@echo/ui/components/offer/new/new-offer-bottom-slider-inner-container'
import { NewOfferConfirmationModal } from '@echo/ui/components/offer/new/new-offer-confirmation-modal'
import { NewOfferConfirmedModal } from '@echo/ui/components/offer/new/new-offer-confirmed-modal'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { mapOfferItemsToRequests } from '@echo/ui/mappers/to-api/map-offer-items-to-requests'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { isNil, pathEq, reject } from 'ramda'
import { type FunctionComponent, useCallback, useState } from 'react'

interface Props {
  fetcher: {
    createOffer: Fetcher<OfferResponse, CreateOfferArgs>
  }
  user: AuthUser | undefined
}
export const NewOfferSliderManager: FunctionComponent<Props> = ({ fetcher, user }) => {
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
  const { trigger, isMutating } = useSWRTrigger<OfferResponse, CreateOfferArgs>({
    key: SWRKeys.offer.create,
    fetcher: fetcher.createOffer,
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
          void trigger({
            senderItems: mapOfferItemsToRequests(senderItems),
            receiverItems: mapOfferItemsToRequests(receiverItems),
            token: user?.sessionToken
          })
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
