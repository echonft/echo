'use client'
import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { SelectableNftGroupsAndFiltersContainer } from '@echo/ui/components/nft/layout/container/selectable-nft-groups-and-filters-container'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/layout/profile-navigation-layout'
import { ProfileNftsEmpty } from '@echo/ui/components/profile/nft/empty/profile-nfts-empty'
import { NavigationItems } from '@echo/ui/constants/navigation-item'
import { NftFilterCollections, NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { groupNftsByCollection } from '@echo/ui/helpers/nft/group-nfts-by-collection'
import { mapNftFromResponse } from '@echo/ui/mappers/from-api/map-nft-from-response'
import { getTranslator } from '@echo/ui/messages/get-translator'
import type { Group } from '@echo/ui/types/group'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import type { Nft } from '@echo/ui/types/model/nft'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { isEmpty, map, pipe } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  responses: NftResponse[]
  user: AuthUser
}

export const ProfileNftsApiProvided: FunctionComponent<Props> = ({ responses, user }) => {
  const t = getTranslator()
  const nftGroups = useMemo(() => pipe(map(mapNftFromResponse), groupNftsByCollection)(responses), [responses])
  const dataIsEmpty = isEmpty(nftGroups)

  // TODO set the right label for the button and hook the action
  return (
    <ProfileNavigationLayout activeNavigationItem={NavigationItems} user={user}>
      <HideIf condition={dataIsEmpty}>
        <SelectableNftGroupsAndFiltersContainer
          groups={nftGroups as NonEmptyArray<Group<Nft>>}
          availableFilters={[NftFilterCollections, NftFilterTraits]}
          btnLabel={t('profile.button.label')}
          hideOwner={true}
        />
      </HideIf>
      <ShowIf condition={dataIsEmpty}>
        <ProfileNftsEmpty />
      </ShowIf>
    </ProfileNavigationLayout>
  )
}
