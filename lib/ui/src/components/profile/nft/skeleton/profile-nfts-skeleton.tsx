import { NftGroupsAndFiltersContainerSkeleton } from '@echo/ui/components/nft/layout/container/skeleton/nft-group-and-filters-container-skeleton'
import { ProfileNavigationLayoutSkeleton } from '@echo/ui/components/profile/layout/skeleton/profile-navigation-layout-skeleton'
import { NavigationItems } from '@echo/ui/constants/navigation-item'
import { NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { type FunctionComponent } from 'react'

export const ProfileNftsSkeleton: FunctionComponent = () => {
  const t = getTranslator()
  return (
    <ProfileNavigationLayoutSkeleton activeNavigationItem={NavigationItems}>
      <NftGroupsAndFiltersContainerSkeleton availableFilters={[NftFilterTraits]} btnLabel={t('profile.button.label')} />
    </ProfileNavigationLayoutSkeleton>
  )
}
