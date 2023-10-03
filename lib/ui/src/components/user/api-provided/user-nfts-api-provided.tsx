'use client'
import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { SelectableNftGroupsAndFiltersContainer } from '@echo/ui/components/nft/layout/container/selectable-nft-groups-and-filters-container'
import { UserNavigationLayout } from '@echo/ui/components/user/layout/user-navigation-layout'
import { UserNftsEmpty } from '@echo/ui/components/user/nft/empty/user-nfts-empty'
import { NavigationItems } from '@echo/ui/constants/navigation-item'
import { NftFilterCollections, NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { mapNftFromResponse } from '@echo/ui/mappers/from-api/map-nft-from-response'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { map } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  username: string
  responses: NftResponse[]
  user: AuthUser | undefined
}

export const UserNftsApiProvided: FunctionComponent<Props> = ({ username, responses, user }) => {
  const t = getTranslator()
  const nfts = useMemo(() => map(mapNftFromResponse, responses), [responses])

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
