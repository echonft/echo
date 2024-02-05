'use client'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Nft } from '@echo/model/types/nft'
import { ListingDetails } from '@echo/ui/components/listing/details/listing-details'
import { isListingRoleTarget } from '@echo/ui/helpers/listing/is-listing-role-target'
import { useBannerStore } from '@echo/ui/hooks/use-banner-store'
import type { ListingWithRole } from '@echo/ui/types/listing-with-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useEffect } from 'react'

interface Props {
  listing: ListingWithRole
  user: Nullable<AuthUser>
  userTargetNfts: Nft[]
  offers: OfferWithRole[]
}

export const ListingDetailsPage: FunctionComponent<Props> = ({ listing, user, userTargetNfts, offers }) => {
  const t = useTranslations('listing.details.banner')
  const { show, dismiss } = useBannerStore()

  useEffect(() => {
    if (isListingRoleTarget(listing) && !listing.readOnly) {
      show({ title: t('title') })
    }
    return () => dismiss()
  }, [listing, show, t, dismiss])

  return <ListingDetails listing={listing} user={user} userTargetNfts={userTargetNfts} offers={offers} />
}
