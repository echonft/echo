'use client'
import { NavigationItems } from '../../../constants/navigation-item'
import { NftFilterCollections, NftFilterTraits } from '../../../constants/nft-filter'
import { groupNftsByCollection } from '../../../helpers/nft/group-nfts-by-collection'
import { Group } from '../../../types/group'
import { HideIf } from '../../base/utils/hide-if'
import { ShowIf } from '../../base/utils/show-if'
import { SelectableNftGroupsAndFiltersContainer } from '../../nft/layout/container/selectable-nft-groups-and-filters-container'
import { UserNavigationLayout } from '../layout/user-navigation-layout'
import { UserNftsEmpty } from '../nft/empty/user-nfts-empty'
import type { NftResponse } from '@echo/api/types'
import { mapNft, Nft } from '@echo/ui-model'
import type { NonEmptyArray } from '@echo/utils/types'
import { useTranslations } from 'next-intl'
import { isEmpty, map, pipe } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  username: string
  responses: Array<Partial<NftResponse>>
}

export const UserNftsApiProvided: FunctionComponent<Props> = ({ username, responses }) => {
  const t = useTranslations('user.button')
  const nftGroups = useMemo(() => pipe(map(mapNft), groupNftsByCollection)(responses), [responses])
  const dataIsEmpty = isEmpty(nftGroups)

  return (
    <UserNavigationLayout username={username} activeNavigationItem={NavigationItems}>
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
