import {
  NavigationOffersCreated,
  NavigationOffersReceived,
  NavigationSwaps
} from '../../../../constants/navigation-item'
import { CurrentUserOfferRowsContainerSkeleton } from '../../../offer/layout/container/skeleton/current-user-offer-rows-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '../../layout/skeleton/profile-navigation-layout-skeleton'
import { FunctionComponent } from 'react'

interface Props {
  activeNavigationItem: typeof NavigationOffersReceived | typeof NavigationOffersCreated | typeof NavigationSwaps
}

export const ProfileOffersSkeleton: FunctionComponent<Props> = ({ activeNavigationItem }) => {
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={activeNavigationItem}>
      <CurrentUserOfferRowsContainerSkeleton />
    </ProfileNavigationLayoutSkeleton>
  )
}
