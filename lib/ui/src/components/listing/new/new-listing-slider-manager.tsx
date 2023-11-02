'use client'
import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { listingContext } from '@echo/model/sentry/contexts/listing-context'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Collection } from '@echo/model/types/collection'
import type { Listing } from '@echo/model/types/listing'
import { type ListingItem } from '@echo/model/types/listing-item'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { BottomSlider } from '@echo/ui/components/layout/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '@echo/ui/components/layout/bottom-slider/bottom-slider-title'
import { CalloutManager } from '@echo/ui/components/layout/callout/callout-manager'
import { NewListingConfirmationModal } from '@echo/ui/components/listing/new/new-listing-confirmation-modal'
import { NewListingConfirmedModal } from '@echo/ui/components/listing/new/new-listing-confirmed-modal'
import { NewListingSlider } from '@echo/ui/components/listing/new/new-listing-slider'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import { mapListingItemsToRequests } from '@echo/ui/mappers/to-api/map-listing-items-to-requests'
import { mapListingTargetToRequest } from '@echo/ui/mappers/to-api/map-listing-target-to-request'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { Transition } from '@headlessui/react'
import { captureException } from '@sentry/nextjs'
import { useTranslations } from 'next-intl'
import { assoc, isNil, pathEq, pipe, reject } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'

interface Props {
  collectionProvider: {
    get: () => Promise<Collection[]>
  }
  createListingFetcher: (parameters: CreateListingRequest, token: string | undefined) => Promise<ListingResponse>
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
  const { show: showAlert } = useAlertStore()
  const [collections, setCollections] = useState<Collection[]>()
  const [target, setTarget] = useState<ListingTarget | undefined>(initialTarget)
  const [items, setItems] = useState<ListingItem[]>(initialItems ?? [])
  const [confirmModalShown, setConfirmModalShown] = useState(false)
  const [listing, setListing] = useState<Listing>()
  const t = useTranslations('listing.new.bottomSlider')
  const tError = useTranslations('error.listing')
  const { trigger, isMutating } = useSWRMutation<
    ListingResponse,
    Error,
    string,
    { items: ListingItem[]; target: ListingTarget | undefined; user: AuthUser | undefined }
  >(
    'create-listing',
    (_key, { arg: { items, target, user } }) =>
      createListingFetcher(
        { items: mapListingItemsToRequests(items), target: mapListingTargetToRequest(target) },
        user?.sessionToken
      ),
    {
      onSuccess: (data) => {
        setConfirmModalShown(false)
        setListing(data.listing)
      },
      onError: (error) => {
        setConfirmModalShown(false)
        captureException(error, {
          contexts: listingContext({
            targets: (isNil(target) ? [] : [target]) as NonEmptyArray<ListingTarget>,
            items: items as NonEmptyArray<ListingItem>
          })
        })
        showAlert({ severity: CalloutSeverity.ERROR, message: tError('new') })
      }
    }
  )

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
          void trigger({ items, target, user })
        }}
      />
      <NewListingConfirmedModal
        listing={listing}
        show={!isNil(listing)}
        onClose={() => {
          clearListing()
          onDismiss?.()
        }}
      />
      <CalloutManager />
    </>
  )
}
