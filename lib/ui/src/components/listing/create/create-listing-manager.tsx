'use client'
import type { CreateListingRequestBuilderArgs } from '@echo/api/types/request-builders/create-listing-request-builder-args'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { Expiration } from '@echo/model/constants/expiration'
import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'
import type { Collection } from '@echo/model/types/collection'
import type { Erc721Item } from '@echo/model/types/erc721-item'
import type { Erc721Nft } from '@echo/model/types/erc721-nft'
import type { Listing } from '@echo/model/types/listing'
import type { OwnedNft } from '@echo/model/types/nft'
import { pathProvider } from '@echo/routing/constants/path-provider'
import { CreateListing } from '@echo/ui/components/listing/create/create-listing'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { type NonEmptyArray } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  creatorNfts: OwnedNft[]
  // TODO replace with items
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
        pathProvider.collection.default.withQuery({ listing: listing }).getUrl({ slug: listing.target.collection.slug })
      )
    },
    onError: {
      alert: { severity: CalloutSeverity.Error, message: t('new') },
      loggerContext: { component: CreateListingManager.name, fetcher: createListing.name }
    }
  })

  return (
    <CreateListing
      creatorNfts={creatorNfts}
      items={items}
      target={target}
      loading={isMutating}
      onComplete={(items: NonEmptyArray<OwnedNft>, target: Listing['target'], expiration: Expiration) => {
        void trigger({
          // TODO add ERC1155
          items: nonEmptyMap<Erc721Nft, Erc721Item>(erc721NftToItem, items as NonEmptyArray<Erc721Nft>),
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
