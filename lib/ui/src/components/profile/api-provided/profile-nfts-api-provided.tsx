'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Nft } from '@echo/model/types/nft'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { SelectableNftGroupsAndFiltersContainer } from '@echo/ui/components/nft/filters/layout/selectable-nft-groups-and-filters-container'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/layout/profile-navigation-layout'
import { ProfileNftsEmpty } from '@echo/ui/components/profile/nft/empty/profile-nfts-empty'
import { NAVIGATION_ITEMS } from '@echo/ui/constants/navigation-item'
import { NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { type FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  user: AuthUser
}

export const ProfileNftsApiProvided: FunctionComponent<Props> = ({ nfts, user }) => {
  const t = getTranslator()

  // TODO set the right label for the button and hook the action
  return (
    <ProfileNavigationLayout activeNavigationItem={NAVIGATION_ITEMS} user={user}>
      <HideIfEmpty
        checks={nfts}
        render={(nfts) => (
          <SelectableNftGroupsAndFiltersContainer
            nfts={nfts}
            availableFilters={[NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS]}
            btnLabel={t('profile.button.label')}
            hideOwner={true}
          />
        )}
      />
      <ShowIfEmpty checks={nfts}>
        <ProfileNftsEmpty />
      </ShowIfEmpty>
    </ProfileNavigationLayout>
  )
}
