'use client'
import type { CreateListingRequestBuilderArgs } from '@echo/api/types/request-builders/create-listing-request-builder-args'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { Expiration } from '@echo/model/constants/expiration'
import { nftToToken } from '@echo/model/mappers/nft/nft-to-token'
import type { Collection } from '@echo/model/types/collection/collection'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { Listing } from '@echo/model/types/listing/listing'
import type { Erc721Nft } from '@echo/model/types/nft/erc721-nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { pathProvider } from '@echo/routing/path-provider'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { CreateListing } from '@echo/ui/components/listing/create/create-listing'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { map, type NonEmptyArray, objOf, pipe } from 'ramda'
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
  const { trigger, isMutating } = useSWRTrigger<ListingResponse, CreateListingRequestBuilderArgs>({
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
      onComplete={(items: OwnedNft[], target: Listing['target'], expiration: Expiration) => {
        void trigger({
          // TODO add ERC1155
          items: map<Erc721Nft, Erc721Item>(
            pipe(nftToToken, objOf('token')),
            items as NonEmptyArray<Erc721Nft>
          ) as NonEmptyArray<Erc721Item>,
          target: target,
          expiration
        })
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}
