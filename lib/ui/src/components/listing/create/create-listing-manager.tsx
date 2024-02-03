'use client'

import type { CollectionProviderResult } from '@echo/api/types/providers/collection-provider-result'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { type ListingResponse } from '@echo/api/types/responses/listing-response'
import { listingContext } from '@echo/model/sentry/contexts/listing-context'
import type { Listing } from '@echo/model/types/listing'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { CreateListingConfirmedModal } from '@echo/ui/components/listing/create/confirmed/create-listing-confirmed-modal'
import { CreateListingModal } from '@echo/ui/components/listing/create/create-listing-modal'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useNewListingStore } from '@echo/ui/hooks/use-new-listing-store'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { mapItemsToRequests } from '@echo/ui/mappers/to-api/map-items-to-requests'
import { mapListingTargetToRequest } from '@echo/ui/mappers/to-api/map-listing-target-to-request'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { assoc, isNil } from 'ramda'
import { type FunctionComponent, useEffect, useRef, useState } from 'react'

export const CreateListingManager: FunctionComponent = () => {
  const { createListing, getCollections } = useDependencies()
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
    fetcher: createListing,
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
    void getCollections().then(setCollections)
  }, [getCollections])

  function onCollectionSelectionChange(selection: Nullable<CollectionProviderResult>) {
    if (isNil(selection)) {
      setTarget(undefined)
    } else {
      setTarget({ collection: selection, amount: 1 })
    }
  }

  function onTargetAmountChange(_targetCollectionId: string, amount: number) {
    setTarget(assoc('amount', amount))
  }

  return (
    <>
      <CreateListingModal
        target={target}
        items={items}
        open={modalOpen}
        collections={collections}
        onCollectionSelectionChange={onCollectionSelectionChange}
        onTargetAmountChange={onTargetAmountChange}
        loading={isMutating}
        onClose={closeModal}
        onContinue={closeModal}
        onClear={() => {
          closeModal()
          clearListingTimeoutRef.current = setTimeout(clearListing, 210)
        }}
        onConfirm={() => {
          void trigger({
            items: mapItemsToRequests(items),
            target: mapListingTargetToRequest(target)
          })
        }}
      />
      <CreateListingConfirmedModal
        listing={listing}
        open={!isNil(listing)}
        onClose={() => {
          setListing(undefined)
        }}
      />
    </>
  )
}
