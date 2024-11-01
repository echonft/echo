'use client'
import { ListingRole } from '@echo/model/constants/listing-role'
import { listingItems } from '@echo/model/helpers/listing/listing-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import type { Slug } from '@echo/model/types/slug'
import { ListingDetailsButtons } from '@echo/ui/components/listing/details/listing-details-buttons'
import { ListingDetailsItems } from '@echo/ui/components/listing/details/listing-details-items'
import { TradeDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-layout'
import { TradeDetailsListingState } from '@echo/ui/components/trade/trade-details-listing-state'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { useActions } from '@echo/ui/hooks/use-actions'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { useTranslations } from 'next-intl'
import { assoc, pipe } from 'ramda'
import { type FunctionComponent, useCallback, useState } from 'react'

export interface ListingDetailsProps {
  // TODO update to have a listing where NFT items token are OwnedNft
  listing: ListingWithRole
  onUpdate?: (listing: ListingWithRole) => unknown
}

export const ListingDetails: FunctionComponent<ListingDetailsProps> = ({ listing, onUpdate }) => {
  const t = useTranslations('error.listing')
  // const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { cancelListing } = useActions()
  const onCancel = useCallback(
    async (slug: Slug) => {
      try {
        const cancelledListing = await cancelListing(slug)
        onUpdate?.(assoc('role', listing.role, cancelledListing))
      } catch (err) {
        errorCallback({
          alert: { severity: CalloutSeverity.Error, message: t('cancel') },
          loggerContext: { listing }
        })(err)
      } finally {
        setLoading(false)
      }
    },
    [cancelListing, listing, onUpdate, t]
  )
  const { target, creator, role } = listing
  const { collection } = target
  const { pictureUrl } = collection
  // TODO remove
  const nfts = pipe(listingItems, nonEmptyMap(pipe(nftItemToNft(listing.creator), assoc('attributes', []))))(listing)

  return (
    <TradeDetailsLayout backgroundPictureUrl={pictureUrl}>
      <TradeDetailsListingState trade={listing} />
      <ListingDetailsItems creator={creator} nfts={nfts} target={target} role={role} />
      <ListingDetailsButtons
        listing={listing}
        isMutating={loading}
        onCancel={(listing) => {
          setLoading(true)
          void onCancel(listing.slug)
        }}
        onFill={() => {
          // FIXME
          // router.push(pathProvider.offer.new.get({ items: listing.items, target: listing.target.collection }))
        }}
      />
    </TradeDetailsLayout>
  )
}
