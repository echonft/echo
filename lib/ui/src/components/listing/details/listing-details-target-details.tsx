import type { Listing } from '@echo/model/types/listing'
import { frontendRoutes } from '@echo/routing/constants/frontend-routes'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { ProfilePicture } from '@echo/ui/components/base/profile/profile-picture'
import { ListingDetailsTarget } from '@echo/ui/components/listing/details/listing-details-target'
import { TradeDetailsUserInfoLayout } from '@echo/ui/components/trade/layout/trade-details-user-info-layout'
import { UserDetailsLayout } from '@echo/ui/components/user/details/layout/user-details-layout'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  target: Listing['target']
}

export const ListingDetailsTargetDetails: FunctionComponent<Props> = ({ target }) => {
  return (
    <TradeDetailsUserInfoLayout>
      <UserDetailsLayout>
        <InternalLink path={frontendRoutes.collection.details.get({ slug: target.collection.slug })}>
          <ProfilePicture alt={target.collection.name} pictureUrl={target.collection.pictureUrl} />
        </InternalLink>
        <span className={clsx('w-max', 'text-white', 'prose-display-md-bold')}>{target.collection.name}</span>
      </UserDetailsLayout>
      <ListingDetailsTarget target={target} />
    </TradeDetailsUserInfoLayout>
  )
}
