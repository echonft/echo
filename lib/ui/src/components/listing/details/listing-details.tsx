'use client'
import { listingItems } from '@echo/model/helpers/listing/listing-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { ListingDetailsButtons } from '@echo/ui/components/listing/details/listing-details-buttons'
import { ListingDetailsItems } from '@echo/ui/components/listing/details/listing-details-items'
import { ListingDetailsState } from '@echo/ui/components/listing/details/listing-details-state'
import { TradeDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-layout'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { useActions } from '@echo/ui/hooks/use-actions'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { assoc, pipe } from 'ramda'
import { type FunctionComponent, useCallback, useState } from 'react'

export interface ListingDetailsProps {
  listing: ListingWithRole
  onUpdate?: (listing: ListingWithRole) => unknown
}

export const ListingDetails: FunctionComponent<ListingDetailsProps> = ({ listing, onUpdate }) => {
  const t = useTranslations('error.listing')
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { cancelListing } = useActions()
  const onCancel = useCallback(
    async (slug: Lowercase<string>) => {
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
  const nfts = pipe(listingItems, nonEmptyMap(pipe(nftItemToNft(listing.creator), assoc('attributes', []))))(listing)

  return (
    <TradeDetailsLayout>
      <ListingDetailsState trade={listing} />
      <ListingDetailsItems creator={creator} nfts={nfts} target={target} role={role} />
      <ListingDetailsButtons
        listing={listing}
        isMutating={loading}
        onCancel={(listing) => {
          setLoading(true)
          void onCancel(listing.slug)
        }}
        onFill={() => {
          router.push(frontendRoutes.offer.create.withQuery({ items: nfts, target: listing.target.collection }).get())
        }}
      />
    </TradeDetailsLayout>
  )
}
