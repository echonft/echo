'use client'
import type { CancelListingArgs } from '@echo/api/types/fetchers/cancel-listing-args'
import type { ListingResponse } from '@echo/api/types/responses/listing-response'
import type { User } from '@echo/auth/types/user'
import type { Offer } from '@echo/model/types/offer'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { ListingDetailsItemsAndTargetLayout } from '@echo/ui/components/listing/details/layout/listing-details-items-and-target-layout'
import { ListingDetailsItemsLayout } from '@echo/ui/components/listing/details/layout/listing-details-items-layout'
import { ListingDetailsLayout } from '@echo/ui/components/listing/details/layout/listing-details-layout'
import { ListingDetailsTargetLayout } from '@echo/ui/components/listing/details/layout/listing-details-target-layout'
import { ListingDetailsUserStateLayout } from '@echo/ui/components/listing/details/layout/listing-details-user-state-layout'
import { ListingDetailsButtons } from '@echo/ui/components/listing/details/listing-details-buttons'
import { ListingDetailsCreator } from '@echo/ui/components/listing/details/listing-details-creator'
import { ListingDetailsItems } from '@echo/ui/components/listing/details/listing-details-items'
import { ListingDetailsOffers } from '@echo/ui/components/listing/details/listing-details-offers'
import { ListingDetailsState } from '@echo/ui/components/listing/details/listing-details-state'
import { ListingDetailsTarget } from '@echo/ui/components/listing/details/listing-details-target'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { isListingRoleCreator } from '@echo/ui/helpers/listing/is-listing-role-creator'
import { getNewOfferPath } from '@echo/ui/helpers/offer/get-new-offer-path'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { assoc, isEmpty } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  listing: ListingWithRole
  user: Nullable<User>
  offers: Offer[]
}

export const ListingDetails: FunctionComponent<Props> = ({ listing, offers }) => {
  const t = useTranslations('error.listing')
  const router = useRouter()
  const { cancelListing, logger } = useDependencies()
  const [updatedListing, setUpdatedListing] = useState(listing)
  const { creator, items, target } = updatedListing
  const isCreator = isListingRoleCreator(updatedListing)

  const { trigger, isMutating } = useSWRTrigger<ListingResponse, CancelListingArgs>({
    key: SWRKeys.listing.cancel(updatedListing),
    fetcher: cancelListing,
    onSuccess: (response) => {
      setUpdatedListing(assoc('role', listing.role, response.listing))
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: t('cancel') },
      logger,
      loggerContext: { component: ListingDetails.name, fn: cancelListing.name, listing: updatedListing }
    }
  })
  // update listing if the prop changes
  useEffect(() => {
    setUpdatedListing(listing)
  }, [listing])

  return (
    <ListingDetailsLayout>
      <ListingDetailsUserStateLayout role={updatedListing.role}>
        <ListingDetailsCreator show={!isCreator} creator={creator} />
        <ListingDetailsState listing={updatedListing} />
      </ListingDetailsUserStateLayout>
      <ListingDetailsItemsAndTargetLayout>
        <ListingDetailsItemsLayout>
          <ListingDetailsItems items={items} />
        </ListingDetailsItemsLayout>
        <ItemsSeparator />
        <div className={clsx('flex', 'flex-col', 'gap-14')}>
          <ListingDetailsTargetLayout>
            <ListingDetailsTarget target={target} />
          </ListingDetailsTargetLayout>
          <ListingDetailsOffers show={isCreator && !isEmpty(offers) && !updatedListing.readOnly} offers={offers} />
        </div>
      </ListingDetailsItemsAndTargetLayout>
      <ListingDetailsButtons
        listing={updatedListing}
        isMutating={isMutating}
        onCancel={(listing) => {
          void trigger({ slug: listing.slug })
        }}
        onFill={() => {
          router.push(getNewOfferPath({ items: listing.items, target: listing.target.collection.slug }))
        }}
      />
    </ListingDetailsLayout>
  )
}
