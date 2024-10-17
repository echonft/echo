'use client'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { Offer } from '@echo/model/types/offer/offer'
import type { WithSlug } from '@echo/model/types/with-slug'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ListingDetailsItemsAndTargetLayout } from '@echo/ui/components/listing/details/layout/listing-details-items-and-target-layout'
import { ListingDetailsItemsLayout } from '@echo/ui/components/listing/details/layout/listing-details-items-layout'
import { ListingDetailsLayout } from '@echo/ui/components/listing/details/layout/listing-details-layout'
import { ListingDetailsTargetLayout } from '@echo/ui/components/listing/details/layout/listing-details-target-layout'
import { ListingDetailsUserStateLayout } from '@echo/ui/components/listing/details/layout/listing-details-user-state-layout'
import { ListingDetailsButtons } from '@echo/ui/components/listing/details/listing-details-buttons'
import { ListingDetailsCreator } from '@echo/ui/components/listing/details/listing-details-creator'
import { ListingDetailsOffers } from '@echo/ui/components/listing/details/listing-details-offers'
import { ListingDetailsState } from '@echo/ui/components/listing/details/listing-details-state'
import { ListingDetailsTarget } from '@echo/ui/components/listing/details/listing-details-target'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
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
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('cancel') },
      loggerContext: { component: ListingDetails.name, fetcher: cancelListing.name, listing }
    }
  })
  const { creator, target } = listing
  const isCreator = isListingRoleCreator(listing)

  return (
    <ListingDetailsLayout>
      <ListingDetailsUserStateLayout role={listing.role}>
        <ListingDetailsCreator show={!isCreator} creator={creator} />
        <ListingDetailsState listing={listing} />
      </ListingDetailsUserStateLayout>
      <ListingDetailsItemsAndTargetLayout>
        <ListingDetailsItemsLayout>
          {/*FIXME*/}
          {/*<ListingDetailsItems items={items} />*/}
        </ListingDetailsItemsLayout>
        <ItemsSeparator />
        <div className={clsx('flex', 'flex-col', 'gap-14')}>
          <ListingDetailsTargetLayout>
            <ListingDetailsTarget target={target} />
          </ListingDetailsTargetLayout>
          <ListingDetailsOffers show={isCreator && !isEmpty(offers) && !listing.readOnly} offers={offers} />
        </div>
      </ListingDetailsItemsAndTargetLayout>
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
    </ListingDetailsLayout>
  )
}
