'use client'
import { HideIfNil } from '@echo/ui/components/base/utils/hide-if-nil'
import { BottomSlider } from '@echo/ui/components/layout/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '@echo/ui/components/layout/bottom-slider/bottom-slider-title'
import { NewOfferBottomSliderInnerContainer } from '@echo/ui/components/offer/new/new-offer-bottom-slider-inner-container'
import { NewOfferConfirmationModal } from '@echo/ui/components/offer/new/new-offer-confirmation-modal'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useCallback, useState } from 'react'

export const NewOfferSliderManager: FunctionComponent = () => {
  const t = useTranslations('offer.new.bottomSlider')
  const { hasNewOfferPending, setReceiverItems, setSenderItems, offer, clearOffer } = useNewOfferStore()
  const [confirmNewOffer, setConfirmNewOffer] = useState(false)

  const onRemoveSenderItems = useCallback(
    (nftId: string) => {
      setSenderItems(offer.senderItems.filter((item) => item.nft.id !== nftId))
    },
    [offer, setSenderItems]
  )

  const onRemoveReceiverItems = useCallback(
    (nftId: string) => {
      setReceiverItems(offer.receiverItems.filter((item) => item.nft.id !== nftId))
    },
    [offer, setReceiverItems]
  )
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
        {/* FIXME Because of the HideIfNil, the transition out does not work */}
        <HideIfNil
          checks={offer}
          render={(newOffer) => (
            <BottomSlider
              renderTitle={() => <BottomSliderTitle title={t('title')} count={newOffer.receiverItems.length} />}
            >
              <NewOfferBottomSliderInnerContainer
                receiver={newOffer.receiver}
                receiverItems={newOffer.receiverItems}
                senderItems={newOffer.senderItems}
                onRemoveReceiverItem={onRemoveReceiverItems}
                onRemoveSenderItem={onRemoveSenderItems}
                onDismissOffer={clearOffer}
                onConfirmOffer={() => setConfirmNewOffer(true)}
              />
            </BottomSlider>
          )}
        />
      </Transition>
      <NewOfferConfirmationModal
        newOffer={confirmNewOffer ? offer : undefined}
        onClose={() => setConfirmNewOffer(false)}
      />
    </>
  )
}
