'use client'
import { type AuthUser } from '@echo/model/types/auth-user'
import { type Nft } from '@echo/model/types/nft'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { SelectableNftGroupsAndFiltersContainer } from '@echo/ui/components/nft/filters/layout/selectable-nft-groups-and-filters-container'
import { UserNavigationLayout } from '@echo/ui/components/user/layout/user-navigation-layout'
import { UserNftsEmpty } from '@echo/ui/components/user/nft/empty/user-nfts-empty'
import { NAVIGATION_ITEMS } from '@echo/ui/constants/navigation-item'
import { NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS } from '@echo/ui/constants/nft-filter'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { type FunctionComponent } from 'react'

interface Props {
  username: string
  nfts: Nft[]
  user: AuthUser | undefined
}

export const UserNftsApiProvided: FunctionComponent<Props> = ({ username, nfts, user }) => {
  const t = getTranslator()

  return (
    <UserNavigationLayout username={username} activeNavigationItem={NAVIGATION_ITEMS} user={user}>
      <HideIfEmpty
        checks={nfts}
        render={(nfts) => (
          <SelectableNftGroupsAndFiltersContainer
            nfts={nfts}
            availableFilters={[NFT_FILTER_COLLECTIONS, NFT_FILTER_TRAITS]}
            btnLabel={t('user.button.label')}
          />
        )}
      />
      <ShowIfEmpty checks={nfts}>
        <UserNftsEmpty />
      </ShowIfEmpty>
    </UserNavigationLayout>
  )
}
