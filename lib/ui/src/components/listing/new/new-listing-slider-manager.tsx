'use client'
import { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { GetListingResponse } from '@echo/api/types/responses/get-listing-response'
import { BottomSlider } from '@echo/ui/components/layout/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '@echo/ui/components/layout/bottom-slider/bottom-slider-title'
import { NewListingConfirmationModal } from '@echo/ui/components/listing/new/new-listing-confirmation-modal'
import { NewListingSlider } from '@echo/ui/components/listing/new/new-listing-slider'
import { NewOfferConfirmedModal } from '@echo/ui/components/offer/new/new-offer-confirmed-modal'
import { mapListingItemsToRequests } from '@echo/ui/mappers/to-api/map-listing-items-to-requests'
import { mapListingTargetToRequest } from '@echo/ui/mappers/to-api/map-listing-target-to-request'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import type { Collection } from '@echo/ui/types/model/collection'
import type { ListingItem } from '@echo/ui/types/model/listing-item'
import type { ListingTarget } from '@echo/ui/types/model/listing-target'
import { Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { assoc, isNil, pathEq, pipe, reject } from 'ramda'
import { type FunctionComponent, useCallback, useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'

interface Props {
  collectionProvider: {
    get: () => Promise<Collection[]>
  }
  createListingFetcher: (parameters: CreateListingRequest, token: string | undefined) => Promise<GetListingResponse>
  user: AuthUser | undefined
  initialTarget?: ListingTarget
  initialItems?: ListingItem[]
  show?: boolean
  onDismiss?: () => unknown
}

export const NewListingSliderManager: FunctionComponent<Props> = ({
  collectionProvider,
  createListingFetcher,
  user,
  initialTarget,
  initialItems,
  show,
  onDismiss
}) => {
  const [collections, setCollections] = useState<Collection[]>()
  const [target, setTarget] = useState<ListingTarget | undefined>(initialTarget)
  const [items, setItems] = useState<ListingItem[]>(initialItems ?? [])
  const [confirmModalShown, setConfirmModalShown] = useState(false)
  const [confirmedModalShown, setConfirmedModalShown] = useState(false)
  const t = useTranslations('listing.new.bottomSlider')
  const createListing = useCallback(
    () =>
      createListingFetcher(
        { items: mapListingItemsToRequests(items), target: mapListingTargetToRequest(target) },
        user?.sessionToken
      ),
    [createListingFetcher, items, target, user]
  )
  const { trigger, isMutating } = useSWRMutation('create-listing', createListing)

  useEffect(() => {
    void collectionProvider.get().then(setCollections)
  }, [collectionProvider])

  function onCollectionSelectionChange(selection: Collection | undefined) {
    if (isNil(selection)) {
      setTarget(undefined)
    } else {
      setTarget({ collection: selection, amount: 1 })
    }
  }

  function onTargetAmountChange(_targetCollectionId: string, amount: number) {
    setTarget(assoc('amount', amount))
  }

  function onRemoveTarget(_targetCollectionId: string) {
    setTarget(undefined)
  }

  function onRemoveItem(itemNftId: string) {
    pipe(reject(pathEq(itemNftId, ['nft', 'id'])), setItems)(items)
  }

  function clearListing() {
    setTarget(undefined)
    setItems([])
  }

  function onDismissListing() {
    clearListing()
    onDismiss?.()
  }

  return (
    <>
      <Transition
        show={show}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <BottomSlider renderTitle={() => <BottomSliderTitle title={t('title')} count={items.length} />}>
          <NewListingSlider
            items={items}
            target={target}
            collections={collections}
            onCollectionSelectionChange={onCollectionSelectionChange}
            onTargetAmountChange={onTargetAmountChange}
            onRemoveTarget={onRemoveTarget}
            onRemoveItem={onRemoveItem}
            onFinalize={() => setConfirmModalShown(true)}
            onDismissListing={onDismissListing}
          />
        </BottomSlider>
      </Transition>
      <NewListingConfirmationModal
        target={target}
        items={items}
        show={confirmModalShown}
        confirming={isMutating}
        onClose={() => setConfirmModalShown(false)}
        onConfirm={() => {
          trigger()
            .then(() => {
              setConfirmModalShown(false)
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
          clearListing()
          setConfirmedModalShown(false)
        }}
      />
    </>
  )
}
