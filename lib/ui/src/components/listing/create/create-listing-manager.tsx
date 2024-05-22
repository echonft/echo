'use client'
import { linkProvider } from '@echo/api/routing/link-provider'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { Collection } from '@echo/model/types/collection'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { ListingTarget } from '@echo/model/types/listing-target'
import type { Nft } from '@echo/model/types/nft'
import { CreateListing } from '@echo/ui/components/listing/create/create-listing'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { mapItemsToRequests } from '@echo/ui/mappers/to-api/map-items-to-requests'
import { mapListingTargetToRequest } from '@echo/ui/mappers/to-api/map-listing-target-to-request'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  creatorNfts: SelectableNft[]
  items: Nullable<Nft[]>
  target: Nullable<Collection>
}

export const CreateListingManager: FunctionComponent<Props> = ({ creatorNfts, items, target }) => {
  const t = useTranslations('error.listing')
  const router = useRouter()
  const { createListing } = useDependencies()
  const { trigger, isMutating } = useSWRTrigger<ListingResponse, CreateListingRequest>({
    key: SWRKeys.listing.create,
    fetcher: createListing,
    onSuccess: (response) => {
      router.replace(linkProvider.listing.details.get({ listingSlug: response.listing.slug }))
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('new') }
    }
  })

  return (
    <CreateListing
      creatorNfts={creatorNfts}
      items={items}
      target={target}
      loading={isMutating}
      onComplete={(items: ListingItem[], target: ListingTarget) => {
        void trigger({
          items: mapItemsToRequests(items),
          target: mapListingTargetToRequest(target)
        })
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}
