'use client'
import { createOfferFetcher } from '@echo/api/services/fetcher/create-offer-fetcher'
import type { AuthUser } from '@echo/model/types/auth-user'
import { BottomSlider } from '@echo/ui/components/layout/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '@echo/ui/components/layout/bottom-slider/bottom-slider-title'
import { NewOfferBottomSliderInnerContainer } from '@echo/ui/components/offer/new/new-offer-bottom-slider-inner-container'
import { NewOfferConfirmationModal } from '@echo/ui/components/offer/new/new-offer-confirmation-modal'
import { NewOfferConfirmedModal } from '@echo/ui/components/offer/new/new-offer-confirmed-modal'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { mapOfferItemsToRequests } from '@echo/ui/mappers/to-api/map-offer-items-to-requests'
import { Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { pathEq, reject } from 'ramda'
import { type FunctionComponent, useCallback, useState } from 'react'
import useSWRMutation from 'swr/mutation'

interface Props {
  user: AuthUser | undefined
}
export const NewOfferSliderManager: FunctionComponent<Props> = ({ user }) => {
  const t = useTranslations('offer.new.bottomSlider')
  const { hasNewOfferPending, setReceiverItems, setSenderItems, receiver, receiverItems, senderItems, clearOffer } =
    useNewOfferStore()
  const [confirmOfferModalShown, setConfirmOfferModalShown] = useState(false)
  const [confirmedModalShown, setConfirmedModalShown] = useState(false)
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
  const createOffer = useCallback(
    () =>
      createOfferFetcher(
        { senderItems: mapOfferItemsToRequests(senderItems), receiverItems: mapOfferItemsToRequests(receiverItems) },
        user?.sessionToken
      ),
    [receiverItems, senderItems, user]
  )
  const { trigger, isMutating } = useSWRMutation('create-offer', createOffer)

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
        show={confirmOfferModalShown}
        confirming={isMutating}
        onClose={() => setConfirmOfferModalShown(false)}
        onConfirm={() => {
          trigger()
            .then(() => {
              setConfirmOfferModalShown(false)
              setConfirmedModalShown(true)
            })
            .catch((_err) => {
              // TODO show the error
            })
        }}
      />
      <NewOfferConfirmedModal
        show={confirmedModalShown}
        onClose={() => {
          clearOffer()
          setConfirmedModalShown(false)
        }}
      />
    </>
  )
}
