'use client'
import type { CreateListingArgs } from '@echo/api/services/fetcher/create-listing'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { listingContext } from '@echo/model/sentry/contexts/listing-context'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Collection } from '@echo/model/types/collection'
import type { Listing } from '@echo/model/types/listing'
import { type ListingItem } from '@echo/model/types/listing-item'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { BottomSlider } from '@echo/ui/components/layout/bottom-slider/bottom-slider'
import { BottomSliderTitle } from '@echo/ui/components/layout/bottom-slider/bottom-slider-title'
import { NewListingConfirmationModal } from '@echo/ui/components/listing/new/new-listing-confirmation-modal'
import { NewListingConfirmedModal } from '@echo/ui/components/listing/new/new-listing-confirmed-modal'
import { NewListingSlider } from '@echo/ui/components/listing/new/new-listing-slider'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { mapListingItemsToRequests } from '@echo/ui/mappers/to-api/map-listing-items-to-requests'
import { mapListingTargetToRequest } from '@echo/ui/mappers/to-api/map-listing-target-to-request'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl'
import { assoc, isNil, pathEq, pipe, reject } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  fetcher: {
    createListing: Fetcher<ListingResponse, CreateListingArgs>
  }
  provider: {
    collections: () => Promise<Collection[]>
  }
  user: AuthUser | undefined
  initialTarget?: ListingTarget
  initialItems?: ListingItem[]
  open: boolean
  onDismiss?: EmptyFunction
}

export const NewListingSliderManager: FunctionComponent<Props> = ({
  fetcher,
  provider,
  user,
  initialTarget,
  initialItems,
  open,
  onDismiss
}) => {
  const [collections, setCollections] = useState<Collection[]>()
  const [target, setTarget] = useState<ListingTarget | undefined>(initialTarget)
  const [items, setItems] = useState<ListingItem[]>(initialItems ?? [])
  const [confirmModalShown, setConfirmModalShown] = useState(false)
  const [listing, setListing] = useState<Listing>()
  const t = useTranslations('listing.new.bottomSlider')
  const tError = useTranslations('error.listing')
  const { trigger, isMutating } = useSWRTrigger<ListingResponse, CreateListingArgs>({
    key: SWRKeys.listing.create,
    fetcher: fetcher.createListing,
    onSuccess: (response) => {
      setConfirmModalShown(false)
      setListing(response.listing)
    },
    onError: {
      contexts: listingContext({
        targets: isNil(target) ? [] : [target],
        items
      }),
      alert: { severity: CalloutSeverity.ERROR, message: tError('new') },
      onError: () => {
        setConfirmModalShown(false)
      }
    }
  })
  useEffect(() => {
    void provider.collections().then(setCollections)
  }, [provider])

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
        show={open}
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
        open={confirmModalShown}
        confirming={isMutating}
        onClose={() => setConfirmModalShown(false)}
        onConfirm={() => {
          void trigger({
            items: mapListingItemsToRequests(items),
            target: mapListingTargetToRequest(target),
            token: user?.sessionToken
          })
        }}
      />
      <NewListingConfirmedModal
        listing={listing}
        open={!isNil(listing)}
        onClose={() => {
          clearListing()
          onDismiss?.()
        }}
      />
    </>
  )
}
