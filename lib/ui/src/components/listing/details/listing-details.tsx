'use client'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { Chain } from '@echo/model/constants/chain'
import { ListingRole } from '@echo/model/constants/listing-role'
import { listingItems } from '@echo/model/helpers/listing/listing-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import type { Listing } from '@echo/model/types/listing'
import type { NftItem } from '@echo/model/types/nft-item'
import type { Slug } from '@echo/model/types/slug'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ListingDetailsTargetLayout } from '@echo/ui/components/listing/details/layout/listing-details-target-layout'
import { ListingDetailsButtons } from '@echo/ui/components/listing/details/listing-details-buttons'
import { ListingDetailsTarget } from '@echo/ui/components/listing/details/listing-details-target'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { TradeDetailsInfoLayout } from '@echo/ui/components/trade/layout/trade-details-info-layout'
import { TradeDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-layout'
import { TradeDetailsUserInfoLayout } from '@echo/ui/components/trade/layout/trade-details-user-info-layout'
import { TradeDetailsListingState } from '@echo/ui/components/trade/trade-details-listing-state'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { Alignment } from '@echo/ui/constants/alignments'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { nonEmptyMap } from '@echo/utils/fp/non-empty-map'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, head, type NonEmptyArray, path, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

export interface ListingDetailsProps {
  // TODO update to have a listing where NFT items token are OwnedNft
  listing: ListingWithRole
  onUpdate?: (listing: ListingWithRole) => unknown
}

export const ListingDetails: FunctionComponent<ListingDetailsProps> = ({ listing, onUpdate }) => {
  const t = useTranslations('error.listing')
  // const router = useRouter()
  const { cancelListing } = useDependencies()
  const { trigger, isMutating } = useSWRTrigger<ListingResponse, Record<'slug', Slug>>({
    key: SWRKeys.listing.cancel(listing),
    fetcher: cancelListing,
    onSuccess: (response) => {
      onUpdate?.(assoc('role', listing.role, response.listing))
    },
    onError: {
      alert: { severity: CalloutSeverity.Error, message: t('cancel') },
      loggerContext: { component: ListingDetails.name, fetcher: cancelListing.name, listing }
    }
  })
  const { target, creator, role } = listing
  const { collection } = target
  const { pictureUrl } = collection
  // TODO remove
  const nfts = pipe(listingItems, nonEmptyMap(pipe(nftItemToNft(listing.creator), assoc('attributes', []))))(listing)

  return (
    <TradeDetailsLayout backgroundPictureUrl={pictureUrl}>
      <TradeDetailsListingState trade={listing} />
      <TradeDetailsInfoLayout>
        <TradeDetailsUserInfoLayout>
          <UserDetails
            user={creator}
            chain={pipe<[Listing], NonEmptyArray<NftItem>, NftItem, Chain>(
              listingItems,
              head,
              path(['token', 'contract', 'chain'])
            )(listing)}
            isAuthUser={role === ListingRole.Creator}
          />
          {/*TODO create a component for items*/}
          <NftCards nfts={nfts} alignment={Alignment.Left} />
        </TradeDetailsUserInfoLayout>
        <ItemsSeparator />
        <div className={clsx('flex', 'flex-col', 'gap-14', 'grow', 'basis-0')}>
          <ListingDetailsTargetLayout>
            <ListingDetailsTarget target={target} />
          </ListingDetailsTargetLayout>
        </div>
      </TradeDetailsInfoLayout>
      <ListingDetailsButtons
        listing={listing}
        isMutating={isMutating}
        onCancel={(listing) => {
          void trigger({ slug: listing.slug })
        }}
        onFill={() => {
          // FIXME
          // router.push(pathProvider.offer.new.get({ items: listing.items, target: listing.target.collection }))
        }}
      />
    </TradeDetailsLayout>
  )
}
