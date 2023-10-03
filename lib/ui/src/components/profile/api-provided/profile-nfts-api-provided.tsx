'use client'
import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { HideIfEmpty } from '@echo/ui/components/base/utils/hide-if-empty'
import { ShowIfEmpty } from '@echo/ui/components/base/utils/show-if-empty'
import { SelectableNftGroupsAndFiltersContainer } from '@echo/ui/components/nft/layout/container/selectable-nft-groups-and-filters-container'
import { ProfileNavigationLayout } from '@echo/ui/components/profile/layout/profile-navigation-layout'
import { ProfileNftsEmpty } from '@echo/ui/components/profile/nft/empty/profile-nfts-empty'
import { NavigationItems } from '@echo/ui/constants/navigation-item'
import { NftFilterCollections, NftFilterTraits } from '@echo/ui/constants/nft-filter'
import { mapNftFromResponse } from '@echo/ui/mappers/from-api/map-nft-from-response'
import { getTranslator } from '@echo/ui/messages/get-translator'
import { AuthUser } from '@echo/ui/types/model/auth-user'
import { map } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  responses: NftResponse[]
  user: AuthUser
}

export const ProfileNftsApiProvided: FunctionComponent<Props> = ({ responses, user }) => {
  const t = getTranslator()
  const nfts = useMemo(() => map(mapNftFromResponse, responses), [responses])

  // TODO set the right label for the button and hook the action
  return (
    <ProfileNavigationLayout activeNavigationItem={NavigationItems} user={user}>
      <HideIfEmpty
        checks={nfts}
        render={(nfts) => (
          <SelectableNftGroupsAndFiltersContainer
            nfts={nfts}
            availableFilters={[NftFilterCollections, NftFilterTraits]}
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
