'use client'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { SelectableNftGroupsAndFiltersContainer } from '@echo/ui/components/nft/layout/container/selectable-nft-groups-and-filters-container'
import { UserNavigationLayout } from '@echo/ui/components/user/layout/user-navigation-layout'
import { UserNftsEmpty } from '@echo/ui/components/user/nft/empty/user-nfts-empty'
import { NavigationItems } from '@echo/ui/constants/navigation-item'
import { NftFilterCollections, NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { Nft } from '@echo/ui/types/model/nft'
import { type FunctionComponent } from 'react'

interface Props {
  username: string
  nfts: Nft[]
  user: AuthUser | undefined
}

export const UserNftsApiProvided: FunctionComponent<Props> = ({ username, nfts, user }) => {
  const t = getTranslator()

  return (
    <UserNavigationLayout username={username} activeNavigationItem={NavigationItems} user={user}>
      <HideIfEmpty
        checks={nfts}
        render={(nfts) => (
          <SelectableNftGroupsAndFiltersContainer
            nfts={nfts}
            availableFilters={[NftFilterCollections, NftFilterTraits]}
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
