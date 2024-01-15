'use client'
import type { CollectionProvider, CollectionProviderResult } from '@echo/api/services/providers/collections'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { listingContext } from '@echo/model/sentry/contexts/listing-context'
import type { Listing } from '@echo/model/types/listing'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { NewListingConfirmationModal } from '@echo/ui/components/listing/new/new-listing-confirmation-modal'
import { NewListingConfirmedModal } from '@echo/ui/components/listing/new/new-listing-confirmed-modal'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useNewListingStore } from '@echo/ui/hooks/use-new-listing-store'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { mapListingItemsToRequests } from '@echo/ui/mappers/to-api/map-listing-items-to-requests'
import { mapListingTargetToRequest } from '@echo/ui/mappers/to-api/map-listing-target-to-request'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { useTranslations } from 'next-intl'
import { assoc, isNil } from 'ramda'
import { type FunctionComponent, useEffect, useRef, useState } from 'react'

export type Target = Omit<ListingTarget, 'collection'> & Record<'collection', CollectionProviderResult>
interface Props {
  fetcher: {
    createListing: Fetcher<ListingResponse, CreateListingRequest>
  }
  provider: {
    collections: CollectionProvider
  }
}

export const NewListingManager: FunctionComponent<Props> = ({ fetcher, provider }) => {
  const { items, target, setTarget, modalOpen, clearListing, closeModal } = useNewListingStore()
  const [collections, setCollections] = useState<CollectionProviderResult[]>()
  const [listing, setListing] = useState<Listing>()
  const clearListingTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    return (): void => {
      if (!isNil(clearListingTimeoutRef.current)) {
        clearTimeout(clearListingTimeoutRef.current)
      }
    }
  }, [])
  const tError = useTranslations('error.listing')
  const { trigger, isMutating } = useSWRTrigger<ListingResponse, CreateListingRequest>({
    key: SWRKeys.listing.create,
    fetcher: fetcher.createListing,
    onSuccess: (response) => {
      closeModal()
      setListing(response.listing)
      clearListing()
    },
    onError: {
      contexts: listingContext({
        targets: isNil(target) ? [] : ([target] as ListingTarget[]),
        items
      }),
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('new') },
      onError: () => {
        closeModal()
      }
    }
  })
  useEffect(() => {
    void provider.collections().then(setCollections)
  }, [provider])

  function onCollectionSelectionChange(selection: CollectionProviderResult | undefined) {
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

  return (
    <>
      <NewListingConfirmationModal
        target={target}
        items={items}
        open={modalOpen}
        collections={collections}
        onCollectionSelectionChange={onCollectionSelectionChange}
        onTargetAmountChange={onTargetAmountChange}
        onRemoveTarget={onRemoveTarget}
        isMutating={isMutating}
        onClose={closeModal}
        onClear={() => {
          closeModal()
          clearListingTimeoutRef.current = setTimeout(clearListing, 210)
        }}
        onConfirm={() => {
          void trigger({
            items: mapListingItemsToRequests(items),
            target: mapListingTargetToRequest(target)
          })
        }}
      />
      <NewListingConfirmedModal
        listing={listing}
        open={!isNil(listing)}
        onClose={() => {
          setListing(undefined)
        }}
      />
    </>
  )
}
