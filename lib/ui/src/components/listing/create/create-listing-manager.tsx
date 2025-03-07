'use client'
import type { Expiration } from '@echo/model/constants/expiration'
import { erc721NftToItem } from '@echo/model/mappers/nft/erc721-nft-to-item'
import type { Collection } from '@echo/model/types/collection'
import type { Erc721Item } from '@echo/model/types/item'
import type { Listing } from '@echo/model/types/listing'
import type { Erc721Nft, OwnedNft } from '@echo/model/types/nft'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { CreateListing } from '@echo/ui/components/listing/create/create-listing'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { useActions } from '@echo/ui/hooks/use-actions'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { type NonEmptyArray } from 'ramda'
import { type FunctionComponent, useCallback, useState } from 'react'

interface Props {
  creator: Listing['creator']
  creatorNfts: OwnedNft[]
  items: OwnedNft[]
  target: Nullable<Collection>
}

export const CreateListingManager: FunctionComponent<Props> = ({ creator, creatorNfts, items, target }) => {
  const t = useTranslations('error.listing')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { createListing } = useActions()

  const onCreate = useCallback(
    async (items: NonEmptyArray<OwnedNft>, target: Listing['target'], expiration: Expiration) => {
      try {
        const listing = await createListing({
          // TODO add ERC1155
          items: nonEmptyMap<Erc721Nft, Erc721Item>(erc721NftToItem, items as NonEmptyArray<Erc721Nft>),
          target: target,
          expiration
        })
        router.replace(frontendRoutes.listing.details.getUrl({ slug: listing.slug }))
      } catch (err) {
        errorCallback({
          alert: { severity: CalloutSeverity.Error, message: t('new') },
          loggerContext: { listing: { items, target, expiration } }
        })(err)
      } finally {
        setLoading(false)
      }
    },
    [createListing, router, t]
  )

  return (
    <CreateListing
      creator={creator}
      creatorNfts={creatorNfts}
      items={items}
      target={target}
      loading={loading}
      onComplete={(items: NonEmptyArray<OwnedNft>, target: Listing['target'], expiration: Expiration) => {
        setLoading(true)
        void onCreate(items, target, expiration)
      }}
      onCancel={() => {
        router.back()
      }}
    />
  )
}
