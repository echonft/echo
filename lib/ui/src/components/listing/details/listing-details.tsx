'use client'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import { ListingRole } from '@echo/model/constants/listing-role'
import { ListingState } from '@echo/model/constants/listing-state'
import type { Offer } from '@echo/model/types/offer/offer'
import type { WithSlug } from '@echo/model/types/with-slug'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ListingDetailsTargetLayout } from '@echo/ui/components/listing/details/layout/listing-details-target-layout'
import { ListingDetailsButtons } from '@echo/ui/components/listing/details/listing-details-buttons'
import { ListingDetailsOffers } from '@echo/ui/components/listing/details/listing-details-offers'
import { ListingDetailsTarget } from '@echo/ui/components/listing/details/listing-details-target'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { TradeDetailsInfoLayout } from '@echo/ui/components/trade/layout/trade-details-info-layout'
import { TradeDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-layout'
import { TradeDetailsUserInfoLayout } from '@echo/ui/components/trade/layout/trade-details-user-info-layout'
import { TradeDetailsState } from '@echo/ui/components/trade/trade-details-state'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { Alignment } from '@echo/ui/constants/alignments'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { isListingRoleCreator } from '@echo/ui/helpers/listing/is-listing-role-creator'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listing: ListingWithRole
  offers: Offer[]
  onUpdate?: (listing: ListingWithRole) => unknown
}

// FIXME
export const ListingDetails: FunctionComponent<Props> = ({ listing, offers, onUpdate }) => {
  const t = useTranslations('error.listing')
  // const router = useRouter()
  const { cancelListing } = useDependencies()
  const { trigger, isMutating } = useSWRTrigger<ListingResponse, WithSlug>({
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
  const { items, target, state, locked, expiresAt, creator, role } = listing
  const { collection } = target
  const { profilePictureUrl } = collection
  const isCreator = isListingRoleCreator(listing)

  return (
    <TradeDetailsLayout backgroundPictureUrl={profilePictureUrl}>
      <TradeDetailsState
        isOffer={false}
        state={state}
        locked={locked}
        expiresAt={expiresAt}
        expired={state === ListingState.Expired}
      />
      <TradeDetailsInfoLayout>
        <TradeDetailsUserInfoLayout>
          <UserDetails user={creator} isAuthUser={role === ListingRole.Creator} />
          <NftCards nfts={items} alignment={Alignment.Left} />
        </TradeDetailsUserInfoLayout>
        <ItemsSeparator />
        <div className={clsx('flex', 'flex-col', 'gap-14', 'grow', 'basis-0')}>
          <ListingDetailsTargetLayout>
            <ListingDetailsTarget target={target} />
          </ListingDetailsTargetLayout>
          <ListingDetailsOffers show={isCreator && !isEmpty(offers) && !listing.locked} offers={offers} />
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
