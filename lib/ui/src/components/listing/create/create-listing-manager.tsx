'use client'
import { pathProvider } from '@echo/api/routing/path-provider'
import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { getNftIndexForNfts } from '@echo/model/helpers/nft/get-nft-index-for-nfts'
import type { Collection } from '@echo/model/types/collection'
import type { Expiration } from '@echo/model/types/expiration'
import type { ListingTarget } from '@echo/model/types/listing-target'
import type { Nft, OwnedNft } from '@echo/model/types/nft'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { CreateListing } from '@echo/ui/components/listing/create/create-listing'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { mapListingTargetToRequest } from '@echo/ui/mappers/to-api/map-listing-target-to-request'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { FunctionComponent } from 'react'

interface Props {
  creatorNfts: OwnedNft[]
  items: Nullable<OwnedNft[]>
  target: Nullable<Collection>
}

export const CreateListingManager: FunctionComponent<Props> = ({ creatorNfts, items, target }) => {
  const t = useTranslations('error.listing')
  const router = useRouter()
  const { createListing } = useDependencies()
  const { trigger, isMutating } = useSWRTrigger<ListingResponse, CreateListingRequest>({
    key: SWRKeys.listing.create,
    fetcher: createListing,
    onSuccess: ({ listing }) => {
      router.replace(
        pathProvider.collection.default.getUrl({ slug: listing.target.collection.slug }, { listing: listing })
      )
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('new') },
      loggerContext: { component: CreateListingManager.name, fetcher: createListing.name }
    }
  })

  return (
    <CreateListing
      creatorNfts={creatorNfts}
      items={items}
      target={target}
      loading={isMutating}
      onComplete={(items: Nft[], target: ListingTarget, expiration: Expiration) => {
        void trigger({
          items: getNftIndexForNfts(items),
          target: mapListingTargetToRequest(target),
          expiration
        })
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}
