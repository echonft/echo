'use client'
import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { SelectableNftGroupsAndFiltersContainer } from '@echo/ui/components/nft/layout/container/selectable-nft-groups-and-filters-container'
import { UserNavigationLayout } from '@echo/ui/components/user/layout/user-navigation-layout'
import { UserNftsEmpty } from '@echo/ui/components/user/nft/empty/user-nfts-empty'
import { NavigationItems } from '@echo/ui/constants/navigation-item'
import { NftFilterCollections, NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { groupNftsByCollection } from '@echo/ui/helpers/nft/group-nfts-by-collection'
import { mapNftFromResponse } from '@echo/ui/mappers/from-api/map-nft-from-response'
import type { Group } from '@echo/ui/types/group'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import type { Nft } from '@echo/ui/types/model/nft'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { useTranslations } from 'next-intl'
import { isEmpty, map, pipe } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  username: string
  responses: NftResponse[]
  user: AuthUser | undefined
}

export const UserNftsApiProvided: FunctionComponent<Props> = ({ username, responses, user }) => {
  const t = useTranslations('user.button')
  const nftGroups = useMemo(() => pipe(map(mapNftFromResponse), groupNftsByCollection)(responses), [responses])
  const dataIsEmpty = isEmpty(nftGroups)

  return (
    <UserNavigationLayout username={username} activeNavigationItem={NavigationItems} user={user}>
      <HideIf condition={dataIsEmpty}>
        <SelectableNftGroupsAndFiltersContainer
          groups={nftGroups as NonEmptyArray<Group<Nft>>}
          availableFilters={[NftFilterCollections, NftFilterTraits]}
          btnLabel={t('label')}
        />
      </HideIf>
      <ShowIf condition={dataIsEmpty}>
        <UserNftsEmpty />
      </ShowIf>
    </UserNavigationLayout>
  )
}
